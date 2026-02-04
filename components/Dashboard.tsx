import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Session } from '@supabase/supabase-js';
import {
  IconSearch, IconFileDown, IconMapPin, IconActivity,
  IconZap, IconShield, IconGlobe, IconArrowRight, IconX, IconCheck
} from './Icons';
import { SavedLead, SavedSearch, EmailTemplate, PRICING_PLANS } from '../lib/types';
import { useAuth } from '../lib/auth';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import {
  getSavedLeads,
  getSearchHistory,
  getEmailTemplates,
  updateLead,
  deleteLead,
  deleteSearch,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
  getUserStats,
  getRecentActivity,
  incrementExportCount,
  logActivity,
} from '../lib/database';

interface DashboardProps {
  session: Session | null;
  onNavigate: (page: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ session, onNavigate }) => {
  const { user, profile, refreshProfile, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'searches' | 'templates'>('overview');
  const [loading, setLoading] = useState(false);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [loadingStats, setLoadingStats] = useState(false);
  const [lastFetch, setLastFetch] = useState<number>(0);
  const [dataCache, setDataCache] = useState<Record<string, any>>({});
  const [connectionError, setConnectionError] = useState<string | null>(null);

  // Data state
  const [savedLeads, setSavedLeads] = useState<SavedLead[]>([]);
  const [recentSearches, setRecentSearches] = useState<SavedSearch[]>([]);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [stats, setStats] = useState({
    total_searches: 0,
    total_leads_saved: 0,
    leads_contacted: 0,
    leads_converted: 0,
    leads_by_status: {} as Record<string, number>,
    searches_by_category: [] as { category: string; count: number }[],
    searches_by_city: [] as { city: string; count: number }[],
  });

  // UI state
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingLead, setEditingLead] = useState<string | null>(null);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [templateForm, setTemplateForm] = useState({ name: '', subject: '', body: '' });

  const currentPlan = PRICING_PLANS.find(p => p.id === profile?.subscription_tier) || PRICING_PLANS[0];

  // Memoized calculations for better performance
  const filteredLeads = useMemo(() => {
    return statusFilter === 'all'
      ? savedLeads
      : savedLeads.filter(lead => lead.status === statusFilter);
  }, [savedLeads, statusFilter]);

  const statusCounts = useMemo(() => {
    return savedLeads.reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [savedLeads]);

  // Cache duration: 2 minutes
  const CACHE_DURATION = 2 * 60 * 1000;

  // Optimized fetch with caching
  const fetchData = useCallback(async (force = false) => {
    if (!user?.id) {
      console.log('Dashboard: No user ID, skipping fetch');
      return;
    }

    // Check if Supabase is configured
    if (!isSupabaseConfigured) {
      console.log('Dashboard: Supabase not configured');
      setConnectionError('Database not configured. Please set up Supabase environment variables.');
      setLoading(false);
      return;
    }

    const now = Date.now();
    const cacheKey = `dashboard_${user.id}`;

    // Use cached data if available and not expired
    if (!force && now - lastFetch < CACHE_DURATION && dataCache[cacheKey]) {
      console.log('Dashboard: Using cached data');
      const cached = dataCache[cacheKey];
      setSavedLeads(cached.leads || []);
      setRecentSearches(cached.searches || []);
      setEmailTemplates(cached.templates || []);
      setStats(cached.stats || stats);
      setRecentActivity(cached.activity || []);
      setLoading(false);
      return;
    }

    console.log('Dashboard: Fetching data from Supabase...');
    setLoading(true);
    setConnectionError(null);
    try {
      const [leads, searches, templates, userStats, activity] = await Promise.all([
        getSavedLeads(user.id),
        getSearchHistory(user.id, 20),
        getEmailTemplates(user.id),
        getUserStats(user.id),
        getRecentActivity(user.id, 10),
      ]);

      console.log('Dashboard: Data fetched successfully', { leads: leads.length, searches: searches.length });

      const cacheData = {
        leads,
        searches,
        templates,
        stats: userStats,
        activity,
      };

      setSavedLeads(leads);
      setRecentSearches(searches);
      setEmailTemplates(templates);
      setStats(userStats);
      setRecentActivity(activity);
      setLastFetch(now);
      setDataCache(prev => ({ ...prev, [cacheKey]: cacheData }));
      setConnectionError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setConnectionError('Failed to load dashboard data. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  }, [user?.id, lastFetch, dataCache, stats]);

  useEffect(() => {
    // Only fetch if user is logged in
    if (user?.id) {
      const shouldFetch = Date.now() - lastFetch > CACHE_DURATION || savedLeads.length === 0;
      if (shouldFetch) {
        fetchData();
      }
    } else {
      // No user logged in - stop loading
      setLoading(false);
    }
  }, [user?.id]); // Removed fetchData dependency to prevent infinite loops

  // Real-time subscription for live updates
  useEffect(() => {
    if (!user?.id || !supabase || !isSupabaseConfigured) return;

    // Subscribe to changes in saved_leads table
    const leadsSubscription = supabase
      .channel('saved_leads_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'saved_leads',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('Lead change detected:', payload.eventType);
          // Refresh data on changes from other sources
          fetchData(true);
        }
      )
      .subscribe();

    // Subscribe to changes in activity_log table
    const activitySubscription = supabase
      .channel('activity_log_changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'activity_log',
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('New activity detected');
          // Add new activity to the list
          setRecentActivity(prev => [payload.new as any, ...prev.slice(0, 9)]);
        }
      )
      .subscribe();

    return () => {
      leadsSubscription.unsubscribe();
      activitySubscription.unsubscribe();
    };
  }, [user?.id, fetchData]);

  // Lead status management - optimized
  const handleStatusChange = async (leadId: string, newStatus: SavedLead['status']) => {
    if (!user?.id) return;

    setLoadingLeads(true);
    const updated = await updateLead(leadId, { status: newStatus }, user.id);
    if (updated) {
      setSavedLeads(prev => prev.map(l => l.id === leadId ? { ...l, status: newStatus } : l));
      await logActivity(user.id, 'status_change', `Updated lead status to ${newStatus}`);
      setEditingLead(null);

      // Update stats locally instead of refetching
      setStats(prev => {
        const newLeadsByStatus = { ...prev.leads_by_status };
        const oldLead = savedLeads.find(l => l.id === leadId);

        if (oldLead?.status) {
          newLeadsByStatus[oldLead.status] = (newLeadsByStatus[oldLead.status] || 1) - 1;
        }
        newLeadsByStatus[newStatus] = (newLeadsByStatus[newStatus] || 0) + 1;

        return {
          ...prev,
          leads_by_status: newLeadsByStatus,
          leads_contacted: newStatus === 'contacted' ? prev.leads_contacted + 1 : prev.leads_contacted,
          leads_converted: newStatus === 'converted' ? prev.leads_converted + 1 : prev.leads_converted,
        };
      });
    }
    setLoadingLeads(false);
  };

  // Delete lead - optimized
  const handleDeleteLead = async (leadId: string) => {
    if (!user?.id || !confirm('Are you sure you want to delete this lead?')) return;

    setLoadingLeads(true);
    const deleted = await deleteLead(leadId, user.id);
    if (deleted) {
      const deletedLead = savedLeads.find(l => l.id === leadId);
      setSavedLeads(prev => prev.filter(l => l.id !== leadId));

      // Update stats locally
      if (deletedLead) {
        setStats(prev => {
          const newLeadsByStatus = { ...prev.leads_by_status };
          if (deletedLead.status) {
            newLeadsByStatus[deletedLead.status] = Math.max(0, (newLeadsByStatus[deletedLead.status] || 1) - 1);
          }

          return {
            ...prev,
            total_leads_saved: Math.max(0, prev.total_leads_saved - 1),
            leads_by_status: newLeadsByStatus,
            leads_contacted: deletedLead.status === 'contacted' ? Math.max(0, prev.leads_contacted - 1) : prev.leads_contacted,
            leads_converted: deletedLead.status === 'converted' ? Math.max(0, prev.leads_converted - 1) : prev.leads_converted,
          };
        });
      }
    }
    setLoadingLeads(false);
  };

  // Export leads to CSV - optimized
  const handleExportLeads = async () => {
    if (!user?.id) return;

    if (filteredLeads.length === 0) {
      alert('No leads to export');
      return;
    }

    // Create CSV content
    const headers = ['Business Name', 'Address', 'Phone', 'Category', 'City', 'Has Website', 'Website', 'Rating', 'Reviews', 'Status', 'Saved At', 'Notes'];
    const csvContent = [
      headers.join(','),
      ...filteredLeads.map(lead => [
        `"${lead.business_name}"`,
        `"${lead.address || ''}"`,
        `"${lead.phone || ''}"`,
        `"${lead.category || ''}"`,
        `"${lead.city || ''}"`,
        lead.has_website ? 'Yes' : 'No',
        `"${lead.website_url || ''}"`,
        lead.rating || '',
        lead.reviews || '',
        lead.status,
        new Date(lead.saved_at).toLocaleDateString(),
        `"${lead.notes || ''}"`,
      ].join(','))
    ].join('\n');

    // Download
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    // Track export
    await incrementExportCount(user.id);
    await logActivity(user.id, 'export', `Exported ${filteredLeads.length} leads to CSV`);
    await refreshProfile();
  };

  // Delete search
  const handleDeleteSearch = async (searchId: string) => {
    if (!user?.id || !confirm('Delete this search from history?')) return;

    const deleted = await deleteSearch(searchId, user.id);
    if (deleted) {
      setRecentSearches(prev => prev.filter(s => s.id !== searchId));
    }
  };

  // Template management
  const handleSaveTemplate = async () => {
    if (!user?.id || !templateForm.name || !templateForm.subject || !templateForm.body) {
      alert('Please fill all fields');
      return;
    }

    // Extract variables like {{business_name}}
    const variableRegex = /\{\{(\w+)\}\}/g;
    const variables: string[] = [];
    let match;
    while ((match = variableRegex.exec(templateForm.subject + templateForm.body)) !== null) {
      if (!variables.includes(match[1])) {
        variables.push(match[1]);
      }
    }

    if (editingTemplate) {
      const updated = await updateEmailTemplate(editingTemplate.id, { ...templateForm, variables }, user.id);
      if (updated) {
        setEmailTemplates(prev => prev.map(t => t.id === editingTemplate.id ? updated : t));
      }
    } else {
      const created = await createEmailTemplate({ ...templateForm, variables, user_id: user.id }, user.id);
      if (created) {
        setEmailTemplates(prev => [created, ...prev]);
      }
    }

    setShowTemplateModal(false);
    setEditingTemplate(null);
    setTemplateForm({ name: '', subject: '', body: '' });
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
    setTemplateForm({ name: template.name, subject: template.subject, body: template.body });
    setShowTemplateModal(true);
  };

  const handleDeleteTemplate = async (templateId: string) => {
    if (!user?.id || !confirm('Delete this template?')) return;

    const deleted = await deleteEmailTemplate(templateId, user.id);
    if (deleted) {
      setEmailTemplates(prev => prev.filter(t => t.id !== templateId));
    }
  };

  // Helper functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'contacted': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'responded': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400';
      case 'converted': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'not_interested': return 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'search': return <IconSearch className="w-4 h-4" />;
      case 'save_lead': return <IconShield className="w-4 h-4" />;
      case 'export': return <IconFileDown className="w-4 h-4" />;
      case 'contact': return <IconZap className="w-4 h-4" />;
      case 'status_change': return <IconActivity className="w-4 h-4" />;
      default: return <IconGlobe className="w-4 h-4" />;
    }
  };

  // Auth still loading
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] pt-32 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // Not logged in state
  if (!session || !user) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] pt-32 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
              <IconShield className="w-10 h-10 text-primary-600 dark:text-primary-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Sign in to access your dashboard</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">View your saved leads, search history, and analytics</p>
            <button
              onClick={() => onNavigate('home')}
              className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-medium transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#030712] pt-32 pb-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  const conversionRate = stats.leads_contacted > 0
    ? Math.round((stats.leads_converted / stats.leads_contacted) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] pt-32 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Connection Status Banner */}
        {connectionError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0">
              <IconActivity className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-amber-800 dark:text-amber-200">Connection Issue</p>
              <p className="text-sm text-amber-700 dark:text-amber-300">{connectionError}</p>
            </div>
            <button
              onClick={() => fetchData(true)}
              className="px-3 py-1.5 text-sm font-medium text-amber-700 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 rounded-lg transition-colors"
            >
              Retry
            </button>
          </motion.div>
        )}

        {/* Supabase Connection Indicator */}
        {!isSupabaseConfigured && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
              <IconGlobe className="w-5 h-5 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-slate-700 dark:text-slate-300">Database Not Connected</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Set up Supabase environment variables to enable data persistence. See ENV_SETUP.md for instructions.
              </p>
            </div>
          </motion.div>
        )}

        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back, {profile?.full_name?.split(' ')[0] || user.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Here's what's happening with your leads today.
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Database connection status indicator */}
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className={`w-2 h-2 rounded-full ${isSupabaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                  {isSupabaseConfigured ? 'Connected' : 'Offline'}
                </span>
              </div>
              <button
                onClick={() => fetchData(true)}
                disabled={loading}
                className="px-3 py-2 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-medium text-sm transition-colors disabled:opacity-50 flex items-center gap-2"
                title={`Refresh data (last updated: ${lastFetch ? new Date(lastFetch).toLocaleTimeString() : 'never'})`}
              >
                <IconActivity className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <div className="text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400">Current Plan</p>
                <p className="font-semibold text-slate-900 dark:text-white">{currentPlan.name}</p>
              </div>
              <button
                onClick={() => onNavigate('pricing')}
                className="px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors"
              >
                Upgrade
              </button>
            </div>
          </motion.div>
        </div>

        {/* Usage Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <IconSearch className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">This Month</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{profile?.searches_this_month || 0}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              of {currentPlan.limits.searches_per_month === -1 ? '∞' : currentPlan.limits.searches_per_month} searches
            </p>
            {currentPlan.limits.searches_per_month > 0 && (
              <div className="mt-3 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 rounded-full transition-all"
                  style={{ width: `${Math.min(((profile?.searches_this_month || 0) / currentPlan.limits.searches_per_month) * 100, 100)}%` }}
                />
              </div>
            )}
          </div>

          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <IconShield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.total_leads_saved}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">leads saved</p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <IconZap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Contacted</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.leads_contacted}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">businesses reached</p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <IconActivity className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs font-medium text-emerald-500 dark:text-emerald-400">
                {conversionRate > 0 ? `${conversionRate}%` : '-'}
              </span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{stats.leads_converted}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">converted to clients</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
          {['overview', 'leads', 'searches', 'templates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px whitespace-nowrap ${
                activeTab === tab
                  ? 'text-primary-600 dark:text-primary-400 border-primary-500'
                  : 'text-slate-500 dark:text-slate-400 border-transparent hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700/50">
                  <h3 className="font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {recentActivity.length > 0 ? (
                    recentActivity.map((activity) => (
                      <div key={activity.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400">
                          {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-slate-900 dark:text-white truncate">{activity.description}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            {new Date(activity.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                      <IconActivity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No recent activity</p>
                      <p className="text-sm">Start searching for leads to see activity here</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-6">
                {/* Top Categories */}
                <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700/50">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Top Categories</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    {stats.searches_by_category.length > 0 ? (
                      stats.searches_by_category.slice(0, 5).map((item, i) => (
                        <div key={item.category} className="flex items-center gap-3">
                          <span className="text-xs font-medium text-slate-400 w-4">{i + 1}</span>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <span className="text-sm text-slate-700 dark:text-slate-300">{item.category}</span>
                              <span className="text-xs text-slate-500">{item.count}</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary-500 rounded-full"
                                style={{ width: `${(item.count / (stats.searches_by_category[0]?.count || 1)) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No searches yet</p>
                    )}
                  </div>
                </div>

                {/* Top Cities */}
                <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700/50">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Top Cities</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {stats.searches_by_city.length > 0 ? (
                      stats.searches_by_city.slice(0, 5).map((item) => (
                        <div key={item.city} className="flex items-center justify-between py-1">
                          <div className="flex items-center gap-2">
                            <IconMapPin className="w-4 h-4 text-slate-400" />
                            <span className="text-sm text-slate-700 dark:text-slate-300">{item.city}</span>
                          </div>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{item.count}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-4">No searches yet</p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'leads' && (
            <motion.div
              key="leads"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  Saved Leads ({filteredLeads.length})
                </h3>
                <div className="flex items-center gap-2">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                  >
                    <option value="all">All Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="responded">Responded</option>
                    <option value="converted">Converted</option>
                    <option value="not_interested">Not Interested</option>
                  </select>
                  <button
                    onClick={handleExportLeads}
                    disabled={filteredLeads.length === 0}
                    className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors disabled:opacity-50 disabled:pointer-events-none"
                  >
                    <IconFileDown className="w-4 h-4" />
                    Export CSV
                  </button>
                </div>
              </div>

              {filteredLeads.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 dark:bg-slate-700/30 text-left">
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Business</th>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Saved</th>
                        <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                      {filteredLeads.map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <p className="font-medium text-slate-900 dark:text-white">{lead.business_name}</p>
                              <p className="text-sm text-slate-500 dark:text-slate-400">{lead.phone}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{lead.category}</td>
                          <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{lead.city}</td>
                          <td className="px-6 py-4">
                            {editingLead === lead.id ? (
                              <select
                                value={lead.status}
                                onChange={(e) => handleStatusChange(lead.id, e.target.value as SavedLead['status'])}
                                onBlur={() => setEditingLead(null)}
                                autoFocus
                                className="text-xs border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                              >
                                <option value="new">New</option>
                                <option value="contacted">Contacted</option>
                                <option value="responded">Responded</option>
                                <option value="converted">Converted</option>
                                <option value="not_interested">Not Interested</option>
                              </select>
                            ) : (
                              <button
                                onClick={() => setEditingLead(lead.id)}
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)} hover:opacity-80 transition-opacity`}
                              >
                                {lead.status.replace('_', ' ')}
                              </button>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                            {new Date(lead.saved_at).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              {lead.google_maps_url && (
                                <button
                                  onClick={() => window.open(lead.google_maps_url, '_blank')}
                                  className="p-1.5 text-slate-400 hover:text-primary-500 transition-colors"
                                  title="View on Map"
                                >
                                  <IconMapPin className="w-4 h-4" />
                                </button>
                              )}
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                                title="Delete Lead"
                              >
                                <IconX className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                  <IconShield className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No leads saved yet</p>
                  <p className="text-sm">Search for businesses and save leads to see them here</p>
                  <button
                    onClick={() => onNavigate('home')}
                    className="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    Start Searching
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'searches' && (
            <motion.div
              key="searches"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700/50">
                <h3 className="font-semibold text-slate-900 dark:text-white">Search History ({recentSearches.length})</h3>
              </div>

              {recentSearches.length > 0 ? (
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {recentSearches.map((search) => (
                    <div key={search.id} className="px-6 py-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                          <IconSearch className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-900 dark:text-white">
                            {search.keyword} in {search.city}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {new Date(search.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <p className="text-lg font-semibold text-slate-900 dark:text-white">{search.results_count}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">results</p>
                        </div>
                        <div className="text-right">
                          <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">{search.leads_without_website}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400">no website</p>
                        </div>
                        <button
                          onClick={() => handleDeleteSearch(search.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                          title="Delete Search"
                        >
                          <IconX className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="px-6 py-12 text-center text-slate-500 dark:text-slate-400">
                  <IconSearch className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p className="font-medium">No searches yet</p>
                  <p className="text-sm">Your search history will appear here</p>
                  <button
                    onClick={() => onNavigate('home')}
                    className="mt-4 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg font-medium text-sm transition-colors"
                  >
                    Start Searching
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'templates' && (
            <motion.div
              key="templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {/* Add Template Card */}
              <button
                onClick={() => {
                  setEditingTemplate(null);
                  setTemplateForm({ name: '', subject: '', body: '' });
                  setShowTemplateModal(true);
                }}
                className="bg-white dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-6 flex flex-col items-center justify-center text-center hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer transition-colors min-h-[200px]"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                  <IconZap className="w-6 h-6 text-slate-400" />
                </div>
                <p className="font-medium text-slate-900 dark:text-white mb-1">Create New Template</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Build a custom email template</p>
              </button>

              {/* Existing Templates */}
              {emailTemplates.map((template) => (
                <div key={template.id} className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <IconZap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <IconX className="w-4 h-4" />
                    </button>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 truncate">{template.subject}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {template.variables.slice(0, 3).map(v => (
                      <span key={v} className="text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded">
                        {`{{${v}}}`}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => handleEditTemplate(template)}
                    className="w-full px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors"
                  >
                    Edit Template
                  </button>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Template Modal */}
      <AnimatePresence>
        {showTemplateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTemplateModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {editingTemplate ? 'Edit Template' : 'Create Template'}
                </h3>
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <IconX className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Introduction Email"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Subject Line
                  </label>
                  <input
                    type="text"
                    value={templateForm.subject}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, subject: e.target.value }))}
                    placeholder="e.g., Free Website for {{business_name}}"
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
                    Email Body
                  </label>
                  <textarea
                    value={templateForm.body}
                    onChange={(e) => setTemplateForm(prev => ({ ...prev, body: e.target.value }))}
                    placeholder="Hi {{business_name}},&#10;&#10;I noticed your business in {{city}}..."
                    rows={6}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 resize-none"
                  />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Use {'{{variable_name}}'} for dynamic content like {'{{business_name}}'}, {'{{city}}'}, {'{{category}}'}
                </p>
              </div>
              <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-3">
                <button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors flex items-center gap-2"
                >
                  <IconCheck className="w-4 h-4" />
                  {editingTemplate ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(Dashboard);

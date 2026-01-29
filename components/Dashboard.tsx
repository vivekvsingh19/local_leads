import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Session } from '@supabase/supabase-js';
import {
  IconSearch, IconFileDown, IconMapPin, IconActivity,
  IconZap, IconShield, IconGlobe, IconArrowRight
} from './Icons';
import { SavedLead, SavedSearch, Analytics, PRICING_PLANS, User } from '../lib/types';

interface DashboardProps {
  session: Session | null;
  onNavigate: (page: string) => void;
}

// Mock data for demo
const mockUser: User = {
  id: '1',
  email: 'user@example.com',
  full_name: 'John Doe',
  subscription_tier: 'starter',
  subscription_status: 'active',
  searches_this_month: 45,
  exports_this_month: 8,
  created_at: '2025-01-01',
};

const mockAnalytics: Analytics = {
  total_searches: 156,
  total_leads_found: 2340,
  leads_without_website: 892,
  leads_saved: 234,
  leads_contacted: 89,
  leads_converted: 23,
  conversion_rate: 25.8,
  searches_by_category: [
    { category: 'Restaurants', count: 45 },
    { category: 'Salons', count: 38 },
    { category: 'Gyms', count: 32 },
    { category: 'Clinics', count: 28 },
    { category: 'Hotels', count: 13 },
  ],
  searches_by_city: [
    { city: 'New York', count: 52 },
    { city: 'Los Angeles', count: 41 },
    { city: 'Chicago', count: 28 },
    { city: 'Miami', count: 22 },
    { city: 'Austin', count: 13 },
  ],
  recent_activity: [
    { id: '1', type: 'search', description: 'Searched "Restaurants" in Miami', created_at: '2026-01-21T10:30:00' },
    { id: '2', type: 'save_lead', description: 'Saved "Joe\'s Pizza" to leads', created_at: '2026-01-21T10:25:00' },
    { id: '3', type: 'export', description: 'Exported 25 leads to CSV', created_at: '2026-01-21T09:15:00' },
    { id: '4', type: 'status_change', description: 'Marked "ABC Salon" as Contacted', created_at: '2026-01-20T16:45:00' },
    { id: '5', type: 'contact', description: 'Sent email to "City Gym"', created_at: '2026-01-20T14:20:00' },
  ],
};

const mockSavedLeads: SavedLead[] = [
  {
    id: '1',
    business_name: "Joe's Pizza",
    address: '123 Main St, Miami, FL',
    phone: '(555) 123-4567',
    category: 'Restaurants',
    city: 'Miami',
    has_website: false,
    google_maps_url: 'https://maps.google.com',
    rating: 4.5,
    reviews: 120,
    saved_at: '2026-01-21T10:25:00',
    tags: ['hot-lead', 'food'],
    status: 'new',
    user_id: '1',
  },
  {
    id: '2',
    business_name: 'City Fitness Gym',
    address: '456 Oak Ave, Austin, TX',
    phone: '(555) 987-6543',
    category: 'Gyms',
    city: 'Austin',
    has_website: false,
    google_maps_url: 'https://maps.google.com',
    rating: 4.2,
    reviews: 89,
    saved_at: '2026-01-20T14:20:00',
    tags: ['contacted'],
    status: 'contacted',
    user_id: '1',
  },
  {
    id: '3',
    business_name: 'Bella Hair Studio',
    address: '789 Elm St, New York, NY',
    phone: '(555) 456-7890',
    category: 'Salons',
    city: 'New York',
    has_website: false,
    google_maps_url: 'https://maps.google.com',
    rating: 4.8,
    reviews: 234,
    saved_at: '2026-01-19T11:00:00',
    tags: ['high-priority'],
    status: 'responded',
    user_id: '1',
  },
];

const mockRecentSearches: SavedSearch[] = [
  { id: '1', user_id: '1', keyword: 'Restaurants', city: 'Miami, FL', results_count: 45, leads_without_website: 12, created_at: '2026-01-21T10:30:00' },
  { id: '2', user_id: '1', keyword: 'Gyms', city: 'Austin, TX', results_count: 28, leads_without_website: 8, created_at: '2026-01-20T14:15:00' },
  { id: '3', user_id: '1', keyword: 'Salons', city: 'New York, NY', results_count: 67, leads_without_website: 23, created_at: '2026-01-19T11:00:00' },
];

const Dashboard: React.FC<DashboardProps> = ({ session, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'searches' | 'templates'>('overview');
  const user = mockUser;
  const currentPlan = PRICING_PLANS.find(p => p.id === user.subscription_tier)!;
  const hasAccessToContactInfo = user.subscription_tier !== 'starter';

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

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#030712] pt-20 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                Welcome back, {user.full_name?.split(' ')[0] || 'there'}! 👋
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Here's what's happening with your leads today.
              </p>
            </div>
            <div className="flex items-center gap-3">
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
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{user.searches_this_month}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              of {currentPlan.limits.searches_per_month === -1 ? '∞' : currentPlan.limits.searches_per_month} searches
            </p>
            <div className="mt-3 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all"
                style={{ width: `${Math.min((user.searches_this_month / (currentPlan.limits.searches_per_month || 100)) * 100, 100)}%` }}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                <IconShield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{mockAnalytics.leads_saved}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">leads saved</p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <IconZap className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Contacted</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{mockAnalytics.leads_contacted}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">businesses reached</p>
          </div>

          <div className="bg-white dark:bg-slate-800/50 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <IconActivity className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-xs font-medium text-emerald-500 dark:text-emerald-400">+{mockAnalytics.conversion_rate}%</span>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">{mockAnalytics.leads_converted}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">converted to clients</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
          {['overview', 'leads', 'searches', 'templates'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-4 py-3 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${
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
                  {mockAnalytics.recent_activity.map((activity) => (
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
                  ))}
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
                    {mockAnalytics.searches_by_category.slice(0, 5).map((item, i) => (
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
                              style={{ width: `${(item.count / mockAnalytics.searches_by_category[0].count) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Cities */}
                <div className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700/50">
                    <h3 className="font-semibold text-slate-900 dark:text-white">Top Cities</h3>
                  </div>
                  <div className="p-4 space-y-2">
                    {mockAnalytics.searches_by_city.slice(0, 5).map((item) => (
                      <div key={item.city} className="flex items-center justify-between py-1">
                        <div className="flex items-center gap-2">
                          <IconMapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-700 dark:text-slate-300">{item.city}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-900 dark:text-white">{item.count}</span>
                      </div>
                    ))}
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
              <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700/50 flex items-center justify-between">
                <h3 className="font-semibold text-slate-900 dark:text-white">Saved Leads</h3>
                <div className="flex items-center gap-2">
                  <select className="text-sm border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-1.5 bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    <option>All Status</option>
                    <option>New</option>
                    <option>Contacted</option>
                    <option>Responded</option>
                    <option>Converted</option>
                  </select>
                  <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                    <IconFileDown className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>
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
                    {mockSavedLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/20 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{lead.business_name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              {hasAccessToContactInfo ? lead.phone : lead.phone.slice(0, -5) + '****'}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{lead.category}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{lead.city}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusColor(lead.status)}`}>
                            {lead.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                          {new Date(lead.saved_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="p-1.5 text-slate-400 hover:text-primary-500 transition-colors" title="Send Email">
                              <IconZap className="w-4 h-4" />
                            </button>
                            <button
                              className={`p-1.5 transition-colors ${hasAccessToContactInfo ? 'text-slate-400 hover:text-primary-500' : 'text-slate-300 cursor-not-allowed opacity-50'}`}
                              title={hasAccessToContactInfo ? "View on Map" : "Upgrade to view map"}
                              onClick={() => hasAccessToContactInfo && window.open(lead.google_maps_url, '_blank')}
                            >
                              <IconMapPin className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                <h3 className="font-semibold text-slate-900 dark:text-white">Search History</h3>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                {mockRecentSearches.map((search) => (
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
                      <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                        Re-run
                        <IconArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
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
              <div className="bg-white dark:bg-slate-800/50 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 p-6 flex flex-col items-center justify-center text-center hover:border-primary-500 dark:hover:border-primary-400 cursor-pointer transition-colors min-h-[200px]">
                <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-700 flex items-center justify-center mb-4">
                  <IconZap className="w-6 h-6 text-slate-400" />
                </div>
                <p className="font-medium text-slate-900 dark:text-white mb-1">Create New Template</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">Build a custom email template</p>
              </div>

              {/* Sample Templates */}
              {[
                { name: 'Introduction Email', subject: 'Free Website Offer for {{business_name}}', uses: 45 },
                { name: 'Follow Up', subject: 'Quick follow up - {{business_name}}', uses: 23 },
                { name: 'Special Offer', subject: 'Exclusive deal for {{category}} in {{city}}', uses: 12 },
              ].map((template, i) => (
                <div key={i} className="bg-white dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700/50 p-6 hover:shadow-lg transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                      <IconZap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{template.uses} uses</span>
                  </div>
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-1">{template.name}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 truncate">{template.subject}</p>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-lg hover:bg-primary-100 dark:hover:bg-primary-900/40 transition-colors">
                      Edit
                    </button>
                    <button className="flex-1 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
                      Use
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Dashboard;

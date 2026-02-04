import { supabase, isSupabaseConfigured } from './supabase';
import { Lead, SavedLead, SavedSearch, EmailTemplate } from './types';
import logger from './logger';

// ==================== LEADS ====================

/**
 * Save a lead to the database
 */
export const saveLead = async (lead: Omit<SavedLead, 'id' | 'saved_at' | 'user_id'>, userId: string): Promise<SavedLead | null> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot save lead');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('saved_leads')
      .insert({
        ...lead,
        user_id: userId,
        saved_at: new Date().toISOString(),
        status: lead.status || 'new',
        tags: lead.tags || [],
      })
      .select()
      .single();

    if (error) {
      logger.error('Error saving lead:', error);
      throw error;
    }

    return data;
  } catch (err) {
    logger.error('Error in saveLead:', err);
    return null;
  }
};

/**
 * Get all saved leads for a user
 */
export const getSavedLeads = async (userId: string): Promise<SavedLead[]> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot fetch leads');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('saved_leads')
      .select('*')
      .eq('user_id', userId)
      .order('saved_at', { ascending: false });

    if (error) {
      logger.error('Error fetching leads:', error);
      throw error;
    }

    return data || [];
  } catch (err) {
    logger.error('Error in getSavedLeads:', err);
    return [];
  }
};

/**
 * Update a saved lead
 */
export const updateLead = async (leadId: string, updates: Partial<SavedLead>, userId: string): Promise<SavedLead | null> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot update lead');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('saved_leads')
      .update(updates)
      .eq('id', leadId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      logger.error('Error updating lead:', error);
      throw error;
    }

    return data;
  } catch (err) {
    logger.error('Error in updateLead:', err);
    return null;
  }
};

/**
 * Delete a saved lead
 */
export const deleteLead = async (leadId: string, userId: string): Promise<boolean> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot delete lead');
    return false;
  }

  try {
    const { error } = await supabase
      .from('saved_leads')
      .delete()
      .eq('id', leadId)
      .eq('user_id', userId);

    if (error) {
      logger.error('Error deleting lead:', error);
      throw error;
    }

    return true;
  } catch (err) {
    logger.error('Error in deleteLead:', err);
    return false;
  }
};

/**
 * Bulk save multiple leads
 */
export const bulkSaveLeads = async (leads: Lead[], userId: string, searchId?: string): Promise<SavedLead[]> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot save leads');
    return [];
  }

  try {
    const leadsToInsert = leads.map(lead => ({
      ...lead,
      user_id: userId,
      search_id: searchId,
      saved_at: new Date().toISOString(),
      status: 'new' as const,
      tags: [],
    }));

    const { data, error } = await supabase
      .from('saved_leads')
      .insert(leadsToInsert)
      .select();

    if (error) {
      logger.error('Error bulk saving leads:', error);
      throw error;
    }

    return data || [];
  } catch (err) {
    logger.error('Error in bulkSaveLeads:', err);
    return [];
  }
};

// ==================== SEARCHES ====================

/**
 * Save a search to history
 */
export const saveSearch = async (
  keyword: string,
  city: string,
  resultsCount: number,
  leadsWithoutWebsite: number,
  userId: string
): Promise<SavedSearch | null> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot save search');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('saved_searches')
      .insert({
        user_id: userId,
        keyword,
        city,
        results_count: resultsCount,
        leads_without_website: leadsWithoutWebsite,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error saving search:', error);
      throw error;
    }

    return data;
  } catch (err) {
    logger.error('Error in saveSearch:', err);
    return null;
  }
};

/**
 * Get search history for a user
 */
export const getSearchHistory = async (userId: string, limit: number = 20): Promise<SavedSearch[]> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot fetch searches');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('saved_searches')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      logger.error('Error fetching searches:', error);
      throw error;
    }

    return data || [];
  } catch (err) {
    logger.error('Error in getSearchHistory:', err);
    return [];
  }
};

/**
 * Delete a saved search
 */
export const deleteSearch = async (searchId: string, userId: string): Promise<boolean> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot delete search');
    return false;
  }

  try {
    const { error } = await supabase
      .from('saved_searches')
      .delete()
      .eq('id', searchId)
      .eq('user_id', userId);

    if (error) {
      logger.error('Error deleting search:', error);
      throw error;
    }

    return true;
  } catch (err) {
    logger.error('Error in deleteSearch:', err);
    return false;
  }
};

// ==================== EMAIL TEMPLATES ====================

/**
 * Create an email template
 */
export const createEmailTemplate = async (
  template: Omit<EmailTemplate, 'id' | 'created_at' | 'updated_at'>,
  userId: string
): Promise<EmailTemplate | null> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot create template');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('email_templates')
      .insert({
        ...template,
        user_id: userId,
      })
      .select()
      .single();

    if (error) {
      logger.error('Error creating template:', error);
      throw error;
    }

    return data;
  } catch (err) {
    logger.error('Error in createEmailTemplate:', err);
    return null;
  }
};

/**
 * Get all email templates for a user
 */
export const getEmailTemplates = async (userId: string): Promise<EmailTemplate[]> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot fetch templates');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('email_templates')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      logger.error('Error fetching templates:', error);
      throw error;
    }

    return data || [];
  } catch (err) {
    logger.error('Error in getEmailTemplates:', err);
    return [];
  }
};

/**
 * Update an email template
 */
export const updateEmailTemplate = async (
  templateId: string,
  updates: Partial<EmailTemplate>,
  userId: string
): Promise<EmailTemplate | null> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot update template');
    return null;
  }

  try {
    const { data, error } = await supabase
      .from('email_templates')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', templateId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) {
      logger.error('Error updating template:', error);
      throw error;
    }

    return data;
  } catch (err) {
    logger.error('Error in updateEmailTemplate:', err);
    return null;
  }
};

/**
 * Delete an email template
 */
export const deleteEmailTemplate = async (templateId: string, userId: string): Promise<boolean> => {
  if (!supabase || !isSupabaseConfigured) {
    logger.warn('Supabase not configured - cannot delete template');
    return false;
  }

  try {
    const { error } = await supabase
      .from('email_templates')
      .delete()
      .eq('id', templateId)
      .eq('user_id', userId);

    if (error) {
      logger.error('Error deleting template:', error);
      throw error;
    }

    return true;
  } catch (err) {
    logger.error('Error in deleteEmailTemplate:', err);
    return false;
  }
};

// ==================== ACTIVITY LOGGING ====================

/**
 * Log user activity
 */
export const logActivity = async (
  userId: string,
  type: 'search' | 'save_lead' | 'contact' | 'export' | 'status_change',
  description: string,
  metadata?: Record<string, any>
): Promise<void> => {
  if (!supabase || !isSupabaseConfigured) return;

  try {
    await supabase.from('activity_log').insert({
      user_id: userId,
      type,
      description,
      metadata,
    });
  } catch (err) {
    logger.error('Error logging activity:', err);
  }
};

/**
 * Get recent activity for a user
 */
export const getRecentActivity = async (userId: string, limit: number = 10) => {
  if (!supabase || !isSupabaseConfigured) return [];

  try {
    const { data, error } = await supabase
      .from('activity_log')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  } catch (err) {
    logger.error('Error fetching activity:', err);
    return [];
  }
};

// ==================== ANALYTICS ====================

/**
 * Increment search count for user
 */
export const incrementSearchCount = async (userId: string): Promise<void> => {
  if (!supabase || !isSupabaseConfigured) return;

  try {
    // Update profile directly instead of using RPC
    const { data: profile } = await supabase
      .from('profiles')
      .select('searches_this_month')
      .eq('id', userId)
      .single();

    if (profile) {
      await supabase
        .from('profiles')
        .update({ searches_this_month: (profile.searches_this_month || 0) + 1 })
        .eq('id', userId);
    }
  } catch (err) {
    logger.error('Error incrementing search count:', err);
  }
};

/**
 * Increment export count for user
 */
export const incrementExportCount = async (userId: string): Promise<void> => {
  if (!supabase || !isSupabaseConfigured) return;

  try {
    const { data: profile } = await supabase
      .from('profiles')
      .select('exports_this_month')
      .eq('id', userId)
      .single();

    if (profile) {
      await supabase
        .from('profiles')
        .update({ exports_this_month: (profile.exports_this_month || 0) + 1 })
        .eq('id', userId);
    }
  } catch (err) {
    logger.error('Error incrementing export count:', err);
  }
};

/**
 * Get comprehensive user analytics/stats
 */
export const getUserStats = async (userId: string) => {
  if (!supabase || !isSupabaseConfigured) {
    return {
      total_searches: 0,
      total_leads_saved: 0,
      leads_contacted: 0,
      leads_converted: 0,
      leads_by_status: {} as Record<string, number>,
      searches_by_category: [] as { category: string; count: number }[],
      searches_by_city: [] as { city: string; count: number }[],
    };
  }

  try {
    // Get total saved leads
    const { count: totalLeads } = await supabase
      .from('saved_leads')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get total searches
    const { count: totalSearches } = await supabase
      .from('saved_searches')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId);

    // Get leads by status
    const { data: leadsData } = await supabase
      .from('saved_leads')
      .select('status, category, city')
      .eq('user_id', userId);

    const leadsByStatus = (leadsData || []).reduce((acc, lead) => {
      acc[lead.status] = (acc[lead.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    // Get searches by category
    const { data: searchesData } = await supabase
      .from('saved_searches')
      .select('keyword, city')
      .eq('user_id', userId);

    const searchesByCategory = Object.entries(
      (searchesData || []).reduce((acc, s) => {
        acc[s.keyword] = (acc[s.keyword] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    )
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const searchesByCity = Object.entries(
      (searchesData || []).reduce((acc, s) => {
        acc[s.city] = (acc[s.city] || 0) + 1;
        return acc;
      }, {} as Record<string, number>)
    )
      .map(([city, count]) => ({ city, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      total_searches: totalSearches || 0,
      total_leads_saved: totalLeads || 0,
      leads_contacted: leadsByStatus['contacted'] || 0,
      leads_converted: leadsByStatus['converted'] || 0,
      leads_by_status: leadsByStatus,
      searches_by_category: searchesByCategory,
      searches_by_city: searchesByCity,
    };
  } catch (err) {
    logger.error('Error fetching user stats:', err);
    return {
      total_searches: 0,
      total_leads_saved: 0,
      leads_contacted: 0,
      leads_converted: 0,
      leads_by_status: {} as Record<string, number>,
      searches_by_category: [] as { category: string; count: number }[],
      searches_by_city: [] as { city: string; count: number }[],
    };
  }
};

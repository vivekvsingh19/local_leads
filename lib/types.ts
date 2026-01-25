

export interface Lead {
  id: string;
  business_name: string;
  address: string;
  phone: string;
  category: string;
  city: string;
  has_website: boolean;
  website_url?: string;
  google_maps_url: string;
  rating?: number;
  reviews?: number;
  // SaaS features
  saved_at?: string;
  notes?: string;
  tags?: string[];
  status?: 'new' | 'contacted' | 'responded' | 'converted' | 'not_interested';
  last_contacted?: string;
  user_id?: string;
}

export interface SearchParams {
  keyword: string;
  city: string;
  isPro?: boolean; // Pro users get comprehensive search with more results
}

// SaaS User & Subscription Types
export interface User {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  subscription_tier: SubscriptionTier;
  subscription_status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  trial_ends_at?: string;
  searches_this_month: number;
  exports_this_month: number;
  created_at: string;
}

export type SubscriptionTier = 'starter' | 'pro' | 'business' | 'enterprise';

export interface PricingPlan {
  id: SubscriptionTier;
  name: string;
  price: number;
  yearlyPrice: number;
  description: string;
  features: string[];
  limits: {
    searches_per_month: number;
    exports_per_month: number;
    saved_leads: number;
    team_members: number;
    email_templates: number;
  };
  popular?: boolean;
}

export interface SavedSearch {
  id: string;
  user_id: string;
  keyword: string;
  city: string;
  results_count: number;
  leads_without_website: number;
  created_at: string;
  leads?: Lead[];
}

export interface SavedLead extends Lead {
  saved_at: string;
  notes?: string;
  tags: string[];
  status: 'new' | 'contacted' | 'responded' | 'converted' | 'not_interested';
  last_contacted?: string;
  user_id: string;
  search_id?: string;
}

export interface EmailTemplate {
  id: string;
  user_id: string;
  name: string;
  subject: string;
  body: string;
  variables: string[]; // e.g., ['business_name', 'category', 'city']
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  user_id: string;
  team_id: string;
  email: string;
  role: 'owner' | 'admin' | 'member';
  invited_at: string;
  joined_at?: string;
  status: 'pending' | 'active';
}

export interface Analytics {
  total_searches: number;
  total_leads_found: number;
  leads_without_website: number;
  leads_saved: number;
  leads_contacted: number;
  leads_converted: number;
  conversion_rate: number;
  searches_by_category: { category: string; count: number }[];
  searches_by_city: { city: string; count: number }[];
  recent_activity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'search' | 'save_lead' | 'contact' | 'export' | 'status_change';
  description: string;
  created_at: string;
  metadata?: Record<string, any>;
}

// Pricing Plans Configuration
// Based on realistic usage patterns for lead generation:
// - Freelancers: 5-10 searches/week, 2-3 exports/week
// - Small Teams: 20-30 searches/week, 5-10 exports/week
// - Agencies: 50+ searches/week, unlimited exports
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 9,
    yearlyPrice: 89,
    description: 'For freelancers testing the market',
    features: [
      '40 searches per month (~10/week)',
      '12 CSV exports per month',
      'Save up to 500 leads',
      'Leads without website filter',
      'Basic analytics',
      'Email support',
      '14-day free trial',
      'No credit card required',
    ],
    limits: {
      searches_per_month: 40,
      exports_per_month: 12,
      saved_leads: 500,
      team_members: 1,
      email_templates: 3,
    },
  },
  {
    id: 'pro',
    name: 'Professional',
    price: 29,
    yearlyPrice: 290,
    description: 'For active freelancers & small teams',
    popular: true,
    features: [
      '200 searches per month (~50/week)',
      'Unlimited CSV exports',
      'Unlimited saved leads',
      'Save & organize searches',
      'Advanced filtering & sorting',
      'Lead status tracking',
      'Search history & trends',
      'Up to 3 team members',
      'Priority support',
      '14-day free trial',
      '~200-400 leads/month potential',
    ],
    limits: {
      searches_per_month: 200,
      exports_per_month: -1, // unlimited
      saved_leads: -1, // unlimited
      team_members: 3,
      email_templates: 10,
    },
  },
  {
    id: 'business',
    name: 'Business',
    price: 79,
    yearlyPrice: 790,
    description: 'For growth-focused agencies & teams',
    features: [
      'Unlimited searches',
      'Unlimited exports',
      'Unlimited leads saved',
      'Advanced analytics & reporting',
      'Lead quality scoring',
      'Bulk lead management',
      'Search templates & automation',
      'Up to 10 team members',
      'Dedicated support',
      'API access',
      'White-label exports',
      '14-day free trial',
      '1000s of leads/month potential',
    ],
    limits: {
      searches_per_month: -1, // unlimited
      exports_per_month: -1,
      saved_leads: -1,
      team_members: 10,
      email_templates: -1, // unlimited
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 199,
    yearlyPrice: 1990,
    description: 'For large-scale operations & resellers',
    features: [
      'Everything in Business',
      'Unlimited team members',
      'Dedicated account manager',
      'Phone & email support',
      'Custom data fields',
      'Advanced integrations',
      'Lead enrichment data',
      'Bulk imports/exports',
      'Custom reporting',
      'SLA guarantees',
      'Training & onboarding',
      'Volume pricing available',
      '14-day free trial',
    ],
    limits: {
      searches_per_month: -1, // unlimited
      exports_per_month: -1,
      saved_leads: -1,
      team_members: -1,
      email_templates: -1,
    },
  },
];

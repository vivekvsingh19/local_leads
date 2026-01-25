

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
export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    price: 14,
    yearlyPrice: 149,
    description: 'Perfect for freelancers just getting started',
    features: [
      '300 searches per month',
      '50 CSV exports per month',
      'Save up to 1,000 leads',
      '20 email templates',
      'Search history & analytics',
      'Email support',
      '14-day free trial',
    ],
    limits: {
      searches_per_month: 300,
      exports_per_month: 50,
      saved_leads: 1000,
      team_members: 1,
      email_templates: 20,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 39,
    yearlyPrice: 399,
    description: 'For growing freelancers & agencies',
    popular: true,
    features: [
      '1,500 searches per month',
      'Unlimited exports',
      'Unlimited saved leads',
      'Unlimited email templates',
      'Advanced analytics & reports',
      'Priority support',
      'API access',
      '5 team members',
      'Saved searches',
      '14-day free trial',
    ],
    limits: {
      searches_per_month: 1500,
      exports_per_month: -1, // unlimited
      saved_leads: -1, // unlimited
      team_members: 5,
      email_templates: -1, // unlimited
    },
  },
  {
    id: 'business',
    name: 'Business',
    price: 99,
    yearlyPrice: 999,
    description: 'For agencies & scaling teams',
    features: [
      'Unlimited searches',
      'Unlimited exports',
      'Unlimited saved leads',
      'Unlimited email templates',
      'Advanced analytics',
      'Priority support',
      'Full API access',
      'Unlimited team members',
      'White-label reports',
      'Custom integrations',
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
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 299,
    yearlyPrice: 2990,
    description: 'For large organizations & custom needs',
    features: [
      'Everything in Business',
      'Dedicated account manager',
      'Phone & chat support',
      'Custom data sources',
      'Advanced security & SSO',
      'SLA guarantees',
      'Training & onboarding',
      'Custom integrations',
      'On-premise options available',
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



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

export type SubscriptionTier = 'free' | 'starter' | 'pro' | 'business';

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
    id: 'free',
    name: 'Free',
    price: 0,
    yearlyPrice: 0,
    description: 'Perfect for trying out the platform',
    features: [
      '10 searches per month',
      '2 CSV exports per month',
      'Save up to 50 leads',
      'Basic email templates',
      'Community support',
    ],
    limits: {
      searches_per_month: 10,
      exports_per_month: 2,
      saved_leads: 50,
      team_members: 1,
      email_templates: 3,
    },
  },
  {
    id: 'starter',
    name: 'Starter',
    price: 29,
    yearlyPrice: 290,
    description: 'For freelancers getting started',
    features: [
      '100 searches per month',
      '20 CSV exports per month',
      'Save up to 500 leads',
      '10 email templates',
      'Search history & analytics',
      'Email support',
    ],
    limits: {
      searches_per_month: 100,
      exports_per_month: 20,
      saved_leads: 500,
      team_members: 1,
      email_templates: 10,
    },
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 79,
    yearlyPrice: 790,
    description: 'For growing agencies',
    popular: true,
    features: [
      '500 searches per month',
      'Unlimited exports',
      'Unlimited saved leads',
      'Unlimited email templates',
      'Advanced analytics',
      'Priority support',
      'API access',
      '3 team members',
    ],
    limits: {
      searches_per_month: 500,
      exports_per_month: -1, // unlimited
      saved_leads: -1, // unlimited
      team_members: 3,
      email_templates: -1, // unlimited
    },
  },
  {
    id: 'business',
    name: 'Business',
    price: 199,
    yearlyPrice: 1990,
    description: 'For large teams & agencies',
    features: [
      'Unlimited searches',
      'Unlimited everything',
      'White-label reports',
      'Custom integrations',
      'Dedicated account manager',
      'Phone support',
      'Unlimited team members',
      'Custom email domain',
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

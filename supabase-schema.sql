-- =====================================================
-- LocalLeads Supabase Database Schema
-- =====================================================
-- Run this SQL in your Supabase Dashboard -> SQL Editor
-- This creates all the tables needed for the application
-- =====================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- PROFILES TABLE
-- Stores user profile information and subscription data
-- =====================================================
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    subscription_tier TEXT NOT NULL DEFAULT 'starter' CHECK (subscription_tier IN ('starter', 'pro', 'business')),
    subscription_status TEXT NOT NULL DEFAULT 'active' CHECK (subscription_status IN ('active', 'cancelled', 'past_due', 'trialing')),
    trial_ends_at TIMESTAMPTZ,
    searches_this_month INTEGER NOT NULL DEFAULT 0,
    exports_this_month INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- =====================================================
-- SAVED_LEADS TABLE
-- Stores leads that users have saved
-- =====================================================
CREATE TABLE IF NOT EXISTS public.saved_leads (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    business_name TEXT NOT NULL,
    address TEXT,
    phone TEXT,
    category TEXT,
    city TEXT,
    has_website BOOLEAN DEFAULT FALSE,
    website_url TEXT,
    google_maps_url TEXT,
    rating DECIMAL(2,1),
    reviews INTEGER,
    saved_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes TEXT,
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'responded', 'converted', 'not_interested')),
    last_contacted TIMESTAMPTZ,
    search_id UUID,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.saved_leads ENABLE ROW LEVEL SECURITY;

-- Saved leads policies
CREATE POLICY "Users can view own saved leads" ON public.saved_leads
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved leads" ON public.saved_leads
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own saved leads" ON public.saved_leads
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved leads" ON public.saved_leads
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- SAVED_SEARCHES TABLE
-- Stores search history for users
-- =====================================================
CREATE TABLE IF NOT EXISTS public.saved_searches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    keyword TEXT NOT NULL,
    city TEXT NOT NULL,
    results_count INTEGER DEFAULT 0,
    leads_without_website INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;

-- Saved searches policies
CREATE POLICY "Users can view own saved searches" ON public.saved_searches
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own saved searches" ON public.saved_searches
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own saved searches" ON public.saved_searches
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- EMAIL_TEMPLATES TABLE
-- Stores custom email templates for outreach
-- =====================================================
CREATE TABLE IF NOT EXISTS public.email_templates (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    name TEXT NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    variables TEXT[] DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.email_templates ENABLE ROW LEVEL SECURITY;

-- Email templates policies
CREATE POLICY "Users can view own email templates" ON public.email_templates
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own email templates" ON public.email_templates
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own email templates" ON public.email_templates
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own email templates" ON public.email_templates
    FOR DELETE USING (auth.uid() = user_id);

-- =====================================================
-- ACTIVITY_LOG TABLE
-- Stores user activity history
-- =====================================================
CREATE TABLE IF NOT EXISTS public.activity_log (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('search', 'save_lead', 'contact', 'export', 'status_change')),
    description TEXT NOT NULL,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;

-- Activity log policies
CREATE POLICY "Users can view own activity" ON public.activity_log
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own activity" ON public.activity_log
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- =====================================================
-- FUNCTIONS
-- =====================================================

-- Function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, avatar_url)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NEW.raw_user_meta_data->>'picture', '')
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to increment search count
CREATE OR REPLACE FUNCTION public.increment_search_count(user_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.profiles
    SET searches_this_month = searches_this_month + 1,
        updated_at = NOW()
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment export count
CREATE OR REPLACE FUNCTION public.increment_export_count(user_id UUID)
RETURNS VOID AS $$
BEGIN
    UPDATE public.profiles
    SET exports_this_month = exports_this_month + 1,
        updated_at = NOW()
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to reset monthly counts (run via cron job)
CREATE OR REPLACE FUNCTION public.reset_monthly_counts()
RETURNS VOID AS $$
BEGIN
    UPDATE public.profiles
    SET searches_this_month = 0,
        exports_this_month = 0,
        updated_at = NOW();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_saved_leads_updated_at
    BEFORE UPDATE ON public.saved_leads
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_email_templates_updated_at
    BEFORE UPDATE ON public.email_templates
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =====================================================
-- INDEXES for better query performance
-- =====================================================
CREATE INDEX IF NOT EXISTS idx_saved_leads_user_id ON public.saved_leads(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_leads_status ON public.saved_leads(status);
CREATE INDEX IF NOT EXISTS idx_saved_leads_category ON public.saved_leads(category);
CREATE INDEX IF NOT EXISTS idx_saved_leads_city ON public.saved_leads(city);
CREATE INDEX IF NOT EXISTS idx_saved_searches_user_id ON public.saved_searches(user_id);
CREATE INDEX IF NOT EXISTS idx_email_templates_user_id ON public.email_templates(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_user_id ON public.activity_log(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_log_created_at ON public.activity_log(created_at DESC);

-- =====================================================
-- GRANT PERMISSIONS
-- =====================================================
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT EXECUTE ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;

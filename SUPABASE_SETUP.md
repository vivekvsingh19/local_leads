# Supabase Integration Guide

## Overview

This app is integrated with Supabase for:
- **Authentication** (Google OAuth + Email/Password)
- **Database** (PostgreSQL for saving leads, searches, templates)
- **Row Level Security** (Users can only access their own data)

## Quick Setup

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned

### 2. Configure Environment Variables

Your `.env.local` should have:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

Get these from: **Supabase Dashboard → Settings → API**

### 3. Run Database Schema

1. Go to **Supabase Dashboard → SQL Editor**
2. Copy the contents of `supabase-schema.sql`
3. Click **Run** to create all tables

### 4. Enable Authentication Providers

#### Email/Password Authentication
1. Go to **Authentication → Providers**
2. Email should be enabled by default
3. Configure settings:
   - Enable email confirmations (optional)
   - Set password minimum length

#### Google OAuth (Optional but Recommended)
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Go to **APIs & Services → Credentials**
4. Create **OAuth 2.0 Client ID** (Web application)
5. Add authorized redirect URI:
   ```
   https://your-project-id.supabase.co/auth/v1/callback
   ```
6. Copy the **Client ID** and **Client Secret**
7. In Supabase: **Authentication → Providers → Google**
8. Enable and paste the credentials

### 5. Configure Site URL

1. Go to **Authentication → URL Configuration**
2. Set **Site URL** to your app URL:
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
3. Add **Redirect URLs**:
   ```
   http://localhost:3000
   http://localhost:3001
   http://localhost:3002
   https://yourdomain.com
   ```

## Database Schema

The following tables are created:

### `profiles`
Stores user information and subscription data.
- Automatically created when a user signs up (via trigger)
- Contains: email, name, avatar, subscription tier, usage counts

### `saved_leads`
Stores leads that users save.
- Fields: business name, address, phone, category, city, website status
- Status tracking: new, contacted, responded, converted, not_interested
- Tags and notes for organization

### `saved_searches`
Stores search history.
- Fields: keyword, city, results count, leads without website count

### `email_templates`
Stores custom outreach templates.
- Fields: name, subject, body, template variables

## Features Included

### Authentication (`lib/auth.tsx`)
- `useAuth()` hook for accessing auth state
- Sign in with Google
- Sign in/up with email/password
- Password reset
- Session management
- Profile auto-creation

### Database Functions (`lib/database.ts`)
- `saveLead()` - Save a single lead
- `getSavedLeads()` - Get all user's leads
- `updateLead()` - Update lead status/notes
- `deleteLead()` - Remove a saved lead
- `bulkSaveLeads()` - Save multiple leads at once
- `saveSearch()` - Save search to history
- `getSearchHistory()` - Get past searches
- `createEmailTemplate()` - Create outreach template
- `getEmailTemplates()` - Get all templates
- `getUserStats()` - Get user analytics

## Usage Examples

### Using Auth in Components

```tsx
import { useAuth } from '../lib/auth';

const MyComponent = () => {
  const { user, profile, signOut, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <button onClick={() => /* open login */}>Sign In</button>;
  }

  return (
    <div>
      <p>Welcome, {profile?.full_name || user.email}!</p>
      <p>Plan: {profile?.subscription_tier}</p>
      <button onClick={signOut}>Sign Out</button>
    </div>
  );
};
```

### Saving Leads

```tsx
import { saveLead } from '../lib/database';
import { useAuth } from '../lib/auth';

const SaveLeadButton = ({ lead }) => {
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) return;

    const saved = await saveLead({
      business_name: lead.name,
      address: lead.address,
      phone: lead.phone,
      category: 'Restaurants',
      city: 'Austin',
      has_website: false,
      google_maps_url: lead.url,
    }, user.id);

    if (saved) {
      console.log('Lead saved!', saved.id);
    }
  };

  return <button onClick={handleSave}>Save Lead</button>;
};
```

## Troubleshooting

### "Supabase not configured" error
- Check that `.env.local` has the correct values
- Restart the dev server after updating env vars

### Google login not working
- Verify OAuth credentials in Google Cloud Console
- Check redirect URI matches exactly
- Ensure Google provider is enabled in Supabase

### Profile not being created
- Run the SQL schema to create the trigger
- Check Supabase logs for errors

### RLS policy errors
- Make sure the user is authenticated
- Check that you're passing the correct user_id

## Security Notes

1. **Never expose** the `service_role` key in frontend code
2. **Always use** `anon` key for client-side operations
3. **RLS policies** ensure users can only access their own data
4. **Environment variables** starting with `VITE_` are exposed to the browser

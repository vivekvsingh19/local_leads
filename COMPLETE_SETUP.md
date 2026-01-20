# 🚀 Complete Setup Guide - Get LocalLeads Working

This guide walks you through setting up all APIs and getting the app fully functional.

## Prerequisites

- Node.js 16+ installed
- npm or yarn
- Google Cloud account
- Supabase account (free)

---

## Step 1: Clone & Install Dependencies

```bash
cd /home/vivek/localleads---simple-lead-finder
npm install
```

---

## Step 2: Set Up Google Maps API

### 2.1 Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Click **"Select a project"** → **"New Project"**
3. Name it: `LocalLeads`
4. Click **Create**
5. Wait for project creation (takes ~30 seconds)

### 2.2 Enable Required APIs

In the Google Cloud Console:

1. Click the **search bar** at the top
2. Search for **"Places API"** → Click it
3. Click **Enable**
4. Search for **"Maps JavaScript API"** → Click it
5. Click **Enable**

### 2.3 Create an API Key

1. Go to **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **API Key**
3. A popup shows your API key - **copy it**
4. Click **Edit API key**
5. Under **Application restrictions**, select **HTTP referrers (web sites)**
6. Add your website domains (for development, add `http://localhost:3000`)
7. Under **API restrictions**, select **Restrict key**
8. Check only:
   - ✅ Places API
   - ✅ Maps JavaScript API
9. Click **Save**

**Your API Key:** (Save this - you'll need it next)
```
YOUR_GOOGLE_API_KEY_HERE
```

---

## Step 3: Set Up Supabase

### 3.1 Create a Supabase Project

1. Go to [Supabase](https://app.supabase.com)
2. Click **New Project**
3. Enter:
   - **Name:** `LocalLeads`
   - **Database Password:** Create a strong password
   - **Region:** Choose closest to you
4. Click **Create new project** (takes ~2-3 minutes)

### 3.2 Get Your Supabase Credentials

After project is created:

1. Go to **Settings** → **API**
2. Copy:
   - **Project URL** (Project URL field)
   - **Anon Key** (anon public field)

**Your Credentials:**
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Step 4: Create `.env.local` File

In the project root directory, create a file named `.env.local`:

```bash
# In the project directory
cat > .env.local << 'EOF'
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_GOOGLE_MAPS_API_KEY=your-google-api-key-here
EOF
```

**Or manually create the file with:**

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY
```

Replace the values with your actual credentials from Step 2 & 3.

---

## Step 5: Start the Development Server

```bash
npm run dev
```

You should see:
```
  VITE v6.2.0  ready in XXX ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

Open **http://localhost:3000** in your browser.

---

## Step 6: Test the App

### 6.1 Test Google Maps API

1. On the homepage, you'll see the search form
2. Enter:
   - **Keyword:** `Plumbers`
   - **City:** `Austin, TX`
3. Click **Search Leads**
4. Wait a few seconds...

**You should see real businesses from Google Maps!** ✅

If you see "Using simulation mode", your API key isn't configured. Check the console for errors.

### 6.2 Check Browser Console

Press **F12** → **Console** tab to see:
- Successful API calls
- Any errors
- Debug messages

### 6.3 Test Authentication (Optional)

1. Click **Login** button (top right)
2. Enter any email and password
3. You'll be authenticated via Supabase

---

## Troubleshooting

### "Google Maps API key not configured"
- ✅ Check `.env.local` file exists
- ✅ Verify `VITE_GOOGLE_MAPS_API_KEY` is filled in
- ✅ Restart dev server: `Ctrl+C` then `npm run dev`
- ✅ Hard refresh browser: `Ctrl+Shift+R`

### "Places API not enabled" (in browser console)
- Go to Google Cloud Console
- Search for "Places API"
- Click **Enable**
- Wait 1-2 minutes for changes to take effect

### "API key restriction error"
- Go to Google Cloud Console → **Credentials**
- Edit your API key
- Under "HTTP referrers", add `http://localhost:3000`
- Save and wait ~1 minute

### "Supabase connection error"
- Check `.env.local` has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`
- Verify project is still active in Supabase dashboard
- Check network tab in browser (F12 → Network)

### App loads but shows simulation data
- Console will show: `"Google Maps API key not configured"`
- This is normal fallback mode
- Add your Google Maps API key to proceed

---

## File Locations

**Important Files:**
- `.env.local` - Your secrets (don't commit!)
- `.env.example` - Template (safe to commit)
- `lib/api.ts` - Google Maps integration
- `lib/supabase.ts` - Supabase setup
- `components/Hero.tsx` - Search interface

**Configuration Files:**
- `vite.config.ts` - Build configuration
- `tsconfig.json` - TypeScript settings
- `package.json` - Dependencies

---

## API Usage & Pricing

### Google Maps Places API
- **Free tier:** 100 requests/day included
- **Pricing:** $7 per 100 requests after free tier
- **Setup:** Already configured - just add your key

### Supabase
- **Free tier:** Unlimited reads/writes, 1GB database
- **Perfect for:** Development and small projects
- **Scaling:** Pay-as-you-go for larger projects

---

## Security Checklist ✅

Before deploying to production:

- [ ] Never commit `.env.local` (it's in `.gitignore`)
- [ ] Use different API keys for production
- [ ] Restrict Google Maps key to your production domain
- [ ] Enable API rate limiting
- [ ] Use Supabase Row Level Security (RLS)
- [ ] Rotate API keys monthly

---

## Next Steps

Once the app is running:

1. **Customize search categories** in `components/Hero.tsx`
2. **Add more cities** to suggestions
3. **Extend lead fields** in `lib/types.ts`
4. **Build lead management** features in Supabase
5. **Deploy to production** (Vercel, Netlify, etc.)

---

## Quick Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for TypeScript errors
npx tsc --noEmit
```

---

## Need Help?

If you get stuck:

1. Check `.env.local` has all 3 variables
2. Check browser console (F12) for error messages
3. Restart dev server after making `.env.local` changes
4. Try the simulation mode to ensure the UI works
5. Check network tab to see API requests

---

**Ready to find local leads! 🎉**

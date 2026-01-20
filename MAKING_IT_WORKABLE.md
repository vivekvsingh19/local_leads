# 🎯 Make LocalLeads Workable - Complete Action Plan

## What You Need to Do

This document shows **exactly what to do** to get the app working with real API data.

---

## 📋 Prerequisites (5 minutes)

```
✅ Node.js 16+ (check: node --version)
✅ npm (check: npm --version)
✅ Google account
✅ Email address (for Supabase)
```

---

## 🔑 Part 1: Get Google Maps API Key (10 minutes)

### Step 1.1: Go to Google Cloud Console
```
1. Open: https://console.cloud.google.com
2. Click: "Select a project" at top
3. Click: "New Project"
4. Name: "LocalLeads"
5. Click: "Create"
⏱️ Wait ~30 seconds for project to be created
```

### Step 1.2: Enable Required APIs
```
1. In Google Cloud Console, click search bar at top
2. Search: "Places API"
3. Click on result → Click "Enable"
4. Search: "Maps JavaScript API"
5. Click on result → Click "Enable"
⏱️ Wait ~1 minute
```

### Step 1.3: Create API Key
```
1. Go to: "APIs & Services" (left sidebar)
2. Go to: "Credentials"
3. Click: "+ Create Credentials" (top)
4. Select: "API Key"
5. A popup shows your API key - COPY IT
   Save as: GOOGLE_API_KEY
```

### Step 1.4: Restrict Your API Key
```
1. In Credentials page, find your API key
2. Click: "Edit API key"
3. Scroll to: "Application restrictions"
4. Select: "HTTP referrers (web sites)"
5. Click: "Add an item"
6. Enter: http://localhost:3000
7. Scroll to: "API restrictions"
8. Select: "Restrict key"
9. Check these boxes:
   ✓ Places API
   ✓ Maps JavaScript API
10. Click: "Save"
⏱️ Wait ~1 minute
```

**✅ Your Google API Key is ready!**

---

## 🔐 Part 2: Get Supabase Credentials (10 minutes)

### Step 2.1: Create Supabase Project
```
1. Go to: https://app.supabase.com
2. Sign up or log in (use Google/GitHub)
3. Click: "New Project"
4. Fill in:
   - Name: "LocalLeads"
   - Database Password: (strong password - SAVE IT)
   - Region: (choose nearest to you)
5. Click: "Create new project"
⏱️ Wait 2-3 minutes for database to initialize
```

### Step 2.2: Get Your Credentials
```
1. Once project loads, go to: "Settings" (left sidebar)
2. Go to: "API"
3. Under "Project URL":
   Copy this → Save as: SUPABASE_URL
4. Under "anon public":
   Copy this → Save as: SUPABASE_ANON_KEY
```

**✅ Your Supabase credentials are ready!**

---

## 💾 Part 3: Create `.env.local` File (2 minutes)

### Step 3.1: Create the File
```
Location: Project root directory
         /home/vivek/localleads---simple-lead-finder/

Filename: .env.local  (exactly this name!)

Content:
```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGc...xxxxx
VITE_GOOGLE_MAPS_API_KEY=AIzaSy...xxxxx
```
```

### Step 3.2: Fill in Your Values
Replace with values you saved:
- `VITE_SUPABASE_URL` ← Your Supabase URL
- `VITE_SUPABASE_ANON_KEY` ← Your Supabase Anon Key
- `VITE_GOOGLE_MAPS_API_KEY` ← Your Google API Key

### Step 3.3: Save the File
- Save the file
- Make sure it's in the project root
- Name must be exactly `.env.local` (with the dot!)

**✅ Your environment variables are configured!**

---

## 🚀 Part 4: Install & Run the App (5 minutes)

### Step 4.1: Install Dependencies
```bash
cd /home/vivek/localleads---simple-lead-finder
npm install
```
⏱️ Wait for installation to complete

### Step 4.2: Start Development Server
```bash
npm run dev
```

You should see:
```
  VITE v6.2.0  ready in 234 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

### Step 4.3: Open in Browser
```
1. Open: http://localhost:3000
2. You should see the LocalLeads homepage
3. Do NOT close the terminal!
```

**✅ App is running!**

---

## ✅ Part 5: Test the App (5 minutes)

### Test 1: Try a Search
```
1. In the app, find the search box
2. Enter:
   - Keyword: "Plumbers"
   - City: "Austin, TX"
3. Click: "Search Leads" button
4. Wait a few seconds...
```

### Expected Result 1: Real Data ✅
```
You see a list of real plumbers in Austin with:
- Business names
- Phone numbers
- Addresses
- Ratings
- Google Maps links
```

### Expected Result 2: Simulation Mode ⚠️
```
You see: "Using simulation mode" in browser console (F12)
This means:
- Your .env.local might be wrong
- Or Google API key isn't working yet
```

### Test 2: Check Browser Console
```
1. Press: F12 (or right-click → Inspect)
2. Click: "Console" tab
3. Look for messages:
   ✅ "Google Places API is working"
   ⚠️ "Using simulation mode"
   ❌ Any red error messages
```

---

## 🔧 If Simulation Mode Shows

Don't worry! This is easy to fix:

### Quick Fix 1: Restart Server
```bash
1. In terminal: Press Ctrl+C (stops the server)
2. Run: npm run dev (starts it again)
3. Hard refresh browser: Ctrl+Shift+R
4. Try search again
```

### Quick Fix 2: Check .env.local
```
1. Make sure .env.local exists
2. Make sure it has all 3 variables:
   ✓ VITE_SUPABASE_URL
   ✓ VITE_SUPABASE_ANON_KEY
   ✓ VITE_GOOGLE_MAPS_API_KEY
3. Make sure values aren't empty
4. Restart server
```

### Quick Fix 3: Check Google API Key
```
1. Go to: https://console.cloud.google.com
2. Check: "Places API" is Enabled
3. Check: "Maps JavaScript API" is Enabled
4. Go to Credentials
5. Check your API key exists
6. Wait ~2 minutes, then try again
```

---

## 📚 Full Documentation

For detailed information:

| Need | File |
|------|------|
| Overview | DOCUMENTATION_INDEX.md |
| Detailed steps | COMPLETE_SETUP.md |
| Quick lookup | QUICK_REFERENCE.md |
| Environment vars | ENV_SETUP.md |
| Having issues? | TROUBLESHOOTING.md |

---

## 🎯 Summary of What Happens

### With Real API Key ✅
```
User enters search
    ↓
App sends to Google Maps API
    ↓
Google returns real businesses
    ↓
User sees real data!
```

### Without API Key ⚠️
```
User enters search
    ↓
App checks for API key (not found)
    ↓
App generates fake data (for testing)
    ↓
User sees simulation results
```

**Both modes work! The difference is:**
- **With API key**: Real business data from Google Maps
- **Without API key**: Generated fake data (for UI testing)

---

## ✨ What You Can Do Now

✅ Search for businesses by keyword and location
✅ Get phone numbers and addresses
✅ See ratings and reviews
✅ Export leads to CSV
✅ Log in with email
✅ Beautiful dark mode UI

---

## 🚀 Ready?

1. **Get your API keys** (Parts 1-2, ~20 min)
2. **Create .env.local** (Part 3, ~2 min)
3. **Run the app** (Part 4, ~5 min)
4. **Test it** (Part 5, ~5 min)

**Total time: ~35 minutes to be fully working!**

---

## 💡 If You Get Stuck

```
Problem: "Google Maps API key not configured"
→ Check if .env.local file exists
→ Check if VITE_GOOGLE_MAPS_API_KEY is filled in
→ Restart server: Ctrl+C then npm run dev

Problem: "CORS error" in console
→ Add http://localhost:3000 to Google API key restrictions
→ Wait 1-2 minutes for changes to apply

Problem: "Supabase connection error"
→ Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
→ Verify Supabase project is still active

Problem: Can't see environment variables
→ Delete .env.local and create it again
→ Check variable names exactly match (with VITE_ prefix)
→ No spaces around = sign
```

---

## 🎉 Congratulations!

You now have a fully functional lead-finding application with:
- ✅ Real Google Maps API integration
- ✅ Supabase authentication & database
- ✅ Environmental security (no hardcoded secrets)
- ✅ Production-ready setup

**Time to start finding leads! 🚀**

---

## 📞 Questions?

All answers are in the documentation:
- **COMPLETE_SETUP.md** - Most detailed
- **TROUBLESHOOTING.md** - Common problems
- **QUICK_REFERENCE.md** - Quick answers
- **ENV_SETUP.md** - Environment variables

---

**Happy lead hunting! 🎯**

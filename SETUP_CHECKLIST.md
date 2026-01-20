# ✅ Complete Setup Verification Checklist

## 🎯 This is Your Checklist to Get the App Working

Print this out or keep it open while following the setup guides.

---

## Phase 1: Preparation (5 min) ⏱️

- [ ] Node.js 16+ installed: `node --version`
- [ ] npm installed: `npm --version`
- [ ] Google account ready
- [ ] Email address ready (for Supabase)

---

## Phase 2: Get Google Maps API Key (10 min) ⏱️

### 2.1 Create Google Cloud Project
- [ ] Go to: https://console.cloud.google.com
- [ ] Click "Select a project"
- [ ] Click "New Project"
- [ ] Enter name: "LocalLeads"
- [ ] Click "Create"
- [ ] ⏱️ Wait ~30 seconds for creation

### 2.2 Enable Required APIs
- [ ] Search for "Places API" → Click → Enable
- [ ] Search for "Maps JavaScript API" → Click → Enable
- [ ] ⏱️ Wait ~1 minute

### 2.3 Create API Key
- [ ] Go to: APIs & Services → Credentials
- [ ] Click: "+ Create Credentials" → "API Key"
- [ ] Copy the API key
- [ ] Save it somewhere safe (you'll need it in 5 min)

### 2.4 Configure API Key Restrictions
- [ ] Edit your API key
- [ ] Set Application restrictions: "HTTP referrers (web sites)"
- [ ] Add: `http://localhost:3000`
- [ ] Set API restrictions: Check only:
  - [ ] Places API
  - [ ] Maps JavaScript API
- [ ] Click "Save"
- [ ] ⏱️ Wait ~1 minute for changes to apply

**✅ Google API Key Done!**

---

## Phase 3: Get Supabase Credentials (10 min) ⏱️

### 3.1 Create Supabase Project
- [ ] Go to: https://app.supabase.com
- [ ] Sign up / Log in (use Google or GitHub)
- [ ] Click "New Project"
- [ ] Fill in:
  - [ ] Name: "LocalLeads"
  - [ ] Database Password: (create strong password)
  - [ ] Region: (choose nearest to you)
- [ ] Click "Create new project"
- [ ] ⏱️ Wait 2-3 minutes for database to initialize

### 3.2 Get Your Credentials
- [ ] Go to: Settings → API
- [ ] Copy "Project URL" - Save as: `SUPABASE_URL`
- [ ] Copy "anon public" - Save as: `SUPABASE_ANON_KEY`

**✅ Supabase Credentials Done!**

---

## Phase 4: Create .env.local File (2 min) ⏱️

### 4.1 Create File
- [ ] Location: `/home/vivek/localleads---simple-lead-finder/`
- [ ] Filename: `.env.local` (exactly!)
- [ ] Note: Dot (.) at the beginning is important!

### 4.2 Fill In Content
Add these 3 lines to `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-key-here
VITE_GOOGLE_MAPS_API_KEY=your-key-here
```

Where:
- [ ] Replace first `xxxxx` with your Supabase URL (without the `https://` part before the dots)
- [ ] Replace `your-key-here` with your Supabase Anon Key
- [ ] Replace second `your-key-here` with your Google Maps API Key

### 4.3 Verify File
- [ ] .env.local exists in project root
- [ ] All 3 variables are filled in
- [ ] No spaces around `=` sign
- [ ] No quotes around values
- [ ] Save the file

**✅ Environment Variables Done!**

---

## Phase 5: Install & Run (5 min) ⏱️

### 5.1 Install Dependencies
- [ ] Open terminal
- [ ] Navigate to project: `cd /home/vivek/localleads---simple-lead-finder`
- [ ] Run: `npm install`
- [ ] ⏱️ Wait for installation to complete (2-3 min)

### 5.2 Start Dev Server
- [ ] Run: `npm run dev`
- [ ] See message: "Local: http://localhost:3000"
- [ ] Note: Keep this terminal open!

**✅ App Running!**

---

## Phase 6: Test the App (5 min) ⏱️

### 6.1 Open in Browser
- [ ] Open: http://localhost:3000
- [ ] See: LocalLeads homepage
- [ ] Form visible: Search box with keyword and city

### 6.2 Try a Search
- [ ] Enter keyword: `Plumbers`
- [ ] Enter city: `Austin, TX`
- [ ] Click: "Search Leads"
- [ ] ⏱️ Wait 2-3 seconds

### 6.3 Check Results - Expected Scenario 1 ✅
- [ ] See list of real businesses
- [ ] Each has:
  - [ ] Business name
  - [ ] Phone number
  - [ ] Address
  - [ ] Rating
  - [ ] Google Maps link
- [ ] **✅ SUCCESS! You're getting real data from Google Maps!**

### 6.4 Check Results - Expected Scenario 2 ⚠️
- [ ] See list of businesses
- [ ] But they look fake/generated
- [ ] Open browser console: F12 → Console
- [ ] See message: "Using simulation mode"
- [ ] **This means:** Your Google API key isn't configured yet
- [ ] **To fix:** Check .env.local file
  - [ ] Verify VITE_GOOGLE_MAPS_API_KEY is filled
  - [ ] Verify no empty lines
  - [ ] Save file again
  - [ ] Restart server: Ctrl+C → npm run dev
  - [ ] Hard refresh browser: Ctrl+Shift+R
  - [ ] Try search again

**✅ Testing Complete!**

---

## 🎉 Final Verification

If you got this far with ✅ marks, congratulations!

- [ ] All 3 environment variables configured
- [ ] npm install completed
- [ ] npm run dev running
- [ ] http://localhost:3000 loads
- [ ] Search works (real or simulation data)

---

## 🆘 If Something Didn't Work

### Issue: "npm: command not found"
- [ ] Install Node.js from: https://nodejs.org
- [ ] Restart terminal
- [ ] Try again

### Issue: .env.local not being read
- [ ] Check filename: must be `.env.local` (not `.env`)
- [ ] Check location: project root
- [ ] Check format: Variables start with `VITE_`
- [ ] Restart server after creating/modifying file

### Issue: "Port 3000 already in use"
- [ ] Run: `npm run dev -- --port 3001`
- [ ] Open: http://localhost:3001

### Issue: Google Maps errors in console
- [ ] Check API key is in .env.local
- [ ] Check Places API is Enabled in Google Cloud
- [ ] Check Maps JavaScript API is Enabled
- [ ] Wait 1-2 minutes for API restrictions to apply
- [ ] Try again

### Issue: Supabase connection error
- [ ] Check VITE_SUPABASE_URL format
- [ ] Should be: `https://xxxxx.supabase.co`
- [ ] Check VITE_SUPABASE_ANON_KEY is not empty
- [ ] Verify Supabase project is active

---

## 📚 Need More Help?

If you get stuck, check these in order:

1. **MAKING_IT_WORKABLE.md** - The step-by-step guide
2. **TROUBLESHOOTING.md** - Find your specific error
3. **QUICK_REFERENCE.md** - Quick answers
4. **ENV_SETUP.md** - Environment variable help

---

## ✨ What You Should See

### Homepage (http://localhost:3000)
- Dark/light theme toggle
- "Find Local Leads Without Websites" headline
- Search form with:
  - Keyword input
  - City input
  - Search button
- Category suggestions: Plumbers, Dentists, etc.
- Live ticker showing example searches

### After Searching (Real Data)
- List of businesses
- Each with: Name, Phone, Address, Rating, Actions
- Export to CSV button
- Google Maps links

### After Searching (Simulation Mode)
- List of businesses (generated fake data)
- Same format as real data
- ⚠️ Says "Using simulation mode" in console
- Still good for testing UI!

---

## 🚀 You're Ready!

Once everything is ✅ checked, you have:

✅ Fully functional lead search app
✅ Real data from Google Maps (or simulation)
✅ User authentication ready
✅ Export to CSV working
✅ Beautiful responsive UI
✅ Dark mode enabled

**Time to start finding leads! 🎉**

---

## 📝 Keep This File

Save this checklist for future reference:
- Setup verification
- Troubleshooting steps
- What to expect
- File locations

---

## 🎯 Summary

| Phase | What | Time | Status |
|-------|------|------|--------|
| 1 | Check prerequisites | 5 min | ⏳ |
| 2 | Get Google API Key | 10 min | ⏳ |
| 3 | Get Supabase credentials | 10 min | ⏳ |
| 4 | Create .env.local | 2 min | ⏳ |
| 5 | Install & run | 5 min | ⏳ |
| 6 | Test & verify | 5 min | ⏳ |
| **Total** | **Full Setup** | **~35 min** | **🎉** |

---

**You got this! Go make leads! 🚀**

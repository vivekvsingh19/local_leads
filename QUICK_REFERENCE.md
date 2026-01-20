# 📋 Quick Reference - LocalLeads Setup

## 🎯 3-Step Quick Start

### Step 1: Get API Keys (5 minutes)

**Google Maps API Key:**
1. Go to https://console.cloud.google.com
2. Create new project
3. Enable: Places API + Maps JavaScript API
4. Create API Key in Credentials
5. Add `http://localhost:3000` to HTTP referrers

**Supabase Credentials:**
1. Go to https://app.supabase.com
2. Create new project
3. Go to Settings → API
4. Copy Project URL and Anon Key

### Step 2: Create `.env.local` (1 minute)

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=your-key
VITE_GOOGLE_MAPS_API_KEY=your-key
```

### Step 3: Run App (1 minute)

```bash
npm install
npm run dev
# Open http://localhost:3000
```

---

## 🔍 Verify It Works

1. **Search for leads:**
   - Keyword: `Plumbers`
   - City: `Austin, TX`
   - Click "Search Leads"

2. **Check results:**
   - Should show real businesses
   - Has phone, address, rating

3. **If simulation mode:**
   - Press `F12` → Console
   - Look for errors
   - Check `.env.local` is correct

---

## 📂 Key Files

| File | Purpose |
|------|---------|
| `.env.local` | Your secrets (DON'T COMMIT) |
| `.env.example` | Template (safe to commit) |
| `lib/api.ts` | Google Maps integration |
| `lib/supabase.ts` | Supabase setup |
| `components/Hero.tsx` | Search interface |

---

## 🆘 Quick Fixes

| Problem | Fix |
|---------|-----|
| "Not configured" | Check `.env.local` + restart server |
| API key error | Check Google Cloud Credentials |
| Only simulation | Add Google Maps API key |
| CORS error | Add `http://localhost:3000` to API restrictions |

---

## 📚 Full Documentation

- **`COMPLETE_SETUP.md`** - Detailed step-by-step guide
- **`ENV_SETUP.md`** - Environment variables explained
- **`TROUBLESHOOTING.md`** - Common issues & solutions

---

## 🚀 Commands

```bash
npm run dev      # Start development
npm run build    # Build for production
npm run preview  # Preview build
```

---

## 💡 Need Help?

1. Check `TROUBLESHOOTING.md` for your error
2. Verify all 3 env variables are in `.env.local`
3. Check browser console (F12) for error messages
4. Restart dev server after editing `.env.local`

---

**You're ready! 🎉 Start searching for leads now!**

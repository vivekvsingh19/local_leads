# 🔧 API Troubleshooting Guide

## Common Issues & Solutions

### 1. Google Maps API Not Working

#### Symptom: "Using simulation mode" in console
```
Console: "Google Maps API key not configured. Using simulation mode."
```

**Solution:**
1. Create `.env.local` in project root:
   ```env
   VITE_GOOGLE_MAPS_API_KEY=your-actual-key
   ```
2. Restart dev server: `Ctrl+C` → `npm run dev`
3. Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)

---

#### Symptom: "API_KEY_INVALID" or "PERMISSION_DENIED"
```
Console error: "Request had invalid authentication credentials"
```

**Solution:**
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Verify your API key exists
5. Check these APIs are **Enabled**:
   - Places API
   - Maps JavaScript API
6. Delete old keys, create a new one
7. Update `.env.local` with new key
8. Restart server

---

#### Symptom: "API project not authorized"
```
Console error: "This API project is not authorized to use this API"
```

**Solution:**
1. Go to Google Cloud Console
2. Search for **"Places API"**
3. Click **Enable**
4. Wait 1-2 minutes
5. Try again

---

### 2. Supabase Authentication Issues

#### Symptom: "Supabase error" or blank page
```
Console: "Error initializing Supabase"
```

**Solution:**
1. Check `.env.local` has these variables:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
2. Verify Supabase project is still active
3. Get fresh credentials:
   - Go to [Supabase](https://app.supabase.com)
   - Select your project
   - **Settings** → **API**
   - Copy URL and Anon Key again
4. Update `.env.local`
5. Restart server

---

#### Symptom: Login works but data doesn't save
```
Data appears but disappears after refresh
```

**Solution:**
1. Check Supabase project tables are created
2. Verify Row Level Security (RLS) isn't blocking inserts
3. Check browser console for 403 errors
4. Go to Supabase → **Tables** → check if your tables exist

---

### 3. Environment Variables Not Loading

#### Symptom: All APIs say "not configured"
```
Multiple "not configured" messages in console
```

**Solution:**
1. Ensure file is named `.env.local` (not `.env`)
2. Variables must start with `VITE_` for browser access:
   ```env
   VITE_SUPABASE_URL=...        ✅ Correct
   SUPABASE_URL=...              ❌ Won't load
   ```
3. Restart dev server after creating `.env.local`
4. Check file has no spaces around `=`:
   ```env
   VITE_KEY=value               ✅ Correct
   VITE_KEY = value             ❌ Won't work
   ```

---

#### Symptom: Variables work in development but not in production
```
Works locally, breaks when deployed
```

**Solution:**
- Add environment variables to your hosting platform
- **Vercel**: Project Settings → Environment Variables
- **Netlify**: Build & Deploy → Environment → Edit Variables
- **GitHub Pages**: Can't use (no backend)

---

### 4. CORS Errors

#### Symptom: "CORS error" or "no access control headers"
```
Console: Cross-Origin Request Blocked
```

**Solution (Development):**
1. Ensure localhost:3000 is added to API key restrictions:
   - Google Cloud Console → Credentials
   - Edit your API key
   - Add `http://localhost:3000` to HTTP referrers
2. Restart server

**Solution (Production):**
1. Add your production domain to API key restrictions
2. Example: `https://yourdomain.com`

---

### 5. API Rate Limiting

#### Symptom: Requests work but then fail
```
Console: "Quota exceeded" or "Rate limit exceeded"
```

**Solution:**
1. **Google Maps**: Free tier = 100 requests/day
   - Paid tier: $7 per 100 additional requests
   - Set billing in Google Cloud Console
2. **Supabase**: Free tier = Unlimited, but may be throttled
   - Check usage in Supabase Dashboard

---

### 6. Build & Deploy Issues

#### Symptom: Build fails with "env not defined"
```
Build error: Cannot find module or undefined variable
```

**Solution:**
1. Ensure all `VITE_` variables are in `.env.local`
2. Don't use `process.env` in browser code - use `import.meta.env`
3. Check `vite.config.ts` doesn't hardcode old API keys

---

#### Symptom: Works locally but fails in production
```
App loads but can't search
```

**Solution:**
1. Add environment variables to your hosting platform
2. Ensure variables start with `VITE_`
3. Verify API keys have correct domain restrictions
4. Check production API keys are different from dev keys
5. Run `npm run build` locally to test

---

## Debug Commands

### Check what variables are loaded:
```javascript
// In browser console
console.log(import.meta.env)
```

You should see:
```javascript
{
  VITE_SUPABASE_URL: "https://...",
  VITE_SUPABASE_ANON_KEY: "...",
  VITE_GOOGLE_MAPS_API_KEY: "..."
}
```

### Check network requests:
1. Open **F12** → **Network** tab
2. Search for: `places`
3. Look for requests to Google Places API
4. Click request → **Response** to see error details

### Check for console errors:
```
F12 → Console tab
Look for red error messages
```

---

## Verification Checklist

- [ ] `.env.local` file exists (not `.env`)
- [ ] All variables start with `VITE_`
- [ ] No spaces around `=` in `.env.local`
- [ ] All 3 variables are filled:
  - [ ] VITE_SUPABASE_URL
  - [ ] VITE_SUPABASE_ANON_KEY
  - [ ] VITE_GOOGLE_MAPS_API_KEY
- [ ] Dev server restarted after `.env.local` changes
- [ ] Browser hard refreshed (Ctrl+Shift+R)
- [ ] Google Cloud APIs are Enabled
- [ ] Google API key has correct restrictions
- [ ] Supabase project is active

---

## Get Help

If still stuck:

1. **Check console**: F12 → Console - Copy the error
2. **Google the error**: Paste error in Google
3. **Check API documentation**:
   - [Google Places API Docs](https://developers.google.com/maps/documentation/places/web-service)
   - [Supabase Docs](https://supabase.com/docs)
4. **Try simulation mode**: App works without APIs for testing

# Quick Setup Guide

## Step 1: Get Your Google Maps API Key

1. Visit: https://console.cloud.google.com/
2. Create/Select a Project
3. Enable "Places API (New)"
4. Create an API Key
5. Copy your API key

## Step 2: Add API Key to .env.local

Open `.env.local` and replace:
```
VITE_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_API_KEY_HERE
```

With your actual key:
```
VITE_GOOGLE_MAPS_API_KEY=AIzaSyC...your_actual_key
```

## Step 3: Run the App

```bash
npm run dev
```

## Step 4: Test It Out

1. Login with Supabase authentication
2. Search for "Plumbers" in "Austin, TX"
3. See real business results!

---

**Note**: Without an API key, the app runs in simulation mode with fake data.

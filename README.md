# ClientMine - Find clients who actually need you

Discover local businesses without digital presence - perfect prospects for your services!

## 🚀 Features

- **Real-time Search**: Search for local businesses by category and location
- **Website Detection**: Automatically identifies businesses without websites
- **Lead Export**: Export results to CSV for easy follow-up
- **Modern UI**: Beautiful, responsive interface with dark mode support
- **Google Maps Integration**: Direct links to business locations

## 🛠️ Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable **Places API (New)**:
   - Go to "APIs & Services" → "Library"
   - Search for "Places API (New)"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy your API key
5. (Optional but recommended) Restrict your API key:
   - Click on your API key
   - Under "API restrictions", select "Restrict key"
   - Select "Places API (New)"
   - Under "Application restrictions", set HTTP referrers for your domain

### 3. Configure Environment Variables

Open `.env.local` and replace `YOUR_GOOGLE_MAPS_API_KEY_HERE` with your actual API key:

```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### 4. Run the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## 📝 How It Works

1. **User searches** for a business category (e.g., "Plumbers") in a specific city
2. **Google Places API** returns 20 matching local businesses
3. **Website detection** filters businesses without websites
4. **Results display** shows business details including:
   - Business name
   - Phone number
   - Address
   - Google Maps link
5. **Export to CSV** for easy lead management

## 🔒 Important Notes

### API Key Security

⚠️ **For Production**: The current implementation exposes the API key on the client side. For production use:

1. Create a backend API (Node.js, Python, etc.)
2. Move the Google Places API calls to your backend
3. Add API key restrictions in Google Cloud Console
4. Implement rate limiting and authentication
5. Consider using Firebase Functions or Vercel Serverless Functions

### API Costs

- Google Places API charges per request
- Text Search: ~$0.032 per request
- Check [Google Maps Platform Pricing](https://developers.google.com/maps/billing-and-pricing/pricing)
- Set up billing alerts in Google Cloud Console

## 🎯 Future Enhancements

- [ ] Backend API to secure API keys
- [ ] Database storage for leads
- [ ] Advanced filtering options
- [ ] Email templates for outreach
- [ ] CRM integration
- [ ] Automated follow-up scheduling

## 📦 Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Framer Motion** - Animations
- **Supabase** - Authentication
- **Google Maps Places API (New)** - Business data
- **Three.js** - 3D backgrounds

## 🐛 Troubleshooting

### "No results found" or API errors

1. Check your API key is correctly set in `.env.local`
2. Verify Places API (New) is enabled in Google Cloud Console
3. Check browser console for specific error messages
4. Ensure you have billing enabled on your Google Cloud project

### Simulation mode

If the API key is not configured, the app falls back to simulation mode with fake data. Look for this message in the console:
```
Google Maps API key not configured. Using simulation mode.
```

## 📄 License

MIT License - feel free to use this project for your own purposes.

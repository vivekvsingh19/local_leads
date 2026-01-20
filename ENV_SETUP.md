# Environment Variables Setup

This project uses environment variables to manage sensitive data and API credentials. Never commit actual `.env` files to the repository.

## Setup Instructions

### 1. Create your `.env.local` file

Copy the `.env.example` file to create your local environment configuration:

```bash
cp .env.example .env.local
```

### 2. Configure Supabase

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project
3. Navigate to **Settings → API**
4. Copy your **Project URL** and **Anon Key**
5. Update `.env.local`:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-actual-anon-key
```

### 3. Configure Google Maps API

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create or select a project
3. Enable the **Places API** (New)
4. Create an API key (Service Account or Web API Key)
5. Update `.env.local`:

```env
VITE_GOOGLE_MAPS_API_KEY=your-actual-api-key
```

**⚠️ Important Security Notes:**
- For production, restrict your Google Maps API key to specific domains
- Enable only necessary APIs
- Use IP restrictions if possible
- Rotate keys regularly

### 4. Start development

```bash
npm run dev
```

Vite will automatically load variables from `.env.local`.

## Environment Variables Reference

| Variable | Purpose | Required |
|----------|---------|----------|
| `VITE_SUPABASE_URL` | Supabase project URL | Yes |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `VITE_GOOGLE_MAPS_API_KEY` | Google Maps API key | No (falls back to simulation) |

## File Structure

- `.env.example` - Template with all required variables (safe to commit)
- `.env.local` - Your actual credentials (never commit)
- `.env.production` - Production credentials (never commit)
- `.gitignore` - Prevents committing any `.env*` files

## Best Practices

✅ **Do:**
- Use `.env.example` to document all required variables
- Create `.env.local` for development
- Rotate API keys regularly
- Use different keys for development and production
- Keep API keys in a secure password manager

❌ **Don't:**
- Commit `.env` files to the repository
- Hardcode secrets in source code
- Share API keys in chat or emails
- Use the same API key for multiple environments

## Troubleshooting

### Variables not loading?
- Ensure file is named `.env.local` (not `.env`)
- Restart the development server after updating variables
- Check that variable names start with `VITE_` for browser access

### API errors?
- Verify API keys are correct and active
- Check API quotas and rate limits
- Ensure APIs are enabled in your service dashboards
- Check browser console for CORS errors


# ClientMine Deployment Guide

## Domain: clientmine.space

### Pre-Deployment Checklist

1. **Environment Variables**
   - Copy `.env.example` to `.env.local`
   - Fill in your actual Supabase credentials
   - Add your Google Maps API key
   - Restrict Google Maps API key to `clientmine.space` and `*.clientmine.space`

2. **Supabase Setup**
   - Run the SQL schema from `supabase-schema.sql`
   - Configure Google OAuth in Supabase Auth settings
   - Add `https://clientmine.space` to allowed redirect URLs
   - Set up Row Level Security (RLS) policies

3. **Build Application**
   ```bash
   npm run build
   ```

### Deployment Options

#### Option 1: Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy to custom domain: `clientmine.space`

#### Option 2: Netlify
1. Connect your GitHub repository to Netlify
2. Set environment variables in Netlify dashboard
3. Configure custom domain: `clientmine.space`

#### Option 3: Static Hosting
1. Upload `dist/` folder to your hosting provider
2. Configure domain DNS to point to hosting provider
3. Ensure environment variables are set during build

### DNS Configuration
Point your `clientmine.space` domain to your chosen hosting provider:
- **A Record**: Point to hosting provider's IP
- **CNAME**: Point `www` to `clientmine.space`

### Post-Deployment
1. Test authentication flow
2. Verify Google OAuth works
3. Test lead search and save functionality
4. Check mobile responsiveness
5. Verify SSL certificate is active

### Production Monitoring
- Monitor Supabase usage and quotas
- Track Google Maps API usage
- Set up error monitoring (optional: Sentry)
- Monitor application performance

### Security Considerations
- Google Maps API key restricted to your domain
- Supabase RLS policies properly configured
- HTTPS enforced on production domain
- Environment variables secured in hosting platform
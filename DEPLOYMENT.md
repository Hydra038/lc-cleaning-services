# Deployment Guide - L&C Cleaning Services

This guide covers deploying the L&C Cleaning Services website to production.

## Prerequisites

1. **Supabase Project**
   - Create account at [supabase.com](https://supabase.com)
   - Create new project
   - Note down Project URL and API Keys

2. **Vercel Account** (Recommended)
   - Create account at [vercel.com](https://vercel.com)
   - Install Vercel CLI: `npm i -g vercel`

## Step 1: Database Setup

1. **Create Supabase Project**
   ```bash
   # Go to https://supabase.com/dashboard
   # Create new project
   # Copy the Project URL and anon key
   ```

2. **Run Database Schema**
   - Open Supabase SQL Editor
   - Copy and paste contents of `database/supabase-schema.sql`
   - Execute the SQL to create all tables and policies

3. **Verify Tables Created**
   - Check that all 6 tables exist: services, bookings, contact_messages, testimonials, payment_methods, user_profiles
   - Verify sample data is inserted

## Step 2: Environment Configuration

1. **Create Production Environment Variables**
   ```bash
   # Copy .env.example to .env.local
   cp .env.example .env.local
   ```

2. **Update Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   NEXT_PUBLIC_SITE_URL=https://your-domain.com
   ```

## Step 3: Vercel Deployment

1. **Connect to Vercel**
   ```bash
   # In project directory
   vercel login
   vercel
   ```

2. **Configure Project**
   - Choose existing project or create new
   - Set build command: `npm run build`
   - Set output directory: `.next`
   - Set install command: `npm install`

3. **Add Environment Variables**
   - Go to Vercel Dashboard > Project > Settings > Environment Variables
   - Add all variables from `.env.local`
   - Make sure to add them for Production, Preview, and Development

4. **Deploy**
   ```bash
   vercel --prod
   ```

## Step 4: Domain Configuration

1. **Custom Domain** (Optional)
   - Go to Vercel Dashboard > Project > Settings > Domains
   - Add your custom domain
   - Update DNS records as instructed

2. **SSL Certificate**
   - Vercel automatically provides SSL certificates
   - Verify HTTPS is working

## Step 5: Testing

1. **Functional Testing**
   - Test all pages load correctly
   - Test booking form submission
   - Test contact form submission
   - Verify admin dashboard access

2. **Database Connectivity**
   - Check that bookings save to database
   - Verify contact messages are stored
   - Test admin functions work

3. **Performance Testing**
   - Check page load speeds
   - Test mobile responsiveness
   - Verify images load correctly

## Step 6: Post-Deployment Setup

1. **Admin Access**
   - Create admin user in Supabase Auth (if implementing authentication)
   - Or bookmark admin URL: `https://your-domain.com/admin`

2. **Payment Method Configuration**
   - Access admin panel
   - Enable/configure PayPal and Bank Transfer options
   - Test payment method display on booking form

3. **Content Updates**
   - Update services pricing if needed
   - Add/edit testimonials
   - Update contact information

## Alternative Deployment Options

### Netlify
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
# Add same variables as Vercel
```

### AWS Amplify
1. Connect GitHub repository
2. Set build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables
4. Deploy

### DigitalOcean App Platform
1. Create new app from GitHub
2. Configure build settings
3. Add environment variables
4. Deploy

## Monitoring and Maintenance

1. **Error Monitoring**
   - Check Vercel deployment logs
   - Monitor Supabase logs
   - Set up error tracking (Sentry recommended)

2. **Performance Monitoring**
   - Use Vercel Analytics
   - Monitor Core Web Vitals
   - Check database performance in Supabase

3. **Regular Updates**
   - Keep dependencies updated
   - Monitor for security updates
   - Backup database regularly

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check TypeScript errors: `npm run build`
   - Verify all environment variables are set
   - Check for missing dependencies

2. **Database Connection Issues**
   - Verify Supabase URL and keys
   - Check Row Level Security policies
   - Ensure database schema is properly created

3. **Form Submissions Not Working**
   - Check API routes are deployed
   - Verify database permissions
   - Check browser console for errors

4. **Images Not Loading**
   - Verify images exist in `public/images/`
   - Check image paths are correct
   - Ensure proper Next.js image optimization

### Support Resources

- **Next.js**: [nextjs.org/docs](https://nextjs.org/docs)
- **Supabase**: [supabase.com/docs](https://supabase.com/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Tailwind CSS**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Success Checklist

- [ ] Database schema deployed and working
- [ ] All environment variables configured
- [ ] Website accessible via HTTPS
- [ ] All pages load without errors
- [ ] Booking form submits successfully
- [ ] Contact form submits successfully
- [ ] Admin dashboard accessible
- [ ] Payment methods display correctly
- [ ] Mobile responsive design works
- [ ] Custom domain configured (if applicable)

Your L&C Cleaning Services website is now live and ready for customers!
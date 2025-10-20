# L&C Cleaning Services Ltd - eCommerce Website

A full-stack eCommerce website for L&C Cleaning Services Ltd, serving customers across the UK.

## Features

- 🏠 **Home Page** - Hero banner, services overview, testimonials
- 🧹 **Services** - Grid of cleaning services with booking
- 📅 **Online Booking** - Multi-step booking form with payments
- 👥 **About Page** - Company information and mission
- 📞 **Contact** - Contact form and location details
- 🔐 **Admin Dashboard** - Manage bookings, services, and messages

## Tech Stack

- **Frontend:** Next.js 15, React, TypeScript, Tailwind CSS
- **Backend:** Next.js API routes
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Payments:** PayPal + Bank Transfer (admin-controlled)
- **Deployment:** Vercel + Supabase

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
NEXT_PUBLIC_PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
```

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables
3. Run development server: `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

The project uses Supabase with the following tables:
- `services` - Cleaning services catalog
- `bookings` - Customer bookings
- `contact_messages` - Contact form submissions
- `testimonials` - Customer reviews
- `payment_methods` - Admin-controlled payment options

## Admin Access

Admin users can access the dashboard at `/admin` to:
- Manage bookings and their status
- Enable/disable payment methods
- View contact messages
- Manage services and testimonials

# 🧹 L&C Cleaning Services - Professional Cleaning Website

A modern, full-featured cleaning services booking platform built with Next.js 15, TypeScript, and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-green)

## 🌟 Features

### Customer Features
- ✅ **Online Booking System** - Book cleaning services with real-time availability
- ✅ **Service Catalog** - Browse 5+ professional cleaning services
- ✅ **Booking Tracking** - Track bookings with unique reference numbers (LCB-XXXXXX-ABC)
- ✅ **Message Tracking** - Track support messages with references (LCM-XXXXXX-ABC)
- ✅ **Multiple Payment Methods** - PayPal & Bank Transfer support
- ✅ **WhatsApp Integration** - Quick contact via WhatsApp
- ✅ **Responsive Design** - Mobile-first, works on all devices

### Admin Features
- ✅ **Secure Admin Dashboard** - Password-protected admin panel
- ✅ **Booking Management** - View, update, and track all bookings
- ✅ **Message Management** - Read and reply to customer messages
- ✅ **Payment Settings** - Configure payment methods
- ✅ **Real-time Stats** - Dashboard with key metrics
- ✅ **Status Updates** - Update booking and payment statuses

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Supabase account
- Git installed

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/lc-cleaning-services.git
cd lc-cleaning-services
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
ADMIN_PASSWORD=your_secure_password
```

4. **Set up database**
- Copy SQL from `database/schema.sql`
- Run in Supabase SQL Editor
- Creates all tables, policies, and sample data

5. **Run development server**
```bash
npm run dev
```

6. **Open in browser**
Visit [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
lc-cleaning-services/
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── admin/             # Admin dashboard
│   ├── booking/           # Booking system
│   ├── contact/           # Contact form
│   ├── services/          # Services catalog
│   ├── track-booking/     # Booking tracker
│   └── track-message/     # Message tracker
├── components/            # Reusable components
├── database/              # Database schema
├── lib/                   # Utilities and Supabase client
└── public/                # Static assets
```

## 🗄️ Database Schema

### Tables
- **services** - Cleaning services catalog
- **bookings** - Customer bookings with references
- **contact_messages** - Messages with tracking references
- **testimonials** - Customer reviews
- **payment_methods** - Admin-controlled payment options
- **user_profiles** - User account information

### Key Features
- Row Level Security (RLS) enabled
- UUID primary keys
- Automated timestamps
- Indexed for performance

## � Admin Access

### Login
1. Navigate to `/admin/login`
2. Enter admin password (from `.env.local`)
3. Access full dashboard

### Admin Capabilities
- **Dashboard Tab**: View stats and metrics
- **Bookings Tab**: Manage all bookings, update statuses
- **Messages Tab**: Read messages, send replies
- **Payments Tab**: Configure payment methods

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Deployment**: Vercel

## 📱 Customer Workflows

### Booking a Service
1. Browse services at `/services`
2. Click "Book Now" → Fill booking form
3. Select payment method
4. Receive booking reference (LCB-XXXXXX-ABC)
5. Track booking at `/track-booking`

### Contacting Support
1. Visit `/contact` page
2. Fill contact form
3. Receive message reference (LCM-XXXXXX-ABC)
4. Track message at `/track-message`
5. View admin reply when available

## 🚀 Deployment

### Vercel Deployment
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy automatically

### Environment Variables for Production
```env
NEXT_PUBLIC_SUPABASE_URL=your_production_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_key
ADMIN_PASSWORD=your_strong_production_password
```

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Getting started guide
- **[VERCEL_DEPLOYMENT_GUIDE.md](./VERCEL_DEPLOYMENT_GUIDE.md)** - Deploy to production
- **[BOOKING_STATUS_GUIDE.md](./BOOKING_STATUS_GUIDE.md)** - Booking tracking system
- **[MESSAGE_TRACKING_GUIDE.md](./MESSAGE_TRACKING_GUIDE.md)** - Message tracking system
- **[COMPLETE_SUMMARY.md](./COMPLETE_SUMMARY.md)** - Full feature overview

## 🤝 Contributing

This is a proprietary project for L&C Cleaning Services Ltd. For support or inquiries:
- Email: info@lccleaningservices.co.uk
- WhatsApp: +44 7413 069737

## 📄 License

© 2025 L&C Cleaning Services Ltd. All rights reserved.
Company Number: 16561686

## 🙏 Acknowledgments

Built with modern web technologies to provide the best cleaning service booking experience.


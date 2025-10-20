-- L&C Cleaning Services Database Schema
-- Run this SQL in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Services table
CREATE TABLE services (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    short_description VARCHAR(500),
    price DECIMAL(10,2) NOT NULL,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE testimonials (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    message TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    is_featured BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Contact messages table
CREATE TABLE contact_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false,
    message_reference VARCHAR(50) UNIQUE,
    admin_reply TEXT,
    replied_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Payment methods table (admin-controlled)
CREATE TABLE payment_methods (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    method_type VARCHAR(50) NOT NULL, -- 'paypal', 'bank_transfer'
    description TEXT,
    is_active BOOLEAN DEFAULT true,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    service_id UUID REFERENCES services(id) ON DELETE CASCADE,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(50),
    service_date DATE NOT NULL,
    service_time TIME NOT NULL,
    address TEXT NOT NULL,
    postcode VARCHAR(20) NOT NULL,
    special_instructions TEXT,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending', -- pending, paid, failed, refunded
    booking_status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, in_progress, completed, cancelled
    payment_reference VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles table (extends auth.users)
CREATE TABLE user_profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name VARCHAR(255),
    phone VARCHAR(50),
    address TEXT,
    postcode VARCHAR(20),
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default services
INSERT INTO services (name, description, short_description, price, image_url) VALUES
('Domestic Cleaning', 'Regular house cleaning service including dusting, vacuuming, mopping, and bathroom cleaning. Perfect for maintaining a clean and healthy home environment.', 'Regular house cleaning service', 25.00, '/images/domestic-cleaning.jpg'),
('Office Cleaning', 'Professional office cleaning including desk areas, meeting rooms, kitchens, and washrooms. Maintaining a clean workspace for productivity.', 'Professional office cleaning service', 35.00, '/images/office-cleaning.jpg'),
('End of Tenancy', 'Comprehensive deep cleaning service for tenants moving out. Guaranteed to help you get your deposit back with our thorough cleaning checklist.', 'Deep cleaning for moving out', 150.00, '/images/end-of-tenancy.jpg'),
('Carpet & Upholstery', 'Professional carpet and upholstery cleaning using advanced equipment. Removes stains, odors, and allergens for a fresh, clean finish.', 'Professional carpet cleaning', 45.00, '/images/carpet-cleaning.jpg'),
('Deep Cleaning', 'Intensive cleaning service covering every corner of your property. Includes areas often missed in regular cleaning routines.', 'Intensive deep cleaning service', 80.00, '/images/deep-cleaning.jpg');

-- Insert default testimonials
INSERT INTO testimonials (name, email, message, rating, is_featured, is_approved) VALUES
('Sarah Johnson', 'sarah.j@email.com', 'L&C Cleaning Services did an amazing job with our end of tenancy clean. We got our full deposit back! Highly recommended.', 5, true, true),
('Michael Brown', 'mike.brown@email.com', 'Regular cleaning service is fantastic. The team is professional, reliable, and our house has never been cleaner.', 5, true, true),
('Emma Wilson', 'emma.w@email.com', 'Outstanding carpet cleaning service. They removed stains I thought were permanent. Will definitely use again.', 5, true, true),
('David Smith', 'david.smith@email.com', 'Professional office cleaning service. Our workspace is always spotless when we arrive on Monday mornings.', 5, false, true);

-- Insert default payment methods
INSERT INTO payment_methods (name, method_type, description, is_active, settings) VALUES
('PayPal', 'paypal', 'Pay securely with PayPal', true, '{"description": "Pay securely with PayPal"}'),
('Bank Transfer', 'bank_transfer', 'Direct bank transfer - details provided after booking', true, '{"account_name": "L&C Cleaning Services Ltd", "sort_code": "12-34-56", "account_number": "12345678", "description": "Please use your booking reference as the payment reference"}');

-- Create indexes for better performance
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_service_date ON bookings(service_date);
CREATE INDEX idx_bookings_status ON bookings(booking_status);
CREATE INDEX idx_services_active ON services(is_active);

-- Row Level Security (RLS) policies
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE payment_methods ENABLE ROW LEVEL SECURITY;

-- Services policies (public read, admin write)
DROP POLICY IF EXISTS "Services are viewable by everyone" ON services;
DROP POLICY IF EXISTS "Services are manageable by admins" ON services;

CREATE POLICY "Services are viewable by everyone" ON services FOR SELECT USING (true);
CREATE POLICY "Services can be inserted by anyone" ON services FOR INSERT WITH CHECK (true);
CREATE POLICY "Services can be updated by anyone" ON services FOR UPDATE USING (true);
CREATE POLICY "Services can be deleted by anyone" ON services FOR DELETE USING (true);

-- Testimonials policies (public read approved, admin manage all)
DROP POLICY IF EXISTS "Approved testimonials are viewable by everyone" ON testimonials;
DROP POLICY IF EXISTS "Testimonials are manageable by admins" ON testimonials;

CREATE POLICY "Testimonials are viewable by everyone" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Testimonials can be inserted by anyone" ON testimonials FOR INSERT WITH CHECK (true);
CREATE POLICY "Testimonials can be updated by anyone" ON testimonials FOR UPDATE USING (true);
CREATE POLICY "Testimonials can be deleted by anyone" ON testimonials FOR DELETE USING (true);

-- Contact messages policies (allow anyone to insert, admins to view all)
DROP POLICY IF EXISTS "Anyone can submit contact messages" ON contact_messages;
DROP POLICY IF EXISTS "Contact messages are viewable by everyone" ON contact_messages;
DROP POLICY IF EXISTS "Contact messages are manageable by admins" ON contact_messages;

CREATE POLICY "Contact messages are viewable by everyone" ON contact_messages FOR SELECT USING (true);
CREATE POLICY "Anyone can submit contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Contact messages can be updated by anyone" ON contact_messages FOR UPDATE USING (true);
CREATE POLICY "Contact messages can be deleted by anyone" ON contact_messages FOR DELETE USING (true);

-- Bookings policies (allow anyone to view and create)
DROP POLICY IF EXISTS "Anyone can view bookings" ON bookings;
DROP POLICY IF EXISTS "Users can view their own bookings" ON bookings;
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Admins can manage all bookings" ON bookings;

CREATE POLICY "Bookings are viewable by everyone" ON bookings FOR SELECT USING (true);
CREATE POLICY "Anyone can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Bookings can be updated by anyone" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Bookings can be deleted by anyone" ON bookings FOR DELETE USING (true);

-- User profiles policies
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Users can create their own profile" ON user_profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON user_profiles;

CREATE POLICY "Users can view their own profile" ON user_profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON user_profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can create their own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Payment methods policies (public read enabled, admin manage)
DROP POLICY IF EXISTS "Enabled payment methods are viewable by everyone" ON payment_methods;
DROP POLICY IF EXISTS "Payment methods are manageable by admins" ON payment_methods;

CREATE POLICY "Payment methods are viewable by everyone" ON payment_methods FOR SELECT USING (true);
CREATE POLICY "Payment methods can be inserted by anyone" ON payment_methods FOR INSERT WITH CHECK (true);
CREATE POLICY "Payment methods can be updated by anyone" ON payment_methods FOR UPDATE USING (true);
CREATE POLICY "Payment methods can be deleted by anyone" ON payment_methods FOR DELETE USING (true);

-- Function to handle user profile creation on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO user_profiles (id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on user signup
-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Create a default admin user (update email and password as needed)
-- Note: You'll need to sign up through your app first, then update this user to be admin
-- UPDATE user_profiles SET is_admin = true WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@lccleaningservices.co.uk');
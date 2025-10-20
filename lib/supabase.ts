import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our database tables
export interface Service {
  id: string
  name: string
  description: string
  short_description: string
  price: number
  image_url?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Testimonial {
  id: string
  name: string
  email?: string
  message: string
  rating: number
  is_featured: boolean
  is_approved: boolean
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  is_read: boolean
  message_reference?: string
  admin_reply?: string
  replied_at?: string
  created_at: string
}

export interface Booking {
  id: string
  user_id?: string
  service_id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  service_date: string
  service_time: string
  address: string
  postcode: string
  special_instructions?: string
  amount: number
  payment_method: string
  payment_status: string
  booking_status: string
  payment_reference?: string
  created_at: string
  updated_at: string
  services?: Service
}

export interface UserProfile {
  id: string
  full_name?: string
  phone?: string
  address?: string
  postcode?: string
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface PaymentMethod {
  id: string
  name: string
  method_type: string
  description?: string
  is_active: boolean
  settings?: Record<string, unknown>
  created_at: string
  updated_at: string
}
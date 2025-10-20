'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Search, Calendar, MapPin, CreditCard, Package, CheckCircle, XCircle, AlertCircle, RefreshCw } from 'lucide-react'

interface Booking {
  id: string
  customer_name: string
  customer_email: string
  customer_phone: string
  address: string
  postcode: string
  service_date: string
  service_time: string
  special_instructions: string | null
  amount: number
  payment_method: string
  payment_status: string
  booking_status: string
  payment_reference: string
  created_at: string
  services: {
    name: string
    description: string
  }
}

function TrackBookingContent() {
  const searchParams = useSearchParams()
  const urlRef = searchParams.get('ref')
  const urlEmail = searchParams.get('email')

  const [bookingRef, setBookingRef] = useState(urlRef || '')
  const [email, setEmail] = useState(urlEmail || '')
  const [booking, setBooking] = useState<Booking | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Auto-search if URL params are present
  useEffect(() => {
    if (urlRef && urlEmail) {
      searchBooking()
    }
  }, [urlRef, urlEmail])

  const searchBooking = async () => {
    if (!bookingRef.trim() || !email.trim()) {
      setError('Please enter both booking reference and email')
      return
    }

    setLoading(true)
    setError('')
    setBooking(null)

    try {
      const { data, error: fetchError } = await supabase
        .from('bookings')
        .select(`
          *,
          services (
            name,
            description
          )
        `)
        .eq('payment_reference', bookingRef.trim())
        .eq('customer_email', email.trim().toLowerCase())
        .single()

      if (fetchError || !data) {
        setError('No booking found with this reference and email. Please check your details.')
        return
      }

      setBooking(data)
    } catch (err) {
      console.error('Error fetching booking:', err)
      setError('Unable to fetch booking. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
      paid: 'bg-green-100 text-green-800 border-green-200',
      failed: 'bg-red-100 text-red-800 border-red-200',
      refunded: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusIcon = (status: string) => {
    if (status === 'completed' || status === 'paid') return <CheckCircle className="w-5 h-5" />
    if (status === 'cancelled' || status === 'failed') return <XCircle className="w-5 h-5" />
    if (status === 'confirmed') return <CheckCircle className="w-5 h-5" />
    return <AlertCircle className="w-5 h-5" />
  }

  const getStatusMessage = (bookingStatus: string, paymentStatus: string) => {
    if (bookingStatus === 'completed') {
      return {
        title: '✅ Service Completed',
        message: 'Your cleaning service has been completed. Thank you for choosing L&C Cleaning Services!'
      }
    }
    if (bookingStatus === 'cancelled') {
      return {
        title: '❌ Booking Cancelled',
        message: 'This booking has been cancelled. If you have any questions, please contact us on WhatsApp.'
      }
    }
    if (bookingStatus === 'confirmed') {
      return {
        title: '✓ Booking Confirmed',
        message: `Your booking is confirmed! Our team will arrive on ${new Date(booking!.service_date).toLocaleDateString('en-GB')} at ${booking!.service_time}.`
      }
    }
    if (paymentStatus === 'paid') {
      return {
        title: '⏳ Pending Confirmation',
        message: 'Payment received! We\'ll confirm your booking shortly via WhatsApp.'
      }
    }
    return {
      title: '⏳ Awaiting Payment',
      message: 'We\'re waiting for your payment. Once received, we\'ll confirm your booking within 24 hours.'
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Track Your Booking
              </h1>
              <p className="text-gray-600">
                Enter your booking reference and email to view your booking status
              </p>
            </div>

            {/* Search Form */}
            <div className="card p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Booking Reference
                  </label>
                  <input
                    type="text"
                    value={bookingRef}
                    onChange={(e) => setBookingRef(e.target.value.toUpperCase())}
                    placeholder="LCB-123456-ABC"
                    className="form-input uppercase"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="form-input"
                  />
                </div>
              </div>
              
              <button 
                onClick={searchBooking}
                disabled={loading}
                className="btn-primary w-full disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="animate-spin" size={18} />
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={18} />
                    Track Booking
                  </>
                )}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                  {error}
                </div>
              )}
            </div>

            {/* Booking Details */}
            {booking && (
              <div className="space-y-6">
                {/* Status Banner */}
                <div className="card p-6 bg-gradient-to-r from-teal-500 to-sky-500 text-white">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <p className="text-sm opacity-90 mb-1">Booking Reference</p>
                      <p className="text-2xl font-bold tracking-wider">{booking.payment_reference}</p>
                    </div>
                    <Package className="w-12 h-12 opacity-75" />
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <h3 className="font-semibold mb-2">
                      {getStatusMessage(booking.booking_status, booking.payment_status).title}
                    </h3>
                    <p className="text-sm opacity-90">
                      {getStatusMessage(booking.booking_status, booking.payment_status).message}
                    </p>
                  </div>
                </div>

                {/* Status Overview */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(booking.booking_status)}
                      <div>
                        <p className="text-sm text-gray-600">Booking Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.booking_status)}`}>
                          {booking.booking_status.charAt(0).toUpperCase() + booking.booking_status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {getStatusIcon(booking.payment_status)}
                      <div>
                        <p className="text-sm text-gray-600">Payment Status</p>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.payment_status)}`}>
                          {booking.payment_status.charAt(0).toUpperCase() + booking.payment_status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Booking Details */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Details</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <Package className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Service</p>
                        <p className="font-medium text-gray-900">{booking.services.name}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Scheduled Date & Time</p>
                        <p className="font-medium text-gray-900">
                          {new Date(booking.service_date).toLocaleDateString('en-GB', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })} at {booking.service_time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Service Address</p>
                        <p className="font-medium text-gray-900">
                          {booking.address}, {booking.postcode}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <CreditCard className="text-teal-600 flex-shrink-0 mt-1" size={20} />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">Payment Method</p>
                        <p className="font-medium text-gray-900">
                          {booking.payment_method === 'paypal' ? 'PayPal' : 'Bank Transfer'}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">Amount: £{booking.amount.toFixed(2)}</p>
                      </div>
                    </div>

                    {booking.special_instructions && (
                      <div className="pt-4 border-t">
                        <p className="text-sm text-gray-600 mb-1">Special Instructions</p>
                        <p className="text-gray-900">{booking.special_instructions}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="card p-6 bg-blue-50 border border-blue-200">
                  <h3 className="font-semibold text-gray-900 mb-3">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you have any questions about your booking or need to make changes, 
                    please contact us on WhatsApp using your booking reference.
                  </p>
                  <a 
                    href={`https://wa.me/447413069737?text=Hi, my booking reference is ${booking.payment_reference}. I have a question about my booking.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary w-full sm:w-auto"
                  >
                    Contact on WhatsApp
                  </a>
                </div>

                <div className="text-center">
                  <Link href="/" className="text-sm text-gray-600 hover:text-teal-600 underline">
                    Back to Home
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function TrackBookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <Navigation />
        <div className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="card p-8">
                <p className="text-center text-gray-600">Loading...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <TrackBookingContent />
    </Suspense>
  )
}

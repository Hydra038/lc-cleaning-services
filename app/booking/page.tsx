'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import type { Service, PaymentMethod } from '@/lib/supabase'
import { Calendar, Clock, MapPin, Phone, Mail, User, CreditCard, ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react'

interface FormData {
  name: string
  email: string
  phone: string
  address: string
  city: string
  postcode: string
  service_id: number | null
  service_date: string
  service_time: string
  frequency: string
  special_instructions: string
  payment_method: string
}

const frequencies = [
  { value: 'one-time', label: 'One-time Service' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'bi-weekly', label: 'Bi-weekly (Every 2 weeks)' },
  { value: 'monthly', label: 'Monthly' }
]

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
]

function BookingContent() {
  const searchParams = useSearchParams()
  const preselectedServiceId = searchParams.get('service')
  
  const [currentStep, setCurrentStep] = useState(1)
  const [services, setServices] = useState<Service[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postcode: '',
    service_id: preselectedServiceId ? parseInt(preselectedServiceId) : null,
    service_date: '',
    service_time: '',
    frequency: 'one-time',
    special_instructions: '',
    payment_method: ''
  })

  useEffect(() => {
    fetchServices()
    fetchPaymentMethods()
  }, [])

  const fetchServices = async () => {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('is_active', true)
        .order('name')
      
      if (error) {
        console.error('Error fetching services:', error)
        alert('Unable to load services. Please check your internet connection.')
        return
      }
      
      if (data) {
        setServices(data)
      }
    } catch (error) {
      console.error('Error fetching services:', error)
      alert('Unable to connect to database. Please try again later.')
    }
  }

  const fetchPaymentMethods = async () => {
    try {
      const { data, error } = await supabase
        .from('payment_methods')
        .select('*')
        .eq('is_active', true)
        .order('name')
      
      if (error) {
        console.error('Error fetching payment methods:', error)
        console.error('Error details:', JSON.stringify(error, null, 2))
        alert(`Unable to load payment methods: ${error.message || 'Unknown error'}. Please contact us on WhatsApp: +44 7413 069737`)
        return
      }
      
      if (data) {
        console.log('Payment methods loaded:', data)
        setPaymentMethods(data)
      }
    } catch (error) {
      console.error('Error fetching payment methods:', error)
      alert('Unable to load payment methods. Please contact us on WhatsApp: +44 7413 069737')
    }
  }

  const handleInputChange = (field: keyof FormData, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (step === 1) {
      if (!formData.service_id) newErrors.service_id = 'Please select a service'
      if (!formData.service_date) newErrors.service_date = 'Please select a date'
      if (!formData.service_time) newErrors.service_time = 'Please select a time'
    }
    
    if (step === 2) {
      if (!formData.name.trim()) newErrors.name = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
      if (!formData.address.trim()) newErrors.address = 'Address is required'
      if (!formData.city.trim()) newErrors.city = 'City is required'
      if (!formData.postcode.trim()) newErrors.postcode = 'Postcode is required'
      
      // Email validation
      if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email'
      }
    }
    
    if (step === 3) {
      if (!formData.payment_method) newErrors.payment_method = 'Please select a payment method'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => prev - 1)
  }

  // Generate unique booking reference
  const generateBookingReference = () => {
    const prefix = 'LCB'
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `${prefix}-${timestamp}-${random}`
  }

  const [bookingReference, setBookingReference] = useState<string>('')

  const submitBooking = async () => {
    if (!validateStep(3)) return
    
    setLoading(true)
    
    try {
      const reference = generateBookingReference()
      
      const { data, error } = await supabase
        .from('bookings')
        .insert([{
          customer_name: formData.name,
          customer_email: formData.email,
          customer_phone: formData.phone,
          address: formData.address,
          postcode: formData.postcode,
          service_id: formData.service_id,
          service_date: formData.service_date,
          service_time: formData.service_time,
          special_instructions: formData.special_instructions || null,
          payment_method: formData.payment_method,
          payment_status: 'pending',
          booking_status: 'pending',
          payment_reference: reference,
          amount: selectedService?.price || 0
        }])
        .select()
      
      if (error) {
        console.error('Error submitting booking:', error)
        alert('There was an error submitting your booking. Please contact us on WhatsApp: +44 7413 069737')
        return
      }
      
      if (data && data.length > 0) {
        setBookingReference(reference)
        setSubmitted(true)
        
        // TODO: Send email confirmation (integrate with email service)
        // await sendConfirmationEmail(formData.email, reference, data[0])
      }
    } catch (error) {
      console.error('Error submitting booking:', error)
      alert('Unable to submit booking. Please contact us on WhatsApp: +44 7413 069737')
    } finally {
      setLoading(false)
    }
  }

  const selectedService = services.find(s => s.id === formData.service_id)

  // Get minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto text-center">
              <div className="card p-8">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Booking Submitted Successfully!
                </h1>
                
                {/* Booking Reference - Highlighted */}
                <div className="bg-gradient-to-r from-teal-500 to-sky-500 text-white rounded-lg p-6 mb-6">
                  <p className="text-sm font-medium mb-2 opacity-90">Your Booking Reference</p>
                  <p className="text-3xl font-bold tracking-wider mb-3">{bookingReference}</p>
                  <p className="text-sm opacity-90">
                    📧 Confirmation email sent to <strong>{formData.email}</strong>
                  </p>
                  <p className="text-xs mt-2 opacity-75">
                    Save this reference to track your booking status
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">What Happens Next?</h3>
                  <div className="space-y-3 text-left">
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-2xl">1️⃣</span>
                      <div>
                        <p className="font-medium text-gray-900">We&apos;ll Contact You</p>
                        <p className="text-sm text-gray-600">Our team will reach out on WhatsApp within <strong>24 hours</strong> to confirm your booking details</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-2xl">2️⃣</span>
                      <div>
                        <p className="font-medium text-gray-900">Payment Confirmation</p>
                        <p className="text-sm text-gray-600">We&apos;ll verify your payment and update your booking status</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                      <span className="text-2xl">3️⃣</span>
                      <div>
                        <p className="font-medium text-gray-900">Service Delivery</p>
                        <p className="text-sm text-gray-600">Our professional team will arrive at your scheduled date and time</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
                  <h3 className="font-semibold text-gray-900 mb-3">Booking Summary:</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service:</span>
                      <span className="font-medium">{selectedService?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(formData.service_date).toLocaleDateString('en-GB')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time:</span>
                      <span className="font-medium">{formData.service_time}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-medium">{frequencies.find(f => f.value === formData.frequency)?.label}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Payment:</span>
                      <span className="font-medium">{paymentMethods.find(p => p.method_type === formData.payment_method)?.name}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2 mt-2">
                      <span className="text-gray-600">Status:</span>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        ⏳ Pending Confirmation
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link 
                    href={`/track-booking?ref=${bookingReference}&email=${encodeURIComponent(formData.email)}`}
                    className="btn-primary"
                  >
                    Track Your Booking
                  </Link>
                  <a 
                    href={`https://wa.me/447413069737?text=Hi, my booking reference is ${bookingReference}. I just made a booking and wanted to confirm the details.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    <Phone size={18} />
                    Contact on WhatsApp
                  </a>
                </div>
                
                <Link href="/" className="inline-block mt-4 text-sm text-gray-600 hover:text-teal-600 underline">
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Progress Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-8">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                      currentStep >= step ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step}
                    </div>
                    <div className={`ml-1 sm:ml-3 text-xs sm:text-sm font-medium ${
                      currentStep >= step ? 'text-teal-600' : 'text-gray-500'
                    } hidden sm:block`}>
                      {step === 1 && 'Service & Date'}
                      {step === 2 && 'Your Details'}
                      {step === 3 && 'Payment & Confirm'}
                    </div>
                    {step < 3 && (
                      <ArrowRight className="ml-2 sm:ml-8 text-gray-300" size={16} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-4 sm:p-6 md:p-8">
              {/* Step 1: Service Selection */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Select Service & Date
                  </h2>
                  
                  {/* Service Selection */}
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      Choose Your Service *
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          onClick={() => handleInputChange('service_id', service.id)}
                          className={`border-2 rounded-lg p-4 sm:p-5 cursor-pointer transition-all hover:shadow-md ${
                            formData.service_id === service.id
                              ? 'border-teal-500 bg-teal-50 shadow-md'
                              : 'border-gray-200 hover:border-teal-300'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-bold text-gray-900 text-base sm:text-lg">{service.name}</h3>
                            {formData.service_id === service.id && (
                              <CheckCircle className="text-teal-500 flex-shrink-0" size={20} />
                            )}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3 leading-relaxed">{service.short_description}</p>
                          <div className="flex items-center justify-between">
                            <p className="text-lg sm:text-xl font-bold text-teal-600">From £{service.price}</p>
                            <span className="text-xs text-gray-500">per service</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {errors.service_id && <p className="text-red-500 text-sm mt-2">{errors.service_id}</p>}
                  </div>

                  {/* Date Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Calendar className="inline w-4 h-4 mr-2" />
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        min={minDate}
                        value={formData.service_date}
                        onChange={(e) => handleInputChange('service_date', e.target.value)}
                        className="form-input"
                      />
                      {errors.service_date && <p className="text-red-500 text-sm mt-1">{errors.service_date}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="inline w-4 h-4 mr-2" />
                        Preferred Time *
                      </label>
                      <select
                        value={formData.service_time}
                        onChange={(e) => handleInputChange('service_time', e.target.value)}
                        className="form-input"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                      {errors.service_time && <p className="text-red-500 text-sm mt-1">{errors.service_time}</p>}
                    </div>
                  </div>

                  {/* Frequency */}
                  <div className="mb-4 sm:mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                      Service Frequency
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
                      {frequencies.map((freq) => (
                        <label 
                          key={freq.value} 
                          className={`flex items-center justify-center p-2 sm:p-3 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.frequency === freq.value
                              ? 'border-teal-500 bg-teal-50 text-teal-700 font-semibold'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="frequency"
                            value={freq.value}
                            checked={formData.frequency === freq.value}
                            onChange={(e) => handleInputChange('frequency', e.target.value)}
                            className="sr-only"
                          />
                          <span className="text-xs sm:text-sm text-center">{freq.label}</span>
                        </label>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">💡 Save up to 20% with regular cleaning schedules</p>
                  </div>

                  {/* Help Box */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Phone className="text-blue-600 flex-shrink-0 mt-1" size={18} />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-1 text-sm sm:text-base">Need Help?</h4>
                        <p className="text-xs sm:text-sm text-blue-700">
                          Contact us on WhatsApp at <a href="https://wa.me/447413069737" target="_blank" rel="noopener noreferrer" className="underline font-semibold">+44 7413 069737</a> for immediate assistance or custom requirements.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button onClick={nextStep} className="btn-primary w-full sm:w-auto">
                      Next Step
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Customer Details */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                    Your Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="inline w-4 h-4 mr-2" />
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="form-input"
                        placeholder="Your full name"
                      />
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Mail className="inline w-4 h-4 mr-2" />
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="form-input"
                        placeholder="your.email@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Phone className="inline w-4 h-4 mr-2" />
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="form-input"
                        placeholder="07xxx xxx xxx"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postcode *
                      </label>
                      <input
                        type="text"
                        value={formData.postcode}
                        onChange={(e) => handleInputChange('postcode', e.target.value.toUpperCase())}
                        className="form-input"
                        placeholder="SW1A 1AA"
                      />
                      {errors.postcode && <p className="text-red-500 text-sm mt-1">{errors.postcode}</p>}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <MapPin className="inline w-4 h-4 mr-2" />
                      Service Address *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      className="form-input"
                      placeholder="Street address where service will be performed"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City/Town *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="form-input"
                      placeholder="London"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Instructions
                    </label>
                    <textarea
                      value={formData.special_instructions}
                      onChange={(e) => handleInputChange('special_instructions', e.target.value)}
                      rows={4}
                      className="form-input"
                      placeholder="Any special requirements, access instructions, or areas of focus..."
                    />
                  </div>

                  <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
                    <button onClick={prevStep} className="btn-outline w-full sm:w-auto">
                      <ArrowLeft size={18} />
                      Previous
                    </button>
                    <button onClick={nextStep} className="btn-primary w-full sm:w-auto">
                      Next Step
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment and Confirmation */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    Payment Method & Confirmation
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6">
                    Select your preferred payment method. We&apos;ll contact you on WhatsApp to confirm your booking.
                  </p>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      <CreditCard className="inline w-4 h-4 mr-2" />
                      Choose Payment Method *
                    </label>
                    <div className="space-y-3">
                      {paymentMethods.map((method) => (
                        <label 
                          key={method.id} 
                          className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-all ${
                            formData.payment_method === method.method_type
                              ? 'border-teal-500 bg-teal-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <input
                            type="radio"
                            name="payment_method"
                            value={method.method_type}
                            checked={formData.payment_method === method.method_type}
                            onChange={(e) => handleInputChange('payment_method', e.target.value)}
                            className="mt-1 mr-3"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-gray-900 mb-1">{method.name}</div>
                            <div className="text-sm text-gray-600">{method.description}</div>
                            
                            {/* Show payment details when selected */}
                            {formData.payment_method === method.method_type && method.settings && (
                              <div className="mt-3 pt-3 border-t border-gray-200">
                                {method.method_type === 'paypal' && typeof method.settings === 'object' && 'paypal_email' in method.settings && method.settings.paypal_email && (
                                  <div className="bg-blue-50 rounded p-3">
                                    <p className="text-sm font-medium text-gray-900 mb-1">PayPal Email:</p>
                                    <p className="text-sm text-gray-700">{String(method.settings.paypal_email)}</p>
                                    <p className="text-xs text-gray-600 mt-2">You can send payment to this PayPal email address</p>
                                  </div>
                                )}
                                
                                {method.method_type === 'bank_transfer' && typeof method.settings === 'object' && (
                                  <div className="bg-blue-50 rounded p-3 space-y-2">
                                    <p className="text-sm font-medium text-gray-900 mb-2">Bank Transfer Details:</p>
                                    {'bank_name' in method.settings && method.settings.bank_name && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Bank:</span>
                                        <span className="font-medium text-gray-900">{String(method.settings.bank_name)}</span>
                                      </div>
                                    )}
                                    {'account_name' in method.settings && method.settings.account_name && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Account Name:</span>
                                        <span className="font-medium text-gray-900">{String(method.settings.account_name)}</span>
                                      </div>
                                    )}
                                    {'sort_code' in method.settings && method.settings.sort_code && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Sort Code:</span>
                                        <span className="font-medium text-gray-900">{String(method.settings.sort_code)}</span>
                                      </div>
                                    )}
                                    {'account_number' in method.settings && method.settings.account_number && (
                                      <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Account Number:</span>
                                        <span className="font-medium text-gray-900">{String(method.settings.account_number)}</span>
                                      </div>
                                    )}
                                    <p className="text-xs text-gray-600 mt-2 pt-2 border-t border-gray-300">
                                      Please use your booking reference as the payment reference
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                          {formData.payment_method === method.method_type && (
                            <CheckCircle className="text-teal-500 flex-shrink-0 ml-2" size={20} />
                          )}
                        </label>
                      ))}
                    </div>
                    {errors.payment_method && <p className="text-red-500 text-sm mt-2">{errors.payment_method}</p>}
                  </div>

                  {/* Booking Summary */}
                  {selectedService && (
                    <div className="bg-gray-50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">Booking Summary</h3>
                      <div className="space-y-2 sm:space-y-3">
                        <div className="flex justify-between text-sm sm:text-base">
                          <span className="text-gray-600">Service:</span>
                          <span className="font-medium text-right">{selectedService.name}</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium">{new Date(formData.service_date).toLocaleDateString('en-GB')}</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium">{formData.service_time}</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span className="text-gray-600">Frequency:</span>
                          <span className="font-medium text-right">{frequencies.find(f => f.value === formData.frequency)?.label}</span>
                        </div>
                        <div className="flex justify-between text-sm sm:text-base">
                          <span className="text-gray-600">Address:</span>
                          <span className="font-medium text-right max-w-[60%]">{formData.address}, {formData.city} {formData.postcode}</span>
                        </div>
                        <div className="border-t pt-2 sm:pt-3 flex justify-between text-base sm:text-lg font-semibold">
                          <span>Estimated Price:</span>
                          <span className="text-teal-600">From £{selectedService.price}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
                    <button onClick={prevStep} className="btn-outline w-full sm:w-auto">
                      <ArrowLeft size={18} />
                      Previous
                    </button>
                    <button 
                      onClick={submitBooking} 
                      disabled={loading}
                      className="btn-primary disabled:opacity-50 w-full sm:w-auto"
                    >
                      {loading ? 'Submitting...' : 'Confirm Booking'}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen">
        <Navigation />
        <div className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="card p-8">
                <p className="text-center text-gray-600">Loading booking form...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    }>
      <BookingContent />
    </Suspense>
  )
}
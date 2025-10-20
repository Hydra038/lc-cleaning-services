'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, MessageCircle, Facebook } from 'lucide-react'
import { ButtonSpinner } from '../components/LoadingSpinner'

interface ContactForm {
  name: string
  email: string
  phone: string
  subject: string
  message: string
  inquiry_type: string
}

const inquiryTypes = [
  { value: 'quote', label: 'Request a Quote' },
  { value: 'booking', label: 'Booking Inquiry' },
  { value: 'complaint', label: 'Complaint or Issue' },
  { value: 'general', label: 'General Question' }
]

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiry_type: 'quote'
  })
  
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [messageReference, setMessageReference] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Generate unique message reference
  const generateMessageReference = () => {
    const prefix = 'LCM'
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substring(2, 5).toUpperCase()
    return `${prefix}-${timestamp}-${random}`
  }

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    
    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setLoading(true)
    
    try {
      const reference = generateMessageReference()
      
      // Format the message with all details
      const fullMessage = `Inquiry Type: ${inquiryTypes.find(t => t.value === formData.inquiry_type)?.label}\nSubject: ${formData.subject}\n\n${formData.message}`
      
      const { data, error } = await supabase
        .from('contact_messages')
        .insert([{
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          message: fullMessage,
          message_reference: reference,
          is_read: false
        }])
        .select()
      
      if (error) {
        console.error('Supabase error details:', {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        })
        alert(`Error: ${error.message || 'Failed to send message. Please check if the database is set up correctly.'}`)
        throw error
      }
      
      console.log('Message sent successfully:', data)
      
      setMessageReference(reference)
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting contact form:', error)
      alert('Sorry, there was an error sending your message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="section-padding bg-gray-50">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <div className="card p-8">
                <div className="text-center mb-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Message Sent Successfully!
                  </h1>
                  <p className="text-gray-600 mb-6">
                    Thank you for contacting L&C Cleaning Services. We&apos;ve received your message 
                    and will get back to you within 24 hours.
                  </p>
                </div>

                {/* Message Reference */}
                <div className="bg-teal-50 border-2 border-teal-200 rounded-lg p-6 mb-8">
                  <p className="text-sm text-gray-700 mb-2 text-center">Your Message Reference Number:</p>
                  <p className="text-3xl font-bold text-teal-600 text-center tracking-wider">
                    {messageReference}
                  </p>
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Save this reference number to track your message status and view our reply
                  </p>
                </div>

                {/* What Happens Next */}
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">What Happens Next?</h2>
                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-semibold">
                        1
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">We Review Your Message</h3>
                        <p className="text-sm text-gray-600">Our team will read your inquiry and prepare a response</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-semibold">
                        2
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">We Reply Within 24 Hours</h3>
                        <p className="text-sm text-gray-600">You&apos;ll receive our response via email and can view it using your reference number</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-teal-500 text-white rounded-full flex items-center justify-center font-semibold">
                        3
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Track Anytime</h3>
                        <p className="text-sm text-gray-600">Use the button below to check your message status and read our reply</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link 
                    href="/track-message"
                    className="btn-primary w-full text-center flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-5 h-5" />
                    Track Your Message
                  </Link>
                  <a
                    href={`https://wa.me/447413069737?text=Hi, I just sent a message. My reference is ${messageReference}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary w-full text-center flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" />
                    Contact via WhatsApp
                  </a>
                  <Link
                    href="/"
                    className="block w-full text-center py-3 text-gray-600 hover:text-teal-600 transition-colors"
                  >
                    Return to Home
                  </Link>
                </div>

                <p className="text-sm text-gray-500 text-center mt-6">
                  For urgent matters, call us directly: +44 7413 069737
                </p>
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
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-sky-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Get In Touch
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Have a question or need a custom quote? We&apos;re here to help. 
              Contact us today and we&apos;ll get back to you promptly.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">WhatsApp</h3>
              <p className="text-gray-600 mb-2">Message us for quick response</p>
              <a 
                href="https://wa.me/447413069737" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-600 font-semibold hover:underline"
              >
                +44 7413 069737
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Facebook className="text-sky-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Facebook</h3>
              <p className="text-gray-600 mb-2">Visit our Facebook page</p>
              <a 
                href="https://www.facebook.com/lccleaningservicesltd" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 font-semibold hover:underline"
              >
                @lccleaningservicesltd
              </a>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Service Area</h3>
              <p className="text-gray-600 mb-2">We serve all regions across</p>
              <p className="text-teal-600 font-semibold">
                United Kingdom
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="form-input"
                      placeholder="07xxx xxx xxx"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Inquiry Type
                    </label>
                    <select
                      value={formData.inquiry_type}
                      onChange={(e) => handleInputChange('inquiry_type', e.target.value)}
                      className="form-input"
                    >
                      {inquiryTypes.map((type) => (
                        <option key={type.value} value={type.value}>
                          {type.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => handleInputChange('subject', e.target.value)}
                    className="form-input"
                    placeholder="Brief description of your inquiry"
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    rows={6}
                    className="form-input"
                    placeholder="Please provide details about your cleaning requirements, preferred dates, property size, or any special instructions..."
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <ButtonSpinner />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send size={18} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Additional Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Quick Information</h2>
              
              <div className="space-y-6">
                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <Clock className="text-teal-600 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 8:00 AM - 6:00 PM</p>
                        <p>Saturday: 9:00 AM - 5:00 PM</p>
                        <p>Sunday: 10:00 AM - 4:00 PM</p>
                        <p className="text-sm text-teal-600 mt-2">Emergency services available 24/7</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <div className="flex items-start gap-4">
                    <MessageCircle className="text-sky-600 mt-1" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Response Times</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Quote requests: Within 4 hours</p>
                        <p>General inquiries: Within 24 hours</p>
                        <p>Urgent matters: Same day</p>
                        <p className="text-sm text-green-600 mt-2">Usually much faster!</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">What to Include in Your Message</h3>
                  <ul className="text-gray-600 space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      Type of property (house, flat, office)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      Number of rooms or approximate size
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      Preferred service date and time
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      Frequency (one-time or regular)
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full mt-2 flex-shrink-0"></div>
                      Any special requirements
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Do you provide cleaning supplies?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, we bring all necessary cleaning supplies and equipment. You don&apos;t need to provide anything.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Are you insured?</h3>
                  <p className="text-gray-600 text-sm">
                    Absolutely. We carry full liability insurance and all our staff are bonded for your protection.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">How do I get a quote?</h3>
                  <p className="text-gray-600 text-sm">
                    Contact us via phone, email, or this form with your requirements. We&apos;ll provide a free quote within 4 hours.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Do you offer same-day service?</h3>
                  <p className="text-gray-600 text-sm">
                    Yes, subject to availability. Contact us early in the day for same-day cleaning services.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What payment methods do you accept?</h3>
                  <p className="text-gray-600 text-sm">
                    We accept PayPal and bank transfers. Payment is due after service completion.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">What if I&apos;m not satisfied?</h3>
                  <p className="text-gray-600 text-sm">
                    We guarantee your satisfaction. If you&apos;re not happy, we&apos;ll return within 24 hours to fix any issues at no charge.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Search, MessageCircle, Mail, Phone, CheckCircle, Clock, Reply } from 'lucide-react'

interface MessageDetails {
  id: string
  name: string
  email: string
  phone?: string
  message: string
  is_read: boolean
  message_reference: string
  admin_reply?: string
  replied_at?: string
  created_at: string
}

export default function TrackMessagePage() {
  const [reference, setReference] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState<MessageDetails | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage(null)

    try {
      const { data, error: supabaseError } = await supabase
        .from('contact_messages')
        .select('*')
        .eq('message_reference', reference.trim().toUpperCase())
        .eq('email', email.trim().toLowerCase())
        .single()

      if (supabaseError || !data) {
        setError('Message not found. Please check your reference number and email address.')
        return
      }

      setMessage(data as MessageDetails)
    } catch (err) {
      console.error('Error fetching message:', err)
      setError('An error occurred while searching. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = () => {
    if (!message) return null

    if (message.admin_reply) {
      return (
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
          <Reply className="w-4 h-4" />
          Replied
        </span>
      )
    }

    if (message.is_read) {
      return (
        <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
          <CheckCircle className="w-4 h-4" />
          Read
        </span>
      )
    }

    return (
      <span className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold">
        <Clock className="w-4 h-4" />
        New
      </span>
    )
  }

  const getStatusMessage = () => {
    if (!message) return null

    if (message.admin_reply) {
      return (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
          <p className="text-green-800 font-semibold">We&apos;ve replied to your message!</p>
          <p className="text-green-700 text-sm mt-1">
            Our team responded on {new Date(message.replied_at!).toLocaleDateString('en-GB', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      )
    }

    if (message.is_read) {
      return (
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <p className="text-blue-800 font-semibold">Your message has been read</p>
          <p className="text-blue-700 text-sm mt-1">
            Our team is reviewing your inquiry and will respond within 24 hours
          </p>
        </div>
      )
    }

    return (
      <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
        <p className="text-yellow-800 font-semibold">Your message is awaiting review</p>
        <p className="text-yellow-700 text-sm mt-1">
          We&apos;ll read and respond to your message within 24 hours
        </p>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-50 to-sky-50 py-20">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <MessageCircle className="w-16 h-16 text-teal-600 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Track Your Message
            </h1>
            <p className="text-xl text-gray-600">
              Enter your message reference and email to view the status and our reply
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="card p-8">
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label htmlFor="reference" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message Reference Number
                  </label>
                  <input
                    type="text"
                    id="reference"
                    value={reference}
                    onChange={(e) => setReference(e.target.value.toUpperCase())}
                    placeholder="LCM-123456-ABC"
                    className="input-field font-mono text-lg tracking-wider"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    This was provided when you submitted your message
                  </p>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="input-field"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    The email you used to send the message
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4">
                    <p className="text-red-800">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  <Search className="w-5 h-5" />
                  {loading ? 'Searching...' : 'Track Message'}
                </button>
              </form>
            </div>

            {/* Message Details */}
            {message && (
              <div className="mt-8 space-y-6">
                {/* Status */}
                <div className="card p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-1">Message Status</h2>
                      <p className="text-sm text-gray-500">
                        Reference: <span className="font-mono font-semibold">{message.message_reference}</span>
                      </p>
                    </div>
                    {getStatusBadge()}
                  </div>

                  {getStatusMessage()}

                  {/* Message Details */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Submitted On</h3>
                      <p className="text-gray-900">
                        {new Date(message.created_at).toLocaleDateString('en-GB', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Name</h3>
                      <p className="text-gray-900">{message.name}</p>
                    </div>

                    {message.phone && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Phone Number</h3>
                        <p className="text-gray-900">{message.phone}</p>
                      </div>
                    )}

                    <div>
                      <h3 className="text-sm font-semibold text-gray-700 mb-2">Your Message</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-900 whitespace-pre-wrap">{message.message}</p>
                      </div>
                    </div>

                    {/* Admin Reply */}
                    {message.admin_reply && (
                      <div className="border-t pt-6">
                        <div className="flex items-center gap-2 mb-3">
                          <Reply className="w-5 h-5 text-green-600" />
                          <h3 className="text-lg font-semibold text-gray-900">Our Reply</h3>
                        </div>
                        <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-4">
                          <p className="text-gray-900 whitespace-pre-wrap">{message.admin_reply}</p>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                          Replied on {new Date(message.replied_at!).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Options */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Need More Help?</h3>
                  <div className="space-y-3">
                    <a
                      href={`https://wa.me/447413069737?text=Hi, regarding my message ${message.message_reference}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" />
                      Contact via WhatsApp
                    </a>
                    <Link
                      href="/contact"
                      className="btn-secondary w-full text-center flex items-center justify-center gap-2"
                    >
                      <Mail className="w-5 h-5" />
                      Send Another Message
                    </Link>
                    <Link
                      href="/"
                      className="block w-full text-center py-3 text-gray-600 hover:text-teal-600 transition-colors"
                    >
                      Return to Home
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}

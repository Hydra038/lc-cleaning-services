'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Booking, ContactMessage, PaymentMethod } from '@/lib/supabase'
import { 
  Calendar, 
  MessageSquare, 
  CreditCard, 
  Check, 
  X, 
  Clock,
  TrendingUp,
  Star,
  LogOut
} from 'lucide-react'

interface DashboardStats {
  totalBookings: number
  pendingBookings: number
  completedBookings: number
  totalMessages: number
  newMessages: number
  monthlyRevenue: number
}

export default function AdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [checkingAuth, setCheckingAuth] = useState(true)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState<DashboardStats>({
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    totalMessages: 0,
    newMessages: 0,
    monthlyRevenue: 0
  })
  const [bookings, setBookings] = useState<Booking[]>([])
  const [messages, setMessages] = useState<ContactMessage[]>([])
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPayment, setEditingPayment] = useState<PaymentMethod | null>(null)
  const [paymentForm, setPaymentForm] = useState({
    name: '',
    description: '',
    paypal_email: '',
    bank_name: '',
    account_name: '',
    sort_code: '',
    account_number: ''
  })
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState('')

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = () => {
      const token = localStorage.getItem('admin_session')
      if (!token) {
        router.push('/admin/login')
        return false
      }
      setIsAuthenticated(true)
      setCheckingAuth(false)
      return true
    }

    if (checkAuth()) {
      fetchAllData()
    }
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      await Promise.all([
        fetchStats(),
        fetchBookings(),
        fetchMessages(),
        fetchPaymentMethods()
      ])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    // Fetch bookings stats
    const { data: bookingsData } = await supabase
      .from('bookings')
      .select('booking_status, service_date, amount')
    
    // Fetch messages stats
    const { data: messagesData } = await supabase
      .from('contact_messages')
      .select('is_read')
    
    if (bookingsData && messagesData) {
      const totalBookings = bookingsData.length
      const pendingBookings = bookingsData.filter(b => b.booking_status === 'pending').length
      const completedBookings = bookingsData.filter(b => b.booking_status === 'completed').length
      const totalMessages = messagesData.length
      const newMessages = messagesData.filter(m => !m.is_read).length
      
      // Calculate monthly revenue from actual booking amounts
      const monthlyRevenue = bookingsData
        .filter(b => b.booking_status === 'completed')
        .reduce((sum, b) => sum + (Number(b.amount) || 0), 0)
      
      setStats({
        totalBookings,
        pendingBookings,
        completedBookings,
        totalMessages,
        newMessages,
        monthlyRevenue
      })
    }
  }

  const fetchBookings = async () => {
    const { data } = await supabase
      .from('bookings')
      .select(`
        *,
        services (name, price)
      `)
      .order('created_at', { ascending: false })
    
    if (data) {
      setBookings(data)
    }
  }

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (data) {
      setMessages(data)
    }
  }

  const fetchPaymentMethods = async () => {
    const { data } = await supabase
      .from('payment_methods')
      .select('*')
      .order('name')
    
    if (data) {
      setPaymentMethods(data)
    }
  }

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ booking_status: newStatus })
        .eq('id', bookingId)
      
      if (!error) {
        fetchBookings()
        fetchStats()
      }
    } catch (error) {
      console.error('Error updating booking:', error)
    }
  }

  const updatePaymentStatus = async (bookingId: string, newPaymentStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ payment_status: newPaymentStatus })
        .eq('id', bookingId)
      
      if (!error) {
        fetchBookings()
        fetchStats()
        alert(`Payment status updated to ${newPaymentStatus}`)
      }
    } catch (error) {
      console.error('Error updating payment status:', error)
    }
  }

  const updateMessageStatus = async (messageId: string, isRead: boolean) => {
    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ is_read: isRead })
        .eq('id', messageId)
      
      if (!error) {
        fetchMessages()
        fetchStats()
      }
    } catch (error) {
      console.error('Error updating message:', error)
    }
  }

  const sendReply = async (messageId: string) => {
    if (!replyText.trim()) {
      alert('Please enter a reply message')
      return
    }

    try {
      const { error } = await supabase
        .from('contact_messages')
        .update({ 
          admin_reply: replyText,
          replied_at: new Date().toISOString(),
          is_read: true
        })
        .eq('id', messageId)
      
      if (!error) {
        setReplyingTo(null)
        setReplyText('')
        fetchMessages()
        fetchStats()
        alert('Reply sent successfully!')
      }
    } catch (error) {
      console.error('Error sending reply:', error)
      alert('Error sending reply. Please try again.')
    }
  }

  const togglePaymentMethod = async (methodId: string, isActive: boolean) => {
    try {
      const { error } = await supabase
        .from('payment_methods')
        .update({ is_active: !isActive })
        .eq('id', methodId)
      
      if (!error) {
        fetchPaymentMethods()
      }
    } catch (error) {
      console.error('Error updating payment method:', error)
    }
  }

  const editPaymentMethod = (method: PaymentMethod) => {
    setEditingPayment(method)
    const settings = (method.settings as Record<string, unknown>) || {}
    setPaymentForm({
      name: method.name,
      description: method.description || '',
      paypal_email: (settings.paypal_email as string) || '',
      bank_name: (settings.bank_name as string) || '',
      account_name: (settings.account_name as string) || '',
      sort_code: (settings.sort_code as string) || '',
      account_number: (settings.account_number as string) || ''
    })
  }

  const savePaymentMethod = async () => {
    if (!editingPayment) return
    
    try {
      const settings: Record<string, string> = {}
      
      if (editingPayment.method_type === 'paypal') {
        settings.paypal_email = paymentForm.paypal_email
      } else if (editingPayment.method_type === 'bank_transfer') {
        settings.bank_name = paymentForm.bank_name
        settings.account_name = paymentForm.account_name
        settings.sort_code = paymentForm.sort_code
        settings.account_number = paymentForm.account_number
      }

      const { error } = await supabase
        .from('payment_methods')
        .update({
          name: paymentForm.name,
          description: paymentForm.description,
          settings: settings
        })
        .eq('id', editingPayment.id)
      
      if (!error) {
        setEditingPayment(null)
        fetchPaymentMethods()
        alert('Payment method updated successfully!')
      } else {
        alert('Error updating payment method: ' + error.message)
      }
    } catch (error) {
      console.error('Error saving payment method:', error)
      alert('Error updating payment method')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_session')
    router.push('/admin/login')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      case 'new': return 'bg-purple-100 text-purple-800'
      case 'responded': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect to login
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">L&C Admin Dashboard</h1>
              <p className="text-gray-600">Manage bookings, messages, and settings</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'bookings', label: 'Bookings', icon: Calendar },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
              { id: 'payments', label: 'Payment Methods', icon: CreditCard }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md ${
                  activeTab === id
                    ? 'bg-teal-100 text-teal-700'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalBookings}</p>
                  </div>
                  <Calendar className="text-teal-600" size={32} />
                </div>
              </div>

              <div className="admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pending</p>
                    <p className="text-2xl font-bold text-yellow-600">{stats.pendingBookings}</p>
                  </div>
                  <Clock className="text-yellow-600" size={32} />
                </div>
              </div>

              <div className="admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">New Messages</p>
                    <p className="text-2xl font-bold text-purple-600">{stats.newMessages}</p>
                  </div>
                  <MessageSquare className="text-purple-600" size={32} />
                </div>
              </div>

              <div className="admin-card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-green-600">£{stats.monthlyRevenue}</p>
                  </div>
                  <TrendingUp className="text-green-600" size={32} />
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="admin-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Bookings</h3>
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{booking.customer_name}</p>
                        <p className="text-sm text-gray-600">{booking.services?.name || 'Service'}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(booking.booking_status)}`}>
                        {booking.booking_status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="admin-card">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Messages</h3>
                <div className="space-y-3">
                  {messages.slice(0, 5).map((message) => (
                    <div key={message.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{message.name}</p>
                        <p className="text-sm text-gray-600 truncate max-w-xs">{message.message}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${message.is_read ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'}`}>
                        {message.is_read ? 'Read' : 'New'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">All Bookings ({bookings.length})</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="min-w-[180px]">
                          <p className="font-medium text-gray-900 text-sm">{booking.customer_name}</p>
                          <p className="text-xs text-gray-600 truncate" title={booking.customer_email}>{booking.customer_email}</p>
                          {booking.customer_phone && (
                            <p className="text-xs text-gray-600">{booking.customer_phone}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="min-w-[150px]">
                          <p className="font-medium text-gray-900 text-sm">{booking.services?.name || 'Service'}</p>
                          <p className="text-sm font-semibold text-teal-600">£{booking.amount || booking.services?.price}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="min-w-[120px]">
                          <p className="font-medium text-gray-900 text-sm">{formatDate(booking.service_date)}</p>
                          <p className="text-xs text-gray-600">{booking.service_time}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="min-w-[150px] max-w-[200px]">
                          <p className="text-sm text-gray-900 truncate" title={booking.address}>{booking.address}</p>
                          <p className="text-xs font-medium text-gray-600">{booking.postcode}</p>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="min-w-[140px]">
                          <p className="text-sm font-medium text-gray-900 mb-2">{booking.payment_method === 'paypal' ? 'PayPal' : 'Bank Transfer'}</p>
                          <select
                            value={booking.payment_status}
                            onChange={(e) => updatePaymentStatus(booking.id, e.target.value)}
                            className={`w-full px-2 py-1 text-xs font-medium rounded border-2 cursor-pointer transition-colors ${
                              booking.payment_status === 'paid' ? 'bg-green-50 border-green-200 text-green-800' :
                              booking.payment_status === 'pending' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
                              booking.payment_status === 'failed' ? 'bg-red-50 border-red-200 text-red-800' :
                              'bg-gray-50 border-gray-200 text-gray-800'
                            }`}
                          >
                            <option value="pending">⏳ Pending</option>
                            <option value="paid">✓ Paid</option>
                            <option value="failed">✗ Failed</option>
                            <option value="refunded">↩ Refunded</option>
                          </select>
                        </div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-center">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full inline-block ${getStatusColor(booking.booking_status)}`}>
                          {booking.booking_status}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex gap-2 justify-center min-w-[100px]">
                          {booking.booking_status === 'pending' && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Confirm Booking"
                            >
                              <Check size={18} />
                            </button>
                          )}
                          {booking.booking_status === 'confirmed' && (
                            <button
                              onClick={() => updateBookingStatus(booking.id, 'completed')}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Mark as Completed"
                            >
                              <Star size={18} />
                            </button>
                          )}
                          <button
                            onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Booking"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {bookings.length === 0 && (
                <div className="text-center py-12">
                  <Calendar className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500">No bookings yet</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === 'messages' && (
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Messages</h3>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-gray-900">{message.name}</h4>
                      <p className="text-sm text-gray-600">{message.email}</p>
                      {message.phone && <p className="text-sm text-gray-600">{message.phone}</p>}
                      {message.message_reference && (
                        <p className="text-xs text-gray-500 font-mono mt-1">
                          Ref: {message.message_reference}
                        </p>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {message.admin_reply ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Replied
                        </span>
                      ) : message.is_read ? (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                          Read
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                          New
                        </span>
                      )}
                      <span className="text-xs text-gray-500">
                        {formatDate(message.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-gray-600 text-sm whitespace-pre-wrap">{message.message}</p>
                  </div>
                  
                  {/* Show existing reply */}
                  {message.admin_reply && (
                    <div className="mb-3 bg-green-50 border-l-4 border-green-500 p-3 rounded">
                      <p className="text-xs font-semibold text-green-800 mb-1">
                        Your Reply ({message.replied_at ? formatDate(message.replied_at) : ''})
                      </p>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{message.admin_reply}</p>
                    </div>
                  )}
                  
                  {/* Reply form */}
                  {replyingTo === message.id ? (
                    <div className="space-y-3 bg-gray-50 p-3 rounded-lg">
                      <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Type your reply here..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                        rows={4}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => sendReply(message.id)}
                          className="btn-primary text-sm"
                        >
                          Send Reply
                        </button>
                        <button
                          onClick={() => {
                            setReplyingTo(null)
                            setReplyText('')
                          }}
                          className="btn-secondary text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      {!message.admin_reply && (
                        <button
                          onClick={() => setReplyingTo(message.id)}
                          className="btn-primary text-sm"
                        >
                          Reply
                        </button>
                      )}
                      {!message.is_read && (
                        <button
                          onClick={() => updateMessageStatus(message.id, true)}
                          className="btn-secondary text-sm"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payment Methods Tab */}
        {activeTab === 'payments' && (
          <div className="admin-card">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h3>
            
            {/* Edit Form Modal */}
            {editingPayment && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                  <h4 className="text-xl font-semibold text-gray-900 mb-4">
                    Edit Payment Method: {editingPayment.name}
                  </h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                      <input
                        type="text"
                        value={paymentForm.name}
                        onChange={(e) => setPaymentForm({...paymentForm, name: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <input
                        type="text"
                        value={paymentForm.description}
                        onChange={(e) => setPaymentForm({...paymentForm, description: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                      />
                    </div>

                    {editingPayment.method_type === 'paypal' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">PayPal Email Address</label>
                        <input
                          type="email"
                          value={paymentForm.paypal_email}
                          onChange={(e) => setPaymentForm({...paymentForm, paypal_email: e.target.value})}
                          placeholder="your-email@paypal.com"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                      </div>
                    )}

                    {editingPayment.method_type === 'bank_transfer' && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                          <input
                            type="text"
                            value={paymentForm.bank_name}
                            onChange={(e) => setPaymentForm({...paymentForm, bank_name: e.target.value})}
                            placeholder="e.g., Barclays Bank"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Account Name</label>
                          <input
                            type="text"
                            value={paymentForm.account_name}
                            onChange={(e) => setPaymentForm({...paymentForm, account_name: e.target.value})}
                            placeholder="L&C Cleaning Services Ltd"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Sort Code</label>
                            <input
                              type="text"
                              value={paymentForm.sort_code}
                              onChange={(e) => setPaymentForm({...paymentForm, sort_code: e.target.value})}
                              placeholder="12-34-56"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                            <input
                              type="text"
                              value={paymentForm.account_number}
                              onChange={(e) => setPaymentForm({...paymentForm, account_number: e.target.value})}
                              placeholder="12345678"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={savePaymentMethod}
                        className="flex-1 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={() => setEditingPayment(null)}
                        className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {paymentMethods.map((method) => {
                const settings = (method.settings as Record<string, unknown>) || {}
                return (
                  <div key={method.id} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 text-lg mb-1">{method.name}</h4>
                        <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                        
                        {/* Display payment details */}
                        <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                          {method.method_type === 'paypal' && settings.paypal_email && typeof settings.paypal_email === 'string' ? (
                            <div className="flex items-center text-sm">
                              <span className="font-medium text-gray-700 w-32">PayPal Email:</span>
                              <span className="text-gray-900">{settings.paypal_email}</span>
                            </div>
                          ) : null}
                          
                          {method.method_type === 'bank_transfer' ? (
                            <>
                              {settings.bank_name && typeof settings.bank_name === 'string' ? (
                                <div className="flex items-center text-sm">
                                  <span className="font-medium text-gray-700 w-32">Bank:</span>
                                  <span className="text-gray-900">{settings.bank_name}</span>
                                </div>
                              ) : null}
                              {settings.account_name && typeof settings.account_name === 'string' ? (
                                <div className="flex items-center text-sm">
                                  <span className="font-medium text-gray-700 w-32">Account Name:</span>
                                  <span className="text-gray-900">{settings.account_name}</span>
                                </div>
                              ) : null}
                              {settings.sort_code && typeof settings.sort_code === 'string' ? (
                                <div className="flex items-center text-sm">
                                  <span className="font-medium text-gray-700 w-32">Sort Code:</span>
                                  <span className="text-gray-900">{settings.sort_code}</span>
                                </div>
                              ) : null}
                              {settings.account_number && typeof settings.account_number === 'string' ? (
                                <div className="flex items-center text-sm">
                                  <span className="font-medium text-gray-700 w-32">Account Number:</span>
                                  <span className="text-gray-900">{settings.account_number}</span>
                                </div>
                              ) : null}
                            </>
                          ) : null}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 ml-4">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                          method.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {method.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button
                        onClick={() => editPaymentMethod(method)}
                        className="px-4 py-2 text-sm font-medium bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                      >
                        Edit Details
                      </button>
                      <button
                        onClick={() => togglePaymentMethod(method.id, method.is_active)}
                        className={`px-4 py-2 text-sm font-medium rounded ${
                          method.is_active 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        {method.is_active ? 'Disable' : 'Enable'}
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
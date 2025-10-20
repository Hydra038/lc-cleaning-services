import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

/**
 * Email Notification API Endpoint
 * 
 * This endpoint is ready to integrate with email services like:
 * - Resend (https://resend.com) - Recommended, easy setup
 * - SendGrid (https://sendgrid.com)
 * - Mailgun (https://mailgun.com)
 * - AWS SES (https://aws.amazon.com/ses/)
 * 
 * To integrate:
 * 1. Install email service SDK: npm install resend
 * 2. Add API key to .env.local: RESEND_API_KEY=your_key
 * 3. Uncomment the email sending code below
 * 4. Customize email templates
 */

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, bookingId, email, reference } = body

    // Validate request
    if (!type || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Fetch booking details if bookingId is provided
    let booking = null
    if (bookingId) {
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          services (name, description)
        `)
        .eq('id', bookingId)
        .single()

      if (error) {
        console.error('Error fetching booking:', error)
      } else {
        booking = data
      }
    }

    // Generate email content based on notification type
    let subject = ''
    let htmlContent = ''
    let textContent = ''

    switch (type) {
      case 'booking_confirmation':
        subject = `✅ Booking Confirmed - ${reference || 'L&C Cleaning Services'}`
        htmlContent = generateBookingConfirmationEmail(booking, reference)
        textContent = `Your booking has been confirmed! Reference: ${reference}`
        break

      case 'payment_confirmed':
        subject = `💳 Payment Received - ${reference || 'L&C Cleaning Services'}`
        htmlContent = generatePaymentConfirmationEmail(booking, reference)
        textContent = `Your payment has been received and confirmed. Reference: ${reference}`
        break

      case 'booking_reminder':
        subject = `⏰ Reminder: Your cleaning service is tomorrow - ${reference || 'L&C Cleaning Services'}`
        htmlContent = generateBookingReminderEmail(booking, reference)
        textContent = `Reminder: Your cleaning service is scheduled for tomorrow.`
        break

      case 'booking_cancelled':
        subject = `❌ Booking Cancelled - ${reference || 'L&C Cleaning Services'}`
        htmlContent = generateCancellationEmail(booking, reference)
        textContent = `Your booking has been cancelled. Reference: ${reference}`
        break

      default:
        return NextResponse.json(
          { error: 'Invalid notification type' },
          { status: 400 }
        )
    }

    // TODO: Integrate with email service
    // Example with Resend:
    /*
    import { Resend } from 'resend'
    const resend = new Resend(process.env.RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'L&C Cleaning Services <noreply@lccleaningservices.co.uk>',
      to: email,
      subject: subject,
      html: htmlContent,
      text: textContent
    })
    */

    console.log('Email notification prepared:', {
      type,
      email,
      subject,
      reference
    })

    return NextResponse.json({
      success: true,
      message: 'Notification prepared (email service integration pending)',
      data: {
        type,
        email,
        subject,
        // Include preview for testing
        preview: textContent
      }
    })

  } catch (error) {
    console.error('Error sending notification:', error)
    return NextResponse.json(
      { error: 'Failed to send notification' },
      { status: 500 }
    )
  }
}

// Email template functions
function generateBookingConfirmationEmail(booking: { customer_name?: string; services?: { name: string }; service_date?: string; service_time?: string; address?: string; amount?: number } | null, reference: string) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9fafb; padding: 30px; }
          .booking-ref { background: white; border: 2px dashed #14b8a6; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px; }
          .booking-ref h2 { margin: 0; font-size: 28px; color: #14b8a6; }
          .details { background: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
          .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .footer { background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; }
          .btn { display: inline-block; background: #14b8a6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 Booking Confirmed!</h1>
            <p>Thank you for choosing L&C Cleaning Services</p>
          </div>
          
          <div class="content">
            <p>Dear ${booking?.customer_name || 'Valued Customer'},</p>
            
            <p>Your booking has been successfully confirmed! We're looking forward to providing you with excellent cleaning service.</p>
            
            <div class="booking-ref">
              <p style="margin: 0; color: #6b7280; font-size: 14px;">Booking Reference</p>
              <h2>${reference}</h2>
              <p style="margin: 0; color: #6b7280; font-size: 12px;">Save this reference to track your booking</p>
            </div>
            
            <div class="details">
              <h3>Booking Details</h3>
              ${booking ? `
              <div class="detail-row">
                <span>Service:</span>
                <strong>${booking.services?.name}</strong>
              </div>
              <div class="detail-row">
                <span>Date:</span>
                <strong>${booking.service_date ? new Date(booking.service_date).toLocaleDateString('en-GB') : 'N/A'}</strong>
              </div>
              <div class="detail-row">
                <span>Time:</span>
                <strong>${booking.service_time}</strong>
              </div>
              <div class="detail-row">
                <span>Address:</span>
                <strong>${booking.address}</strong>
              </div>
              <div class="detail-row">
                <span>Amount:</span>
                <strong>£${booking.amount?.toFixed(2)}</strong>
              </div>
              ` : ''}
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="https://wa.me/447413069737?text=Hi, my booking reference is ${reference}" class="btn">
                📱 Contact us on WhatsApp
              </a>
            </div>
            
            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; border-radius: 4px;">
              <strong>📋 What's Next?</strong>
              <ol style="margin: 10px 0 0 0; padding-left: 20px;">
                <li>Our team will contact you on WhatsApp within 24 hours</li>
                <li>We'll confirm your payment and finalize all details</li>
                <li>Our professional cleaners will arrive at your scheduled time</li>
              </ol>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>L&C Cleaning Services Ltd</strong></p>
            <p>Company No. 16561686</p>
            <p>WhatsApp: +44 7413 069737</p>
            <p style="font-size: 12px; margin-top: 15px;">
              Questions? Contact us on WhatsApp or visit our website
            </p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generatePaymentConfirmationEmail(booking: { customer_name?: string } | null, reference: string) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>✅ Payment Confirmed!</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px;">
            <p>Great news! We've received your payment.</p>
            <div style="background: white; border: 2px solid #10b981; padding: 20px; margin: 20px 0; text-align: center; border-radius: 8px;">
              <p style="margin: 0; color: #6b7280;">Reference</p>
              <h2 style="color: #10b981; font-size: 28px;">${reference}</h2>
            </div>
            <p>Your booking is now confirmed and we'll be ready to provide our service at the scheduled time.</p>
            <p>If you have any questions, please contact us on WhatsApp: <strong>+44 7413 069737</strong></p>
          </div>
          <div style="background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
            <p><strong>L&C Cleaning Services Ltd</strong> • Company No. 16561686</p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateBookingReminderEmail(booking: { service_time?: string; address?: string } | null, reference: string) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>⏰ Reminder: Service Tomorrow!</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px;">
            <p>This is a friendly reminder that your cleaning service is scheduled for tomorrow.</p>
            ${booking ? `
            <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
              <p><strong>Service Time:</strong> ${booking.service_time}</p>
              <p><strong>Address:</strong> ${booking.address}</p>
            </div>
            ` : ''}
            <p>Our team will arrive promptly at the scheduled time. Please ensure someone is available to provide access to the property.</p>
            <p>Reference: <strong>${reference}</strong></p>
          </div>
          <div style="background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
            <p><strong>L&C Cleaning Services Ltd</strong> • WhatsApp: +44 7413 069737</p>
          </div>
        </div>
      </body>
    </html>
  `
}

function generateCancellationEmail(booking: { customer_name?: string } | null, reference: string) {
  return `
    <!DOCTYPE html>
    <html>
      <body style="font-family: Arial, sans-serif;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1>❌ Booking Cancelled</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px;">
            <p>Your booking has been cancelled as requested.</p>
            <div style="background: white; padding: 20px; margin: 20px 0; border-radius: 8px;">
              <p><strong>Cancelled Reference:</strong> ${reference}</p>
            </div>
            <p>If this was a mistake or if you'd like to rebook, please contact us on WhatsApp: <strong>+44 7413 069737</strong></p>
            <p>We hope to serve you again in the future!</p>
          </div>
          <div style="background: #1f2937; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
            <p><strong>L&C Cleaning Services Ltd</strong> • Company No. 16561686</p>
          </div>
        </div>
      </body>
    </html>
  `
}

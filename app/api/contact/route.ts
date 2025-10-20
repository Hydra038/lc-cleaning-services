import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching contact messages:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contact messages' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Generate unique message reference
    const generateMessageReference = () => {
      const prefix = 'LCM'
      const timestamp = Date.now().toString().slice(-6)
      const random = Math.random().toString(36).substring(2, 5).toUpperCase()
      return `${prefix}-${timestamp}-${random}`
    }
    
    const reference = body.message_reference || generateMessageReference()
    
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        message: body.message,
        message_reference: reference,
        is_read: false
      }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      throw error
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    console.error('Error creating contact message:', error)
    return NextResponse.json(
      { error: 'Failed to send message', details: error },
      { status: 500 }
    )
  }
}
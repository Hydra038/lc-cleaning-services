import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

// Simple session token generation
function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

// Hash password for comparison (simple approach)
function hashPassword(password: string) {
  return crypto.createHash('sha256').update(password).digest('hex')
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      )
    }

    // Get admin password from environment variable
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminPassword) {
      console.error('ADMIN_PASSWORD environment variable not set!')
      return NextResponse.json(
        { success: false, error: 'Server configuration error' },
        { status: 500 }
      )
    }

    // Compare passwords (you can add hashing for extra security)
    if (password === adminPassword) {
      // Generate session token
      const token = generateToken()
      
      // In production, you'd store this in a database or Redis
      // For simplicity, we'll use JWT-style approach with expiry
      const session = {
        token,
        createdAt: Date.now(),
        expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
      }

      return NextResponse.json({
        success: true,
        token,
        message: 'Login successful'
      })
    } else {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }

  } catch (error) {
    console.error('Admin auth error:', error)
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 500 }
    )
  }
}

// Verify session token
export async function GET(request: NextRequest) {
  try {
    const token = request.headers.get('Authorization')?.replace('Bearer ', '')

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    // In a real app, verify token against database/Redis
    // For now, we just check if it exists and looks valid
    if (token && token.length === 64) {
      return NextResponse.json({
        authenticated: true,
        message: 'Valid session'
      })
    }

    return NextResponse.json(
      { authenticated: false },
      { status: 401 }
    )

  } catch (error) {
    console.error('Session verification error:', error)
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}

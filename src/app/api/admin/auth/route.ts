import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'coach2024';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

function generateSessionToken(password: string): string {
  const expiry = Date.now() + SESSION_DURATION;
  const hash = createHash('sha256')
    .update(`${password}:${expiry}:${process.env.ADMIN_PASSWORD || 'secret'}`)
    .digest('hex')
    .substring(0, 32);
  return `${expiry}:${hash}`;
}

function validatePassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

// POST - Login
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      );
    }

    if (!validatePassword(password)) {
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      );
    }

    // Generate session token
    const sessionToken = generateSessionToken(password);

    // Create response with HTTP-only cookie
    const response = NextResponse.json({ success: true });
    response.cookies.set('admin_session', sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: SESSION_DURATION / 1000, // Convert to seconds
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE - Logout
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin_session');
  return response;
}

// GET - Check session status
export async function GET(request: NextRequest) {
  const sessionToken = request.cookies.get('admin_session')?.value;

  if (!sessionToken) {
    return NextResponse.json({ authenticated: false });
  }

  try {
    const [timestamp] = sessionToken.split(':');
    const expiry = parseInt(timestamp, 10);

    if (Date.now() > expiry) {
      return NextResponse.json({ authenticated: false, expired: true });
    }

    return NextResponse.json({ authenticated: true });
  } catch {
    return NextResponse.json({ authenticated: false });
  }
}

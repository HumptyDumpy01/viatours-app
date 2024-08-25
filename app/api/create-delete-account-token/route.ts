import { NextRequest, NextResponse } from 'next/server';
import { createDeleteAccountToken } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { userEmail } = await request.json();

    if (!userEmail || !userEmail.includes('@')) {
      return NextResponse.json({ error: true, message: 'Please enter a valid email address' });
    }
    const response = await createDeleteAccountToken(userEmail);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message });
    }
    return NextResponse.json({ error: false, message: response.message });

  } catch (e) {
    return NextResponse.json({ error: true, message: 'An unexpected error occurred' });
  }
}

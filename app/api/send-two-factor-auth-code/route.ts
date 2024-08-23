import { NextRequest, NextResponse } from 'next/server';
import { send2FACodeVerification } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { userEmail } = await request.json();

    if (!userEmail || !userEmail.includes('@') || !userEmail.includes('.')) {
      return NextResponse.json({ error: true, message: 'Please provide a valid email' }, { status: 400 });
    }

    const response = await send2FACodeVerification(userEmail);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message }, { status: 400 });
    }
    return NextResponse.json({ error: false, message: response.message });

  } catch (e) {
    return null;
  }
}

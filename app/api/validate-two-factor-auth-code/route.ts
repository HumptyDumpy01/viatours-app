import { NextRequest, NextResponse } from 'next/server';
import { validate2FAToken } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { userEmail, userToken } = await request.json();

    if (!userEmail || !userEmail.includes('@') || !userEmail.includes('.')) {
      return NextResponse.json({ error: true, message: 'Please provide a valid data!' }, { status: 400 });
    }

    const response = await validate2FAToken(userEmail, userToken);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message }, { status: 400 });
    }
    return NextResponse.json({ error: false, message: response.message });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({ error: true, message: 'An unexpected error occurred' });
  }
}

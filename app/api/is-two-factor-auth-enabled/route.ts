import { NextRequest, NextResponse } from 'next/server';
import { isTwoFactorAuthEnabled } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userEmail, userPassword } = await request.json();

    if (!userEmail || !userPassword) {
      return NextResponse.json({ error: true, message: 'Please provide both email and password' }, { status: 400 });
    }

    const response = await isTwoFactorAuthEnabled(userEmail, userPassword);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message }, { status: 400 });
    }

    return NextResponse.json({
      error: false,
      twoFactorAuthEnabled: response.twoFactorAuthEnabled
    });

  } catch (e) {
    return NextResponse.json({ error: true, message: 'An unexpected error occurred' });
  }
}

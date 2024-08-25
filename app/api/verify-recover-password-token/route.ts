import { NextRequest, NextResponse } from 'next/server';
import { verifyRecoverPasswordToken } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { userEmail, userToken } = await request.json();

    if (!userEmail || !userEmail.includes('@') || !userEmail.includes('.')) {
      return NextResponse.json({
        error: true,
        message: 'Please enter a valid email address.',
        status: 400
      });
    }

    if (userToken.length !== 6 || isNaN(Number(userToken))) {
      return NextResponse.json({
        error: true,
        message: 'Please enter a valid 6-digit code.',
        status: 400
      });
    }
    const response = await verifyRecoverPasswordToken(userEmail, userToken);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: response.message,
        status: 500
      });
    }
    return NextResponse.json({
      error: false, message: 'Recovery code token verified successfully.', status: 200
    });

  } catch (e) {
    return NextResponse.json({ error: true, message: 'An unexpected error occurred' });
  }
}

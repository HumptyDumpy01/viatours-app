import { NextRequest, NextResponse } from 'next/server';
import { generateRecoveryCodeToken } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userEmail } = await request.json();

    if (!userEmail || !userEmail.includes('@') || !userEmail.includes('.')) {
      return NextResponse.json({
        error: true,
        message: 'Please enter a valid email address.',
        status: 400
      });
    }

    const response = await generateRecoveryCodeToken(userEmail);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: 'Failed to generate recovery code token.',
        status: 500
      });
    }

    return NextResponse.json({ error: false, message: 'Recovery code token generated successfully.', status: 200 });

  } catch (e) {
    throw null;
  }
}

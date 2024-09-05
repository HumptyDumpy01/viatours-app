import { NextRequest, NextResponse } from 'next/server';
import { pushChangeEmailVerificationToken } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userEmail, sessionEmail } = await request.json();

    if (!userEmail || !sessionEmail || !userEmail.includes(`@`)) {
      return NextResponse.json({ error: true, message: 'Emails are required' }, { status: 400 });
    }

    const response = await pushChangeEmailVerificationToken(userEmail, sessionEmail);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message }, { status: 400 });
    }

    return NextResponse.json({ error: false, message: 'Email verification token has been sent' });

  } catch (e) {
    // throw new Error(`Failed to push change email verification token: ${e}`);
    return NextResponse.json({
      error: true,
      message: 'Failed to push change email verification token'
    }, { status: 500 });
  }
}

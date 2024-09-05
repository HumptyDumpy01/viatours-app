import { NextRequest, NextResponse } from 'next/server';
import { getUser, sendRegisterEmailVerification } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { email } = await request.json();

    const userExists = await getUser({ email: email }, { email: 1, _id: 0 });

    if (userExists.length > 0) {
      return NextResponse.json({ error: true, message: `User with email ${email} already exists` });
    }
    const response = await sendRegisterEmailVerification(email);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message });
    }

    return NextResponse.json({ error: false, message: `Email verification sent to ${email}` });

  } catch (e) {
    // throw new Error(`Failed to send register email verification: ${e}`);
    return NextResponse.json({ error: true, message: `Failed to send register email verification: ${e}` });
  }
}

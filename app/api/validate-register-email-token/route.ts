import { NextRequest, NextResponse } from 'next/server';
import { validateRegisterEmailToken } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userToken, email } = await request.json();

    if (!userToken || !email) {
      return NextResponse.json({ error: true, message: `Invalid token or email` });
    }

    const response = await validateRegisterEmailToken(userToken, email);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message });
    }
    return NextResponse.json({ error: false, message: `Email verified for ${email}` });

  } catch (e) {
    // throw new Error(`Failed to verify user email ${e}`);
    return NextResponse.json({ error: true, message: `Failed to verify user email: ${e}` });
  }
}

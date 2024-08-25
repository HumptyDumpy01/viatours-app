import { NextRequest, NextResponse } from 'next/server';
import { validateDeleteAccountToken } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userEmail, userToken } = await request.json() as { userEmail: string, userToken: string };

    if (!userEmail || !userToken || !userEmail.includes(`@`) || userToken.length !== 6) {
      return NextResponse.json({ error: true, message: 'Enter a valid data!' });
    }
    const response = await validateDeleteAccountToken(userEmail, userToken);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: response.message
      });
    } else {
      return NextResponse.json({
        error: false,
        message: response.message
      });
    }

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({ error: true, message: 'An unexpected error occurred' });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { toggleTwoFactorAuth } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userEmail, value } = await request.json();

    if (!userEmail || typeof value !== `boolean`) {
      return NextResponse.json({ error: true, message: 'Invalid request.' }, { status: 400 });
    }

    const response = await toggleTwoFactorAuth(userEmail, value);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message }, { status: 400 });
    }

    return NextResponse.json({ error: false, message: response.message });

  } catch (e) {
    // throw new Error(`Failed to toggle two-factor authentication. Error: ${e}`);
    return NextResponse.json({
      error: true,
      message: `Failed to toggle two-factor authentication. ${e}`
    }, { status: 500 });
  }
}

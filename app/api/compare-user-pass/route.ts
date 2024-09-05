import { NextRequest, NextResponse } from 'next/server';
import { compareUserPassword, CompareUserPasswordType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { email, oldPassword } = await request.json() as CompareUserPasswordType;

    if (!email || !oldPassword) {
      return NextResponse.json({ error: 'Invalid request', acknowledged: false });
    }

    const response = await compareUserPassword(email, oldPassword);

    if (response.error) {
      return NextResponse.json({ error: response.error, acknowledged: false });
    }

    return NextResponse.json({ acknowledged: true, passwordMatch: response.passwordMatch });

  } catch (e) {
    // throw new Error(`Failed to compare user password: ${e}`);
    return NextResponse.json({ error: 'Failed to compare user password', acknowledged: false });
  }
}

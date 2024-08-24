import { NextRequest, NextResponse } from 'next/server';
import { isPasswordCorrect } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { userEmail, userPassword } = await request.json() as { userEmail: string, userPassword: string };

    if (!userEmail || !userPassword || !userEmail.includes(`@`)) {
      return NextResponse.json({ error: true, message: 'Please enter a valid email address' });
    }
    const response = await isPasswordCorrect(userEmail, userPassword);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message });
    }
    return NextResponse.json({ error: false, message: response.message });

  } catch (e) {
    return null;
  }
}

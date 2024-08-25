import { NextRequest, NextResponse } from 'next/server';
import { changeUserPassword } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { userEmail, password, confirmPassword } = await request.json();

    if (!userEmail || !password || !confirmPassword) {
      return NextResponse.json({ error: true, message: 'Please enter all fields' });
    }
    const response = await changeUserPassword(userEmail, password, confirmPassword);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message });
    }
    return NextResponse.json({ error: false, message: 'Password changed successfully' });

  } catch (e) {
    return NextResponse.json({ error: true, message: 'An unexpected error occurred' });
  }
}
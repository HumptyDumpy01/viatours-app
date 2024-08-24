import { NextRequest, NextResponse } from 'next/server';
import { deleteUserAccount } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { userEmail } = await request.json();

    if (!userEmail || !userEmail.includes('@')) {
      return {
        error: true,
        message: `Invalid request`
      };
    }
    const response = await deleteUserAccount(userEmail);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: response.message
      });
    }
    return NextResponse.json({
      error: false,
      message: response.message
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return null;
  }
}

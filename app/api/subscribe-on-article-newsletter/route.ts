import { NextRequest, NextResponse } from 'next/server';
import { subscribeOnArticleNewsletter } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { email } = await request.json() as { email: string };

    if (!email.trim() || !email.includes(`@`)) {
      return NextResponse.json({
        error: true,
        message: `Email is required`
      });
    }

    const response = await subscribeOnArticleNewsletter(email);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: response.message || `Failed to subscribe to the articles newsletter`
      });
    }

    return NextResponse.json({
      error: false,
      message: response.message || `Success! You are subscribed!`
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to subscribe to the articles newsletter: ${e}`
    });
  }
}

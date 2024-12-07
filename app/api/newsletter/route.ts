import { NextRequest, NextResponse } from 'next/server';
import { addOrRemoveNewsletterEmail } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { email, method } = await request.json() as { email: string, method: 'ADD' | 'REMOVE' };

    const result = await addOrRemoveNewsletterEmail(email, method);

    if (!result?.acknowledged) {
      return NextResponse.json({ error: true, message: 'Error adding email to newsletter' }, { status: 400 });
    }
    return NextResponse.json({ error: false, message: 'Successfully added email to newsletter' });

  } catch (e) {
    // throw new Error(`Failed to add email to newsletter: ${e}`);
    return NextResponse.json({ error: true, message: 'Failed to add email to newsletter' }, { status: 500 });
  }
}

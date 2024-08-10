import { NextRequest, NextResponse } from 'next/server';
import { addEmailToNewsletter } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { email } = await request.json();

    const result = await addEmailToNewsletter(email);

    if (!result?.acknowledged) {
      return NextResponse.json({ error: true, message: 'Error adding email to newsletter' }, { status: 400 });
    }
    return NextResponse.json({ error: false, message: 'Successfully added email to newsletter' });

  } catch (e) {
    throw new Error(`Failed to add email to newsletter: ${e}`);
  }
}

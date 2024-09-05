import { NextRequest, NextResponse } from 'next/server';
import { validateChangeEmailOperation, validateChangeEmailOperationType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userToken, sessionEmail, userEmail } = await request.json() as validateChangeEmailOperationType;

    if (!userToken || !sessionEmail || !userEmail || !userEmail.includes('@')) {
      return NextResponse.json({ error: true, message: 'Invalid request' }, { status: 400 });
    }

    const response = await validateChangeEmailOperation(userToken, sessionEmail, userEmail);

    if (response.error) {
      return NextResponse.json({ error: true, message: response.message }, { status: 400 });
    }

    return NextResponse.json({ error: false, message: 'Email has been successfully changed' });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    // throw new Error(`Failed to validate email operation: ${e}`);
    return NextResponse.json({ error: true, message: `Failed to validate email operation: ${e}` }, { status: 500 });
  }
}

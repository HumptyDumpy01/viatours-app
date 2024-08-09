import { NextRequest, NextResponse } from 'next/server';
import { addOrderIdToUserDocument } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { orderId, userEmail } = await request.json();

    if (!orderId || !userEmail) {
      return NextResponse.json({ error: true, message: 'No orderId or userEmail provided' }, { status: 400 });
    }

    const result = await addOrderIdToUserDocument(orderId, userEmail);

    if (!result?.acknowledged) {
      return NextResponse.json({ error: true, message: 'Error adding orderId to user document' }, { status: 400 });
    }

    return NextResponse.json({ error: false, message: 'Successfully added orderId to user document' });

  } catch (e) {
    throw new Error(`Failed to add orderId to user document: ${e}`);
  }
}

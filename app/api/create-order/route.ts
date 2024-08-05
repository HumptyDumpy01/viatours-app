import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { contactDetails, activityDetails, order } = await request.json();

    if (contactDetails === undefined || activityDetails === undefined) {
      new Error('Failed to get form details!');
    }

    const results = await createOrder(contactDetails, activityDetails, order);

    return NextResponse.json({ results, message: 'Order created successfully. Waiting for payment...' });

  } catch (e) {
    return NextResponse.json({ error: `Internal Server Error ${e}` }, { status: 500 });
  }
}

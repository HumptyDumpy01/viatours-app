import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { approveRequestForCancellation } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { orderId } = await request.json();

    if (!ObjectId.isValid(orderId)) {
      return NextResponse.json({
        error: true,
        message: `Invalid order ID.`
      });
    }

    const response = await approveRequestForCancellation(orderId);

    if (response.error || !response) {
      return NextResponse.json({
        error: true,
        message: response.message
      });
    }

    return NextResponse.json({
      error: false,
      acknowledged: true,
      message: `The request for cancellation has been approved.`
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to approve the request for cancellation: ${e}`
    });
  }
}

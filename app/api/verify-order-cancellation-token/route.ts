import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { verifyOrderCancellationToken } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { orderId, userToken } = await request.json();

    if (!orderId || !userToken || !ObjectId.isValid(orderId)) {
      return NextResponse.json({
        error: true,
        message: `Invalid request body`,
        status: 400
      });
    }

    const response = await verifyOrderCancellationToken(orderId, userToken);

    if (response.error || !response) {
      return NextResponse.json({
        error: true,
        message: response.message || `Failed to verify order cancellation token`,
        status: 400
      });
    }

    return NextResponse.json({
      error: false,
      acknowledged: response.acknowledged,
      message: `Order cancellation token verified successfully`,
      status: 200
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to verify order cancellation token: ${e}`,
      status: 500
    });
  }
}

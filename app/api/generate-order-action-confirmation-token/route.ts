import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { generateOrderActionConfirmationToken } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { orderId, type } = await request.json() as { orderId: string, type: `refund` | `cancellation` };

    if (!orderId || !ObjectId.isValid(orderId)) {
      return NextResponse.json({
        error: true,
        message: 'Invalid request'
      }, { status: 400 });
    }

    if (type !== `refund` && type !== `cancellation`) {
      return NextResponse.json({
        error: true,
        message: 'Invalid request'
      }, { status: 400 });
    }

    const response = await generateOrderActionConfirmationToken(orderId, type);

    if (response?.error) {
      return NextResponse.json({
        error: true,
        message: response.message,
        status: 400
      });
    }

    return NextResponse.json({
      error: false,
      message: `Order ${type} request token generated successfully`,
      status: 200
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to request order refund/cancellation request: ${e}`,
      status: 400
    });
  }
}

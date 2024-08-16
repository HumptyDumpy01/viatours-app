import { NextRequest, NextResponse } from 'next/server';
import { toggleOrderRequest, ToggleOrderRequestType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { type, orderId } = await request.json() as ToggleOrderRequestType;

    if (type !== `Refund` && type !== `Cancellation` || !orderId) {
      return NextResponse.json({
          error: true,
          message: 'Invalid request'
        },
        { status: 400 });
    }

    const response = await toggleOrderRequest(type, orderId);

    if (response?.error) {
      return NextResponse.json({
          acknowledged: false,
          message: response.message
        },
        { status: 400 });
    } else {
      return NextResponse.json({
        acknowledged: response?.status === 200
      });
    }

  } catch (e) {
    throw new Error(`Failed to change order refund/cancellation request: ${e}`);
  }
}

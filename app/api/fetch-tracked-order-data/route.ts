import { NextRequest, NextResponse } from 'next/server';
import { fetchTrackedOrderData } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { orderId } = await request.json() as { orderId: string };
    console.log(`Executing orderId: `, orderId);

    if (!orderId.trim() || orderId.length !== 24) {
      return NextResponse.json({
        error: true,
        message: `Invalid order id!`
      });
    }

    const response = await fetchTrackedOrderData(orderId);

    console.log(`Response: `, response);

    if (!response) {
      return NextResponse.json({
        error: true,
        message: `Failed to fetch order details!`
      });
    }

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: response.message,
        status: 404
      });
    }

    return NextResponse.json({
      error: false,
      order: response.order,
      message: `Order details fetched successfully!`,
      status: 200
    });


    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {

    return NextResponse.json({
      error: true,
      message: `Failed to fetch order details!: ${e}`
    });
  }
}

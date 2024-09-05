import { NextRequest, NextResponse } from 'next/server';
import { handleOrder } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { perform, id } = await request.json();

    if (perform === undefined || id === undefined) {
      new Error('Failed to get form details!');
    }

    if (perform === `fetchById`) {
      const order = await handleOrder(perform, id);
      return NextResponse.json({ order, message: 'Order fetched successfully.' });
    }

    if (perform === `changeStatus`) {
      const order = await handleOrder(perform, id);

      return NextResponse.json({ order, message: 'Order status changed to paid.' });
    }
    if (perform === `deletion`) {
      await handleOrder(perform, id);
      return NextResponse.json({ message: 'Order deleted successfully.' });
    }

  } catch (e) {
    // throw new Error(`Failed to handle the order! ${e}`);
    return NextResponse.json({
      message: `Failed to handle the order! ${e}`, acknowledged: false
    });
  }
}

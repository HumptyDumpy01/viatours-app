import { NextRequest, NextResponse } from 'next/server';
import { handleAddRemoveFromWishlist } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { isWishlisted, tourId, userEmail } = await request.json();

    if (!userEmail || !tourId || isWishlisted === undefined) {
      new Error('No user email or tour id or isWishlisted provided!');
    }

    const result = await handleAddRemoveFromWishlist(isWishlisted, tourId, userEmail);

    if (!result.acknowledged) {
      return NextResponse.json({
        error: true,
        // status: result.status,
        message: 'Failed to handle remove/add to wishlist!'
      }, { status: 400 });
    } else {
      return NextResponse.json({ error: false, status: result.status, message: 'Success!' }, { status: 200 });
    }

  } catch (e) {
    throw new Error(`Failed to handle remove/add to wishlist: ${e}`);
  }
}

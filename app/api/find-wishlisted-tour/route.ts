import { NextRequest, NextResponse } from 'next/server';
import { findWishlistedTour } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { tourId, userEmail } = await request.json();
    console.log(`tourId: ${tourId}, userEmail: ${userEmail}`);

    if (!userEmail || !tourId) {
      return NextResponse.json({ error: true, message: 'Invalid request!' }, { status: 400 });
    }

    const result = await findWishlistedTour(tourId, userEmail);

    console.log(`result: ${result}`);

    return NextResponse.json({ error: false, result }, { status: 200 });

  } catch (e) {
    // throw new Error(`Failed to find wishlisted tour: ${e}`);
    return NextResponse.json({ error: true, message: `Failed to find wishlisted tour: ${e}` }, { status: 500 });
  }
}

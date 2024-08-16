import { NextRequest, NextResponse } from 'next/server';
import { getTourById, getTours } from '@/lib/mongodb';
import { TourInterface } from '@/data/DUMMY_TOURS';

export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({
          error: true,
          message: 'Invalid tour id provided'
        },
        { status: 400 });
    }

    const currTour = await getTourById(id) as TourInterface;
    const similarTours = await getTours(22, { tags: { $in: currTour.tags } }) as TourInterface[];

    if (!currTour) {
      return NextResponse.json({
          error: true,
          message: 'Tour not found'
        },
        { status: 404 });
    } else {
      return NextResponse.json({
        error: false,
        message: 'Tour found',
        response: { currTour, similarTours }
      });
    }

  } catch (e) {
    throw new Error(`Failed to fetch tour data: ${e}`);
  }
}
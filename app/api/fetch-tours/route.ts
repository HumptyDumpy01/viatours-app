import { getTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  if (request) {
    const { filter } = await request.json();
    console.log(`filter from route.ts`, filter);

    const tours = await getTours(9999, { tags: { $in: filter } }, 0);

    return NextResponse.json({ tours });
  }

  const tours = await getTours(9999, {}, 0);
  // console.log(`fetching tours: `, tours);
  return NextResponse.json({ tours });
}
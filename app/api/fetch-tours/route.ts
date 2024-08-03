import { getTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { filter, filterType } = await request.json();
  if (filter) {
    console.log(`filter from route.ts`, filter);

    const tours = await getTours(9999, { tags: { $in: filter } }, 0);

    return NextResponse.json({ tours });

  }

  if (filterType) {
    console.log(`filterType from route.ts`, filterType);

    const tours = await getTours(9999, { type: { $in: filterType } }, 0);
    console.log(tours);

    return NextResponse.json({ tours });
  }

  const tours = await getTours(9999, {}, 0);
  // console.log(`fetching tours: `, tours);
  return NextResponse.json({ tours });
}
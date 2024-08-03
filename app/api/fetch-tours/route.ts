import { getTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { filter, filterType, filterSearch } = await request.json();
  if (filter) {
    // console.log(`filter from route.ts`, filter);

    const tours = await getTours(9999, { tags: { $in: filter } }, 0);

    return NextResponse.json({ tours });

  }

  if (filterType && !filterSearch) {
    // console.log(`filterType from route.ts`, filterType);

    const tours = await getTours(9999, { type: { $in: filterType } }, 0);
    console.log(tours);

    return NextResponse.json({ tours });
  }

  if (filterSearch && !filterType) {
    console.log(`filterSearch from route.ts`, filterSearch);

    const tours = await getTours(9999, { $text: { $search: filterSearch } }, 0);
    // console.log(tours);

    return NextResponse.json({ tours });
  }

  if (filterType !== `default` && filterSearch) {
    // console.log(`filterType and filterSearch from route.ts`, filterType, filterSearch);

    const tours = await getTours(9999, { type: { $in: filterType }, $text: { $search: filterSearch } }, 0);
    // console.log(tours);

    return NextResponse.json({ tours });
  }

  if (filterType === `default` && filterSearch) {

    const tours = await getTours(9999, { $text: { $search: filterSearch } }, 0);
    // console.log(tours);

    return NextResponse.json({ tours });
  }

  const tours = await getTours(9999, {}, 0);
  // console.log(tours);
  // console.log(`fetching tours: `, tours);
  return NextResponse.json({ tours });
}
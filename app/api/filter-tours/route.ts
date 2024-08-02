import { filterTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchTerm, sort, tourType } = await request.json();
  console.log(`tourType from route.ts`, tourType);

  const tours = await filterTours(searchTerm, sort, tourType ? tourType : false);
  // console.log(`fetching filtered tours: `, tours);

  return NextResponse.json({ tours });
}
import { filterTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchTerm, sort } = await request.json();
  console.log(`sort from route.ts`, sort);

  const tours = await filterTours(searchTerm, sort);
  // console.log(`fetching filtered tours: `, tours);

  return NextResponse.json({ tours });
}
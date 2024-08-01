import { getTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchTerm } = await request.json();
  const tours = await getTours(9999, { $text: { $search: searchTerm } }, 0);
  console.log(`fetching filtered tours: `, tours);

  return NextResponse.json({ tours });
}
import { getTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchTerm } = await request.json();
  const tours = await getTours(9999, { $text: { $search: searchTerm } }, 0,
    { images: 1, title: 1, country: 1, city: 1, rating: 1, reviews: 1, price: 1, overview: 1, duration: 1 });
  console.log(`fetching filtered tours: `, tours);

  return NextResponse.json({ tours });
}
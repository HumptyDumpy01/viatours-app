import { getTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  const tours = await getTours(9999, {}, 0);
  // console.log(`fetching tours: `, tours);
  return NextResponse.json({ tours });
}
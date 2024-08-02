import { filterTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchTerm, sort, tourType, tourTags, tourLanguages } = await request.json();
  console.log(`tourTags from route.ts`, tourTags);

  const tours = await filterTours(
    searchTerm,
    sort,
    tourType ? tourType : false,
    tourTags ? tourTags : false,
    tourLanguages ? tourLanguages : false);
  // console.log(`fetching filtered tours: `, tours);

  return NextResponse.json({ tours });
}
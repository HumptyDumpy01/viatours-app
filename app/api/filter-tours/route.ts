import { filterTours } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const {
    searchTerm,
    sort,
    tourType,
    tourTags,
    tourLanguages,
    tourRatings,
  } = await request.json();
  console.log(`tourRatings from route.ts`, tourRatings);

  const tours = await filterTours(
    searchTerm ? searchTerm : `find-all-tours`,
    sort,
    tourType ? tourType : false,
    tourTags ? tourTags : false,
    tourLanguages ? tourLanguages : false,
    tourRatings ? tourRatings : false
  );
  // console.log(`fetching filtered tours: `, tours);

  return NextResponse.json({ tours });
}
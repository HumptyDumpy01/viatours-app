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

  const tours = await filterTours(
    searchTerm ? searchTerm : `find-all-tours`,
    sort,
    tourType ? tourType : false,
    tourTags ? tourTags : false,
    tourLanguages ? tourLanguages : false,
    tourRatings ? tourRatings : false
  );
  return NextResponse.json({ tours });
}
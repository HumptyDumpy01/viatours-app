import { NextRequest, NextResponse } from 'next/server';
import { fetchArticlesAuthors } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { project, limit } = await request.json();
    console.log(`Executing fetch-articles-authors: `, project);
    // create a serer function in e.g. mongodb.ts and then call it here
    const response = await fetchArticlesAuthors(project, limit);

    if (!response) {
      return NextResponse.json({
        error: true,
        message: `Failed to fetch authors`
      });
    }

    return NextResponse.json({
      error: false,
      authors: response.authors
    });

  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to fetched authors: ${e}`
    });
  }
}

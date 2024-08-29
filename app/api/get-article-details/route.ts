import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import { getArticleDetails } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { id } = await request.json();

    // check if id passed is of object id type

    if (!ObjectId.isValid(id)) {
      notFound();
    }
    const response = await getArticleDetails(id);

    if (response.error || !response) {
      return NextResponse.json({
        error: true,
        message: `Failed to fetch article details: ${response.message}`
      });
    }

    return NextResponse.json({
      error: false,
      article: response.article,
      message: `Successfully fetched article details`
    });

  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to fetch article details: ${e}`
    });
  }
}

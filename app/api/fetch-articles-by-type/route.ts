import { NextRequest, NextResponse } from 'next/server';
import { fetchArticlesByType, TypesType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { type } = await request.json() as { type: TypesType[] };

    if (!type) {
      return NextResponse.json({
        error: true,
        message: `Failed to fetch articles by type: type is missing`
      });
    }
    const response = await fetchArticlesByType(type);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to fetch articles by type: ${response.message}`
      });
    }

    return NextResponse.json({
      error: false,
      articles: response.articles
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to fetch articles by type: ${e}`
    });
  }
}

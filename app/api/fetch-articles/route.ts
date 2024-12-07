import { NextRequest, NextResponse } from 'next/server';
import { getArticles } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { limit, project } = await request.json();

    const response = await getArticles(limit, project);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: response.message,
        status: response.status
      });
    }

    if (!response.articles) {
      return NextResponse.json({
        error: true,
        message: `No articles found`
      });
    }

    return NextResponse.json({
      error: false,
      articles: response.articles
    });

  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `An error occurred while fetching the articles: ${e}`
    });
  }
}

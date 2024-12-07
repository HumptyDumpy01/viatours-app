import { NextRequest, NextResponse } from 'next/server';
import { fetchArticlesByTags } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { tags, limit } = await request.json();

    if (!tags.includes(`hot`) && !tags.includes(`new`) && !tags.includes(`featured`) && !tags.includes(`top`)) {
      return NextResponse.json({
        error: true,
        message: `Invalid tags: ${tags}`
      });
    }

    const articles = await fetchArticlesByTags(tags, limit);

    if (articles.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to fetch articles by tags: ${articles.error}`
      });
    }

    return NextResponse.json({
      error: false,
      articles: articles.articles
    });

  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to fetch articles by tags: ${e}`
    });
  }
}

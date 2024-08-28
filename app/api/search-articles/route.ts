import { NextRequest, NextResponse } from 'next/server';
import { getArticles, searchArticles } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { searchTerm } = await request.json();

    if (searchTerm.trim() === ``) {
      // fetch all articles
      const response = await getArticles();
      if (response.error) {
        return NextResponse.json({
          error: true,
          message: `Failed to fetch articles: ${response.message}`
        });
      }
      return NextResponse.json({
        articles: response.articles
      });
    } else {
      // fetch articles by searchTerm
      const response = await searchArticles(searchTerm);
      console.log(`response from route:`, response);

      return NextResponse.json({
        articles: response.articles
      });
    }

  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to fetch articles by searchTerm: ${e}`
    });
  }
}

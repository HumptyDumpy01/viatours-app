import { NextRequest, NextResponse } from 'next/server';
import { deleteUserSavedArticle } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userEmail, articleId } = await request.json() as { userEmail: string, articleId: string };

    if (!userEmail || !userEmail.includes(`@`) || !articleId) {
      return NextResponse.json({
        error: true,
        message: `Failed to delete specified article from user's saved articles array.`
      });
    }

    const response = await deleteUserSavedArticle(userEmail, articleId);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to delete specified article from user's saved articles array.`
      });
    }

    return NextResponse.json({
      error: false,
      message: `Specified article has been deleted from user's saved articles array.`
    });

  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to delete specified article from user's saved articles array: ${e}`
    });
  }
}

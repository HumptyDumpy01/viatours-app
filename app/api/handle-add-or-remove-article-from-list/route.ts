import { NextRequest, NextResponse } from 'next/server';
import { SessionType } from '@/components/UI/Comment/Comment';
import { handleAddOrRemoveArticleFromList } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { type, session, articleId } = await request.json() as {
      type: `add` | `remove`,
      session: SessionType,
      articleId: string
    };

    if (type !== `add` && type !== `remove`) {
      return NextResponse.json({
        error: true,
        message: `Invalid type!`
      });
    }

    if (!session.user.email) {
      return NextResponse.json({
        error: true,
        message: `User is not authenticated!`
      });
    }

    if (!articleId) {
      return NextResponse.json({
        error: true,
        message: `Article id is missing!`
      });
    }

    const response = await handleAddOrRemoveArticleFromList(type, session, articleId);

    if (response?.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to ${type} the article from the list: ${response.message}`
      });
    }

    return NextResponse.json({
      error: false,
      message: `Article ${type}ed successfully!`
    });

  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to  the article from the list: ${e}`
    });
  }
}

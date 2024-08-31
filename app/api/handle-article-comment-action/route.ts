import { NextRequest, NextResponse } from 'next/server';
import { handleArticleCommentAction, handleArticleCommentActionType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { type, session, commentId } = await request.json() as handleArticleCommentActionType;

    if (type !== 'like' && type !== 'dislike') {
      return NextResponse.json({ error: true, message: `Invalid action type: ${type}` });
    }

    if (session.user.email.trim() === ``) {
      return NextResponse.json({ error: true, message: `Invalid session` });
    }

    if (commentId.trim() === ``) {
      return NextResponse.json({ error: true, message: `CommentId is empty!` });
    }

    const response = await handleArticleCommentAction(type, session, commentId);

    if (response?.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to perform action over the article comment: ${response.message}`
      });
    }

    return NextResponse.json({ error: false, message: `Action performed successfully!` });

  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to perform action over the article comment: ${e}`
    });
  }
}

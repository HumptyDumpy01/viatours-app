import { NextRequest, NextResponse } from 'next/server';
import { reportArticleCommentAbuse } from '@/lib/mongodb';
import { SessionType } from '@/components/UI/Comment/Comment';

export async function POST(request: NextRequest) {
  try {

    const { commentId, session } = await request.json() as { commentId: string, session: SessionType };

    if (!commentId) {
      return NextResponse.json({
        error: true,
        message: `No comment id was provided`
      });
    }
    if (!session.user.email) {
      return NextResponse.json({
        error: true,
        message: `No user email was provided`
      });
    }

    const response = await reportArticleCommentAbuse(commentId, session);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: response.message
      });
    }
    return NextResponse.json({
      error: false,
      message: response.message
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to report the article comment abuse: ${e}`
    });
  }
}

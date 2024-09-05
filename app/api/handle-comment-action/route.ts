import { NextRequest, NextResponse } from 'next/server';
import { handleCommentAction, handleCommentActionType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { commentId, userEmail, action } = await request.json() as handleCommentActionType;

    if (!commentId || !userEmail || !action) {
      new Error(`Invalid request!`);
    }

    const response = await handleCommentAction(commentId, userEmail, action) as {
      acknowledged: boolean;
      status: string;
    };
    if (!response.acknowledged) {
      return NextResponse.json({ acknowledged: response.acknowledged });
    }

    return NextResponse.json({ acknowledged: response.acknowledged, status: response.status });

  } catch (e) {
    // throw new Error(`Failed to handle the comment action in API route!`);
    return NextResponse.json({
      acknowledged: false,
      message: e || `Failed to handle the comment action in API route!`
    });
  }
}

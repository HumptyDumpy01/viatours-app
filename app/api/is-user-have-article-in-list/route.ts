import { NextRequest, NextResponse } from 'next/server';
import { SessionType } from '@/components/UI/Comment/Comment';
import { isUserHaveArticleInList } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { session, articleId } = await request.json() as { session: SessionType, articleId: string };

    if (!session.user.email || !articleId) {
      return NextResponse.json({
        error: true,
        message: `No session or article id provided!`
      });
    }
    const response = await isUserHaveArticleInList(session, articleId);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to determine if the user has the article in his list: ${response.message}`
      });
    }

    return NextResponse.json({
      error: false,
      message: `Success!`,
      status: response.status
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to determine if the user has the article in his list: ${e}`
    });
  }
}

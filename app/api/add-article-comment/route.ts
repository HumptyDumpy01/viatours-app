import { NextRequest, NextResponse } from 'next/server';
import { SessionType } from '@/components/UI/Comment/Comment';
import { FormResultsType } from '@/components/article-description/leave-reply/ArticleDescrLeaveReply';
import { addArticleComment } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { session, formResults, author } = await request.json() as {
      session: SessionType,
      formResults: FormResultsType,
      author: string
    };

    if (!session || !formResults) {
      return NextResponse.json({
        error: true,
        message: `Error! Session or formResults are missing`
      });
    }
    const response = await addArticleComment(session, formResults, author);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to add an article comment: ${response.message}`
      });
    }

    return NextResponse.json({
      error: false,
      // @ts-ignore
      insertedId: response.insertedId.toString(),
      message: `Article comment added successfully`
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to add an article comment: ${e}`
    });
  }
}

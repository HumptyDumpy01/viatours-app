import { NextRequest, NextResponse } from 'next/server';
import { deleteAllUserSavedArticles } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userEmail } = await request.json() as { userEmail: string };

    if (!userEmail || !userEmail.includes(`@`)) {
      return NextResponse.json({
        error: true,
        message: `Failed to delete all saved articles.`,
        status: 400
      });
    }

    const response = await deleteAllUserSavedArticles(userEmail);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to delete all saved articles.`,
        status: 500
      });
    }
    return NextResponse.json({
      error: false,
      message: `All saved articles have been deleted.`,
      status: 200
    });

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to delete all saved articles.`,
      status: 500
    });
  }
}

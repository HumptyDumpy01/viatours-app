import { NextRequest, NextResponse } from 'next/server';
import { deleteUserData, DeleteUserDataType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { as, userEmail } = await request.json() as DeleteUserDataType;

    if (!userEmail || as !== `wishlist` && as !== `deleteAccount` && as !== `notifications` && as !== `savedArticles`) {
      return NextResponse.json({
        error: true,
        message: `Invalid request data.`
      });
    }

    const response = await deleteUserData(as, userEmail);


    if (response?.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to delete user data.`
      });
    } else {
      return NextResponse.json({
        error: false,
        message: `Successfully deleted`
      });
    }


  } catch (e) {
    // throw new Error(`Failed to delete user data specified: ${e}`);
    return NextResponse.json({
      error: true,
      message: `Failed to delete user data.`
    });
  }
}

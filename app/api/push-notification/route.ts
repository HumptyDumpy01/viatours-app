import { NextRequest, NextResponse } from 'next/server';
import { pushNotificationToUserDocument, updateUserType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { userId, type, data } = await request.json() as updateUserType;

    const result = await pushNotificationToUserDocument(userId, type, data);

    if (!result) {
      return NextResponse.json({ data: null, error: `Failed to push notification to user document.` });
    }

    return NextResponse.json({ data: result, error: false });

  } catch (e) {
    // throw new Error(`Failed to push notification to user document. Error: ${e}`);
    return NextResponse.json({ data: null, error: `Failed to push notification to user document.` });
  }
}

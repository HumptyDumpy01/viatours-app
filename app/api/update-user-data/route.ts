import { NextRequest, NextResponse } from 'next/server';
import { updateUserData, UpdateUserDataType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { formData, method } = await request.json() as UpdateUserDataType;

    if (!formData || !method) {
      return {
        error: 'Invalid request'
      };
    }
    const result = await updateUserData(formData, method);

    if (result?.error) {
      return NextResponse.json({ error: result.error, acknowledged: false });
    } else {
      return NextResponse.json({ acknowledged: result?.acknowledged });
    }

  } catch (e) {
    throw new Error(`Failed to update user data: ${e}`);
  }
}

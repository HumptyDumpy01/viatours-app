import { NextRequest, NextResponse } from 'next/server';
import { updateUserData, UpdateUserDataType } from '@/lib/mongodb';

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const { formData, method } = await request.json() as UpdateUserDataType;

    if (!formData || !method) {
      return NextResponse.json({ error: 'Invalid request' });
    }

    const result = await updateUserData(formData, method);

    if (result?.error) {
      return NextResponse.json({ error: result.error, acknowledged: false });
    } else {
      return NextResponse.json({ acknowledged: result?.acknowledged });
    }
  } catch (e) {
    return NextResponse.json({ error: `Failed to update user data: ${e}` });
  }
}
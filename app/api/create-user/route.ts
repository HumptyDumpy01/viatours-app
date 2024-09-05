import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { formData } = await request.json();

    if (!formData) {
      return NextResponse.json({ error: 'Form data is required.', status: 400 });
    }

    const handleCreateUser = await createUser(formData);

    console.log(`Executing handleCreateUser: `, handleCreateUser);


    if (!handleCreateUser.acknowledged) {
      return NextResponse.json({
        error: handleCreateUser.error,
        status: 400,
        acknowledged: handleCreateUser.acknowledged
      });
    } else {
      return NextResponse.json({
        message: handleCreateUser.success,
        status: 200,
        acknowledged: handleCreateUser.acknowledged
      });
    }

  } catch (e) {
    // throw new Error(`Failed to create user: ${e}`);
    return NextResponse.json({ error: `Failed to create user: ${e}`, status: 500 });
  }
}

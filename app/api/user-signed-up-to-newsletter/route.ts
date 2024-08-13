import { NextRequest, NextResponse } from 'next/server';
import { userSignedUpToNewsletter } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userEmail } = await request.json();

    if (!userEmail) {
      return NextResponse.json({ error: true, message: `User email is required!` }, { status: 400 });
    }

    const response = await userSignedUpToNewsletter(userEmail);

    if (response.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to check whether the user signed up to newsletter or not.`
      }, { status: 400 });
    }

    return NextResponse.json({ userSignedUpToNewsletter: response.status });

  } catch (e) {
    throw new Error(`Failed to check whether the user signed up to newsletter or not. Error: ${e}`);
  }
}

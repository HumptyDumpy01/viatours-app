import { NextResponse } from 'next/server';
import { getUser } from '@/lib/mongodb';

export async function POST(request: Request) {
  const { userEmail, options } = await request.json();

  if (!userEmail) {
    return NextResponse.json({ message: 'Email is required.', status: 400, resp: false });
  }

  const result = await getUser({ email: userEmail }, options);
  console.log(`result: `, result);

  if (result.length > 0) {
    return NextResponse.json({
      message: 'This user already exists in our database. For protection reasons, sign in to continue.',
      status: 200,
      resp: true,
      result
    });
  } else {
    return NextResponse.json({ message: 'User does not exist.', status: 500, resp: false });
  }
}

import { NextResponse } from 'next/server';
import { getUser } from '@/lib/mongodb';

export async function POST(request: Request) {
  const { userEmail, options, unwind = false } = await request.json();

  if (!userEmail) {
    return NextResponse.json({ message: 'Email is required.', status: 400, resp: false });
  }

  if (!unwind) {
    const result = await getUser({ email: userEmail }, options);

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
  } else {

    const result = await getUser({ email: userEmail }, options, unwind);

    if (result.error) {
      return NextResponse.json({ error: true, message: 'Failed to fetch user data.', status: 500 });
    } else {
      return NextResponse.json({
        error: false,
        message: 'User data fetched successfully.',
        status: 200,
        result
      });
    }

  }

}

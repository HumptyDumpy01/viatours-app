import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { formData } = await request.json();

    if (!formData) {
      return NextResponse.json({ error: 'Form data is required.', status: 400 });
    }

    const handleCreateUser = await createUser(formData);

    if (handleCreateUser?.error) {
      return NextResponse.json({ error: handleCreateUser.error, status: 400 });
    }

    return NextResponse.json({ message: 'User created successfully.', status: 200 });

  } catch (e) {
    throw new Error(``);
  }
}

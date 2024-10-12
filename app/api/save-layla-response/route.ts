import { NextRequest, NextResponse } from 'next/server';
import { LaylaResponseType, saveLaylaResponse } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { response } = await request.json() as { response: LaylaResponseType };

    await saveLaylaResponse(response);

    // create a serer function in e.g. mongodb.ts and then call it here
    return NextResponse.json({
      status: `success`,
      data: null,
      message: `Layla response saved successfully!`
    });
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: ` ${e}`
    });
  }
}

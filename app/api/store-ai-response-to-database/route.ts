import { NextRequest, NextResponse } from 'next/server';
import { LaylaResponseType } from '@/components/UI/AIAgent/AIAgentLayla';
import { storeAIResponseToDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { response } = await request.json() as { response: LaylaResponseType };

    if (!response || !response.response.trim()) {
      return NextResponse.json({
        error: true,
        message: `Failed to store AI response to database: response is empty`
      });
    }
    const result = await storeAIResponseToDatabase(response);

    if (result.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to store AI response to database: ${result.message}`,
        status: result.status
      });
    } else {
      return NextResponse.json({
        error: false,
        message: `Successfully stored AI response to database`,
        status: result.status
      });
    }

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to store AI response to database: ${e}`
    });
  }
}

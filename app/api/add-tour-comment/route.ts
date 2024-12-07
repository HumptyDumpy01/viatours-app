import { NextRequest, NextResponse } from 'next/server';
import { FormResultsType } from '@/components/UI/Layout/LeaveReply';
import { submitTourComment } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { user, rating, email, session, text, images, tourId, title } = await request.json() as FormResultsType;


    const submitForm = await submitTourComment({ user, rating, email, session, text, images, tourId, title });
    console.log(`Executing submitForm on  backend : `, submitForm);

    if (submitForm.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to add a tour comment: ${submitForm.error}`
      });
    }

    return NextResponse.json({
      error: false,
      success: true,
      images: submitForm.images ? submitForm.images : null,
      message: `Tour comment added successfully`
    });

  } catch (e) {
    return NextResponse.json({
      error: true,
      message: `Failed to add a tour Comment! ${e}`
    });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { deleteIndividualUserItem, DeleteIndividualUserItemType } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {

    const { userEmail, itemId, type } = await request.json() as DeleteIndividualUserItemType;

    if (!userEmail || !itemId || !type) {
      return NextResponse.json({
        error: true,
        message: `Please provide all the required fields.`
      });
    }

    const response = await deleteIndividualUserItem(userEmail, itemId, type);

    if (response?.error) {
      return NextResponse.json({
        error: true,
        message: `Failed to delete the item.`
      });
    } else {
      return NextResponse.json({
        error: false,
        message: `Item successfully deleted.`
      });
    }

    // create a serer function in e.g. mongodb.ts and then call it here
  } catch (e) {
    throw new Error(`Error deleting individual user item: ${e}`);
  }
}

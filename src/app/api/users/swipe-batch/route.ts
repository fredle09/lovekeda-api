import { badRequestResponse, errorResponse, successfulResponse, unauthorizedResponse } from '@/utils/handlers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { userId, swipes } = await req.json();

    if (!userId)
      return unauthorizedResponse();

    if (!Array.isArray(swipes))
      return badRequestResponse({ message: 'Invalid request' });

    console.log("🚀 ~ POST ~ swipes:", swipes)
    // TODO: Implement swipe processing logic here

    return successfulResponse({ message: 'Swipes processed successfully' });
  } catch (error) {
    console.error(error);
    return errorResponse({ message: 'Failed to process swipes' });
  }
}

import { Swipe } from '@/lib/models/swipe.model';
import { badRequestResponse, errorResponse, successfulResponse, unauthorizedResponse } from '@/utils/handlers';
import { NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { user_id, swipes } = await req.json();
    if (!user_id) return unauthorizedResponse();
    if (!Array.isArray(swipes)) return badRequestResponse({ message: 'Invalid request' });

    await Swipe.insertMany(swipes.map((swipe) => ({ ...swipe, user_id })));
    return successfulResponse({ message: 'Swipes processed successfully' });
  } catch (error) {
    console.error(error);
    return errorResponse({ message: 'Failed to process swipes' });
  }
}

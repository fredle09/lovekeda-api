import { badRequestResponse, errorResponse, successfulResponse, unauthorizedResponse } from '@/utils/handlers';
import { NextRequest } from 'next/server';
import { User } from '@/lib/models';

export async function POST(req: NextRequest) {
  try {
    const { user_id, swipes } = await req.json();
    if (!user_id) return unauthorizedResponse();
    if (!Array.isArray(swipes)) return badRequestResponse({ message: 'Invalid request' });

    const uniqueLikes = [...new Set(swipes.map((swipe) => swipe.target_user_id))];

    await User.updateOne(
      { user_id },
      { $addToSet: { likes: { $each: uniqueLikes } } }
    );

    const mutualLikes = await User.find(
      { user_id: { $in: uniqueLikes }, likes: user_id },
      { user_id: 1 }
    ).lean();

    const mutualLikeIds = mutualLikes.map((user) => user.user_id);

    if (mutualLikeIds.length > 0) {
      const bulkOps = [
        {
          updateOne: {
            filter: { user_id },
            update: { $addToSet: { matches: { $each: mutualLikeIds } } },
          },
        },
        ...mutualLikeIds.map((id) => ({
          updateOne: {
            filter: { user_id: id },
            update: { $addToSet: { matches: user_id } },
          },
        })),
      ];

      await User.bulkWrite(bulkOps);
    }

    return successfulResponse({ message: 'Likes and matches updated successfully' });
  } catch (error) {
    console.error(error);
    return errorResponse({ message: 'Failed to process likes and matches' });
  }
}

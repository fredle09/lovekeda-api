import { model, models, Schema } from "mongoose";

const SwipeSchema = new Schema({
  user_id: { type: String, required: true },
  target_user_id: { type: String, required: true },
  emotion: { type: String, required: true },
}, { timestamps: true });

export const Swipe = models?.Swipe ?? model('Swipe', SwipeSchema);
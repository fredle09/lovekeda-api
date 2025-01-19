import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  user_id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  imgs: { type: [{ type: String }], default: [] },
  coordinate: [{ type: Number }],
  location: { type: String },
  hobbies: [{ type: String }],
}, { strict: false });

export const User = models?.User ?? model('User', UserSchema);
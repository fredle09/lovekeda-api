import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  avt: { type: String },
  coordinate: [{ type: Number }],
  location: { type: String },
  hobbies: [{ type: String }],
}, { strict: false });

export const User = models?.User ?? model('User', UserSchema);
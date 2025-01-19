import { ENUM_USER_GENDER } from "@/utils/constants";
import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  user_id: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  name: { type: String },
  gender: { type: String, enum: ENUM_USER_GENDER, default: ENUM_USER_GENDER.Male },
  age: { type: Number },
  bio: { type: String },
  imgs: { type: [{ type: String }], default: [] },
  coordinate: [{ type: Number }],
  location: { type: String },
  hobbies: [{ type: String }],
  is_complete_profile: { type: Boolean, default: false },
}, { strict: false });

export const User = models?.User ?? model('User', UserSchema);
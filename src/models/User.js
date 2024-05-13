import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: 'string' },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    image: { type: String },
    phone: { type: String },
    address: { type: String },
  },
  { timestamps: true },
);

export const User = models?.User || model('User', UserSchema);

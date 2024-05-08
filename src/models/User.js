// const {
//   Schema,
//   models,
//   model,
// } = require('mongoose');
import { Schema, model, models } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: (pass) => {
        if (!pass || pass?.length < 5) {
          new Error(
            'Password must be at least 5 characters',
          );
        }
      },
    },
  },
  { timestamps: true },
);

UserSchema.post('validate', (user) => {
  const password = user.password;
  console.log('password', password);
  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(password, salt);
});

export const User =
  models?.User || model('User', UserSchema);

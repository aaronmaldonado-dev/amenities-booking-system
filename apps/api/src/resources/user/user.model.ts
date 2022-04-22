import bcrypt from 'bcrypt';
import mongoose, { HookNextFunction } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';

import { User as UserInterface } from './user.interface';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please, provide a name.'],
    },
    lastName: {
      type: String,
      required: [true, 'Please, provide a last name.'],
    },
    address: {
      type: String,
      required: [true, 'Please, provide an address.'],
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'Please provide an e-mail address.'],
      validate: [validator.isEmail, 'Please provide a valid e-mail address'],
    },
    password: {
      type: String,
      minlength: 8,
      required: [true, 'Please, provide a password.'],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

userSchema.pre('save', function (this: UserInterface, next: HookNextFunction) {
  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, 8, (err, hash) => {
    if (err) {
      return next(err);
    }

    this.password = hash;
    next();
  });
});

userSchema.methods.checkPassword = function (password: string) {
  const passwordHash: string = this.password;

  return new Promise((resolve, reject) => {
    bcrypt.compare(password, passwordHash, (err, same) => {
      if (err) {
        return reject(err);
      }

      resolve(same);
    });
  });
};

export const User = mongoose.model('user', userSchema);

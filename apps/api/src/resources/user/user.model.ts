import bcrypt from 'bcrypt';
import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import validator from 'validator';

import { HookNextFunction } from '../../interfaces/mongoose.interfaces';
import { IUserDocument } from './user.interface';

const schema: Schema<IUserDocument> = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please, provide a name.'],
    },
    lastName: {
      type: String,
      required: [true, 'Please, provide a last name.'],
    },
    address: {
      type: String,
      unique: true,
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
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please, confirm your password.'],
      validate: {
        validator: function (this: IUserDocument, el: string) {
          console.log(this);
          console.log(el);

          return el === this.password;
        },
        message: 'Error, passwords are not the same.',
      },
    },
  },
  {
    timestamps: true,
  }
);

schema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

schema.pre('save', async function (this: IUserDocument, next: HookNextFunction) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

schema.method('checkPassword', async function (password: string) {
  const passwordHash: string = this.password;
  return await bcrypt.compare(password, passwordHash);
});

export const User = model<IUserDocument>('User', schema);

import { Document } from 'mongoose';

interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  passwordConfirm: string | undefined;
}

export interface IUserDocument extends IUser, Document {
  checkPassword: (password: string) => Promise<boolean>;
}

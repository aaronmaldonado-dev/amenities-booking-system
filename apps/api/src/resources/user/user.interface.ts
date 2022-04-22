import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  name: string;
  lastName: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
  createdAt: string;
  updatedAt: string;
}

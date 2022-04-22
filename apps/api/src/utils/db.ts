import mongoose from 'mongoose';

export const connect = (url: string, options = {}) => {
  return mongoose.connect(url, { ...options });
};

import { Document, Types } from 'mongoose';

export interface IAmenityDocument extends Document {
  name: string;
  maxUserSlots: number;
  userSlots: Types.ObjectId[];
  capacity: number;
  timeSpan: number;
}

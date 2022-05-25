import { model, Schema } from 'mongoose';

import { IAmenityDocument } from './amenity.interface';

const schema: Schema<IAmenityDocument> = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide an amenity name.'],
  },
  maxUserSlots: {
    type: Number,
  },
  capacity: {
    type: Number,
  },
  timeSpan: {
    type: Number,
  },
  userSlots: [
    {
      type: Schema.Types.ObjectId,
      ref: 'users',
    },
  ],
});

export const Amenity = model<IAmenityDocument>('Amenity', schema);

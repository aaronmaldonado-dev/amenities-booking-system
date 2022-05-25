import 'dotenv/config';

import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';

import { AMENITIES_PATH, API_VERSION, USERS_PATH } from './constants';
import { router as amenityRouter } from './resources/amenity/amenity.router';
import { router as userRouter } from './resources/user/user.router';
import { catchAsync } from './utils/catchAsync';

const { DATABASE, PORT } = process.env;

if (!DATABASE || !PORT) process.exit(1);

export const app: Application = express();

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(`${API_VERSION}${USERS_PATH}`, userRouter);
app.use(`${API_VERSION}${AMENITIES_PATH}`, amenityRouter);

export const start = async () => {
  try {
    mongoose.connect(DATABASE);
    app.listen(PORT, () => {
      console.log(`REST API on http://localhost:${PORT}/`);
    });
  } catch (error) {
    console.log(error);
  }
};

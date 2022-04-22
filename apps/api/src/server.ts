import 'dotenv/config';

import cors from 'cors';
import express, { Application } from 'express';
import mongoose from 'mongoose';

import { signup } from './utils/auth';

const { DATABASE, PORT } = process.env;

if (!DATABASE || !PORT) process.exit(1);

export const app: Application = express();

app.disable('x-powered-by');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', signup);

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

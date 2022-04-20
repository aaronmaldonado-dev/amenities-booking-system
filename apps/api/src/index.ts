import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';

const { NODE_ENV } = process.env;

dotenv.config({ path: `./.env.${NODE_ENV}` });
dotenv.config({ path: `./.env.local` });

const app: Application = express();

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

export default app;

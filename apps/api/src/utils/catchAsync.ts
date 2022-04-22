import { NextFunction, Request, Response } from 'express';

// eslint-disable-next-line @typescript-eslint/ban-types
export const catchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => res.status(422).send(err.message));
  };
};

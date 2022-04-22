import { Request, Response } from 'express';

import { User } from '../resources/user/user.model';
import { catchAsync } from './catchAsync';

export const signup = catchAsync(async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  return res.status(201).send({
    message: 'Success - User has been created',
    data: {
      user,
    },
  });
});

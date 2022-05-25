import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { AppError } from '../../utils/appError';
import { catchAsync } from '../../utils/catchAsync';
import { User } from '../user/user.model';

const signToken = (id: string) => {
  let token = '';

  if (process.env.JWT_SECRET) {
    token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  return token;
};

export const signup = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);

  if (token) {
    return res.status(201).send({
      message: 'Success - User has been created',
      token,
      data: {
        user: newUser,
      },
    });
  } else {
    return res.status(422).send({
      message: 'Error - Contact the system administrator',
    });
  }
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({
      message: 'Error - Please provide email and password',
    });
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.checkPassword(password))) {
    return res.status(401).send({
      message: 'Error - Incorrect Email or Password',
    });
  }

  const token = signToken(user?._id);

  return res.status(200).json({
    satus: 'success',
    token,
  });
});

export const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('Please log in to get access.', 401));
  }

  next();
});

import { NextFunction, Request, Response } from 'express';

import { AppError } from '../utils/appError';
import { catchAsync } from './catchAsync';

// These are generic CRUD methods and need
// to have model:any as they have to fit all
// kinds of models that can be passed as arguments.

// @ts-expect-error: model needs to fit all
export const deleteOne = (Model) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

// @ts-expect-error: model needs to fit all
export const updateOne = (Model) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      message: 'success - item has been updated',
      data: doc,
    });
  });

// @ts-expect-error: model needs to fit all
export const createOne = (Model) =>
  catchAsync(async (req: Request, res: Response) => {
    const doc = await Model.create(req.body);

    res.status(201).send({
      message: `success - item has been created`,
      data: doc,
    });
  });

// @ts-expect-error: model needs to fit all
export const getOne = (Model) =>
  catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const query = Model.findById(req.params.id);
    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: doc,
    });
  });

// @ts-expect-error: model needs to fit all
export const getAll = (Model) =>
  catchAsync(async (req: Request, res: Response) => {
    const doc = await Model.find();

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: doc,
    });
  });

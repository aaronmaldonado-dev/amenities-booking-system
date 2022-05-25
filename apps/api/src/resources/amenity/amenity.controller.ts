import { NextFunction, Request, Response } from 'express';

import { AppError } from '../../utils/appError';
import { catchAsync } from '../../utils/catchAsync';
import { deleteOne, getAll, getOne, updateOne } from '../../utils/handlerFactory';
import { Amenity } from '../amenity/amenity.model';
import { User } from '../user/user.model';

export const createOneAmenity = catchAsync(async (req: Request, res: Response) => {
  const amenity = await Amenity.create({
    name: req.body.name,
    maxUserSlots: req.body.maxUserSlots,
    capacity: req.body.capacity,
    timeSpan: req.body.timeSpan,
  });

  res.status(201).send({
    message: 'success - amenity has been created',
    data: amenity,
  });
});

export const assignUserSlot = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const amenityQuery = Amenity.findById(req.params.id);
  const userExists = User.exists({ _id: req.body.userId });

  const amenity = await amenityQuery;

  if (!amenity || !userExists) {
    return next(new AppError('No amenity or user found with provided ID', 404));
  }

  if (amenity.userSlots.length < amenity.maxUserSlots && !amenity.userSlots.includes(req.body.userId)) {
    amenity.userSlots.push(req.body.userId);
    amenity.markModified('userSlots');
    const savedAmenity = await amenity.save();

    return res.status(200).json({
      message: 'success - user slot asigned',
      data: savedAmenity,
    });
  }

  return next(new AppError('No assignation allowed', 405));
});

export const unassignUserSlot = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const amenityQuery = Amenity.findById(req.params.id);
  const amenity = await amenityQuery;

  if (!amenity) {
    return next(new AppError('No amenity or user found with provided ID', 404));
  }

  const userIndex = amenity.userSlots.indexOf(req.body.userId);

  if (userIndex >= 0) {
    amenity.userSlots.splice(userIndex, 1);
    amenity.markModified('userSlots');
    const savedAmenity = await amenity.save();

    return res.status(200).json({
      message: 'success - user slot unasigned',
      data: savedAmenity,
    });
  }

  return next(new AppError('No unassignation allowed', 405));
});

export const updateOneAmenity = updateOne(Amenity);
export const deleteOneAmenity = deleteOne(Amenity);
export const getAllAmenities = getAll(Amenity);
export const getOneAmenity = getOne(Amenity);

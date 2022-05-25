import { Router } from 'express';

import {
  assignUserSlot,
  createOneAmenity,
  deleteOneAmenity,
  getAllAmenities,
  getOneAmenity,
  unassignUserSlot,
  updateOneAmenity,
} from './amenity.controller';

export const router = Router();

router.get('/', getAllAmenities);
router.delete('/:id', deleteOneAmenity);
router.post('/create', createOneAmenity);

router.patch('/assignUserSlot/:id', assignUserSlot);
router.patch('/unassignUserSlot/:id', unassignUserSlot);

router.route('/:id').get(getOneAmenity).patch(updateOneAmenity);

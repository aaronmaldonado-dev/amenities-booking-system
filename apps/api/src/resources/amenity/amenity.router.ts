import { Router } from 'express';

import { protect } from '../auth/auth.controller';
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

router.route('/').get(protect, getAllAmenities);
router.route('/create').post(protect, createOneAmenity);
router.route('/assignUserSlot/:id').patch(protect, assignUserSlot);
router.route('/unassignUserSlot/:id').patch(protect, unassignUserSlot);
router.route('/:id').get(protect, getOneAmenity).patch(protect, updateOneAmenity).delete(protect, deleteOneAmenity);

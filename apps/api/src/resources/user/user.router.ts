import { Router } from 'express';

import { login, signup } from '../auth/auth.controller';
import { protect } from '../auth/auth.controller';
import { deleteOneUser, getAllUsers, getOneUser, updateOneUser } from './user.controller';

export const router = Router();

router.post('/login', login);
router.post('/signup', signup);

router.route('/').get(protect, getAllUsers);
router.route('/:id').get(protect, getOneUser).delete(protect, deleteOneUser).patch(protect, updateOneUser);

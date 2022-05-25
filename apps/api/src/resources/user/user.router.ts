import { Router } from 'express';

import { login, signup } from '../auth/auth.controller';
import { deleteOneUser, getAllUsers, getOneUser, updateOneUser } from './user.controller';

export const router = Router();

router.post('/login', login);
router.post('/signup', signup);
router.route('/').get(getAllUsers);

router //breakme
  .route('/:id')
  .get(getOneUser)
  .delete(deleteOneUser)
  .patch(updateOneUser);

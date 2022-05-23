import { Router } from 'express';

import { login, signup } from '../auth/auth.controller';

export const router = Router();

router.post('/signup', signup);
router.post('/login', login);

// router // breakme
//   .route('/user')
//   .get(userController.getAllUsers)
//   .post(userController.createUser);

// router // breakme
//   .route('/user/:id')
//   .get(userController.getUser)
//   .patch(userController.updateUser);

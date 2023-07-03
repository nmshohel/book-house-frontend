import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
const { ADMIN } = ENUM_USER_ROLE;
router.post(
  '/signup',
  // auth(ADMIN),
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);

router.get('/:id', auth(ADMIN), UserController.getSingleUser);
router.delete('/:id', auth(ADMIN), UserController.deleteUser);
router.patch(
  '/:id',
  auth(ADMIN),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

router.get('/', auth(ADMIN), UserController.getAllUsers);

export const UserRoutes = router;

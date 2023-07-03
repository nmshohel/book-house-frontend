import express from 'express';
// import { UserController } from './user.controller';
// import { UserValidation } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
// import { AdminValidation } from './admin.validation';
import { UserValidation } from '../user/user.validation';
import { UserController } from '../user/user.controller';
import { AuthValidation } from '../../auth/auth.validation';
import { AuthController } from '../../auth/auth.controller';

const router = express.Router();

router.post(
  '/create-admin',

  validateRequest(UserValidation.createUserZodSchema),
  UserController.createUser
);
router.post(
  '/login',
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

// router.get('/:id', AdminController.getSingleAdmin);
// router.delete('/:id', AdminController.deleteAdmin);
// router.patch(
//   '/:id',
//   validateRequest(AdminValidation.updateAdminZodSchema),
//   AdminController.updateAdmin
// );
// router.get('/', AdminController.getAllAdmins);

export const AdminRoutes = router;

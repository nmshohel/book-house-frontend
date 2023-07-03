import express from 'express';

import validateRequest from '../../middlewares/validateRequest';
import { CowController } from './cow.controller';
import { CowValidation } from './cow.validation';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();
const { ADMIN, SELLER, BUYER } = ENUM_USER_ROLE;
router.get('/:id', auth(ADMIN, SELLER, BUYER), CowController.getSingleCow);
router.delete('/:id', auth(SELLER), CowController.deleteCow);
router.patch(
  '/:id',
  auth(SELLER),
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

router.post(
  '/create-cow',
  auth(SELLER),
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);
router.get('/', CowController.getAllCows);
export const CowRoutes = router;

import express from 'express';

// import validateRequest from "../../middlewares/validateRequest";

import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();
const { BUYER, SELLER, ADMIN } = ENUM_USER_ROLE;
router.post('/', auth(BUYER), OrderController.createOrder);

router.get('/', auth(BUYER, SELLER, ADMIN), OrderController.getAllOrders);

export const OrderRoutes = router;

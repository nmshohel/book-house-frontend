import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { CowRoutes } from '../modules/cow/cow.route';
import { OrderRoutes } from '../modules/order/order.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { AuthRoutes } from '../auth/auth.route';
// import { AdminRoutes } from '../modules/admin/admin.route';

const router = express.Router();

const moduleRoute = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoute.forEach(route => router.use(route.path, route.route));
// router.use('/users/', UserRoutes);
// router.use('/academic-semisters', AcademicSemisterRoutes);

export default router;

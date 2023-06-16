import express from "express";
import { UserRoutes } from "../modules/user/user.route";

const router = express.Router();

const moduleRoute = [
  {
    path: "/auth",
    route: UserRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
// router.use('/users/', UserRoutes);
// router.use('/academic-semisters', AcademicSemisterRoutes);

export default router;

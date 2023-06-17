import express from "express";
import { UserRoutes } from "../modules/user/user.route";
import { CowRoutes } from "../modules/cow/cow.route";

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
  {
    path: "/cows",
    route: CowRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));
// router.use('/users/', UserRoutes);
// router.use('/academic-semisters', AcademicSemisterRoutes);

export default router;

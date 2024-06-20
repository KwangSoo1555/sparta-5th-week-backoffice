import express from "express";

import { authRouter } from "./auth.router.js";
import { reIssueAccessTokenRouter } from "./access-token-reissue.router.js";
import { usersRouter } from "./users.router.js";
import { customerStoresRouter } from "./customer-stores.router.js";
import { reviewsRouter } from "./reviews.router.js";
import { searchRouter } from "./search.router.js";
import { storesRouter } from "./stores.router.js";
import { menusRouter } from "./menus.router.js";
import { dibsRouter } from "./dibs.router.js";

import { prisma } from "../utils/prisma.util.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { requireRoles } from "../middlewares/require-roles.middleware.js";
import { USERS_CONSTANT } from "../constants/user.constant.js";

const apiRouter = express.Router();

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);

apiRouter.use("/auth", authRouter);
apiRouter.use("/refreshToken", reIssueAccessTokenRouter);
apiRouter.use("/users", requireAccessToken(authService), usersRouter);
apiRouter.use("/stores", requireAccessToken(authService), customerStoresRouter);
apiRouter.use("/reviews", requireAccessToken(authService), reviewsRouter);
apiRouter.use("/search", requireAccessToken(authService), searchRouter);
apiRouter.use(
  "/owners",
  requireAccessToken(authService),
  requireRoles([USERS_CONSTANT.ROLE.OWNER]),
  [storesRouter, menusRouter],
);
apiRouter.use("/dibs", dibsRouter);

export { apiRouter };

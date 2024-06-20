import express from "express";

import { authRouter } from "./auth.router.js";
import { usersRouter } from "./users.router.js";
import { reIssueAccessTokenRouter } from "./access-token-reissue.router.js";
import { storesRouter } from "./stores.router.js";
import { customerStoresRouter } from "./customer-stores.router.js";
import { menusRouter } from "./menus.router.js";
import { reviewsRouter } from "./reviews.router.js";
import { searchRouter } from "./search.router.js";
import { dibsRouter } from "./dibs.router.js";
import { passPortRouter } from "./passport.router.js"

import { prisma } from "../utils/prisma.util.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";

import { USERS_CONSTANT } from "../constants/user.constant.js";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { requireRefreshToken } from "../middlewares/require-refresh-token.middleware.js";
import { requireRoles } from "../middlewares/require-roles.middleware.js";
import { uploadImage } from "../middlewares/multer-image-upload.middleware.js";

const apiRouter = express.Router();

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", requireAccessToken(authService), uploadImage.single("img"), usersRouter);
apiRouter.use("/refreshToken", requireRefreshToken(authService), reIssueAccessTokenRouter);
apiRouter.use("/stores", requireAccessToken(authService), customerStoresRouter);
apiRouter.use("/reviews", requireAccessToken(authService), reviewsRouter);
apiRouter.use("/search", requireAccessToken(authService), searchRouter);
apiRouter.use("/owners", 
  requireAccessToken(authService), uploadImage.single('img'), requireRoles([USERS_CONSTANT.ROLE.OWNER]), 
  [storesRouter, menusRouter]
);
apiRouter.use("/dibs", requireAccessToken(authService), dibsRouter);
apiRouter.use("/passport", passPortRouter)

export { apiRouter };

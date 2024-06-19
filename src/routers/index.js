import express from "express";

import { authRouter } from "./auth.router.js";
import { reIssueAccessTokenRouter } from "./access-token-reissue.router.js";
import { usersRouter } from "./users.router.js";
import { customerStoresRouter } from "./customer-stores.router.js";
import { reviewsRouter } from "./reviews.router.js";
import { menusRouter } from "./menus.router.js";
import { dibsRouter }  from "./dibs.router.js";
import { storesRouter } from "./stores.router.js";
import { searchRouter } from "./search.router.js";

// import { prisma } from "../utils/prisma.util.js";
// import { UsersRepository } from "../repositories/users.repository.js";
// import { AuthService } from "../services/auth.service.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/refreshToken", reIssueAccessTokenRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/stores", customerStoresRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/search", searchRouter);
apiRouter.use("/owners", [storesRouter, menusRouter]);
apiRouter.use("/dibs", dibsRouter);

export { apiRouter };
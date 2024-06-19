import express from "express";

import { authRouter } from "./auth.router.js";
import { reIssueAccessTokenRouter } from "./access-token-reissue.router.js";
import { usersRouter } from "./users.router.js";
import { customerStoresRouter } from "./customer-stores.router.js";
import { reviewsRouter } from "./reviews.router.js";
import { menusRouter } from "./menus.router.js";
import { storesRouter } from "./stores.router.js";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/refreshToken", reIssueAccessTokenRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/stores", customerStoresRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/owners", [storesRouter, menusRouter]);

export { apiRouter };

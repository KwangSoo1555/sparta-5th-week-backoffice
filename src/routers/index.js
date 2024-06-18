import express from "express";
import { authRouter } from "./auth.router.js";
import { menusRouter } from "./menus.router.js";
import { storesRouter } from "./store.router.js";
import { resumesRouter } from "./resumes.router.js";
import { prisma } from "../utils/prisma.util.js";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";

const apiRouter = express.Router();

const usersRepository = new UsersRepository(prisma);

const authService = new AuthService(usersRepository);

apiRouter.use("/auth", authRouter);
apiRouter.use("/stores/:store_id", menusRouter);
apiRouter.use("/stores",storesRouter)
apiRouter.use("/resumes", requireAccessToken(authService), resumesRouter);

export { apiRouter };

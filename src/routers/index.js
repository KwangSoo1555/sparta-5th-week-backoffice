import express from "express";
import { prisma } from "../utils/prisma.util.js";
import { authRouter } from "./auth.router.js";
import { usersRouter } from "./users.router.js";
import { menusRouter } from "./menus.router.js";
import { storesRouter } from "./store.router.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";

const apiRouter = express.Router();

const usersRepository = new UsersRepository(prisma);

const authService = new AuthService(usersRepository);

apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/stores/:store_id", menusRouter);
apiRouter.use("/stores", storesRouter);

export { apiRouter };

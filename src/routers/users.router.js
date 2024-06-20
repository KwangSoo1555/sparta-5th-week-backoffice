import express from "express";

import { prisma } from "../utils/prisma.util.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { UsersService } from "../services/users.service.js";
import { UsersController } from "../controllers/users.controller.js";

// import { AuthService } from "../services/auth.service.js";
// import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";

const usersRouter = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

// const authService = new AuthService(usersRepository);

// 내 정보 조회 API api/users/me
usersRouter.get("/me", usersController.getUserInfo);

// 내 정보 수정 API api/users/me
usersRouter.patch("/me", usersController.updateUserInfo);

// 내 정보 권한 수정 API api/users/me
usersRouter.patch("/me/toOwner", usersController.updateUserPermission);

export { usersRouter };

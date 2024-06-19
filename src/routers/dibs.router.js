import express from "express";

import { DibsRepository } from "../repositories/dibs.repository.js";
import { DibsService } from "../services/dibs.service.js";
import { DibsController } from "../controllers/dibs.controller.js";

import { prisma } from "../utils/prisma.util.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";

import { requireRoles } from "../middlewares/require-roles.middleware.js";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";

import { USERS_CONSTANT } from "../constants/user.constant.js";

const dibsRouter = express.Router();

const dibsRepository = new DibsRepository();
const dibsService = new DibsService(dibsRepository);
const dibsController = new DibsController(dibsService);

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);

// 찜 생성
dibsRouter.post("/:store_id/dibs", requireAccessToken(authService), requireRoles([USERS_CONSTANT.ROLE.OWNER]), dibsController.createDibs);

// 찜 삭제
dibsRouter.delete("/:store_id/dibs", requireAccessToken(authService), dibsController.deleteDibs);

// 찜한 가게 목록 조회
dibsRouter.get("/user/dibs", requireAccessToken(authService), dibsController.getUserDibs);

// 이번 주 찜이 가장 많은 가게 조회
dibsRouter.get("/top-dibs", requireAccessToken(authService), dibsController.getTopDibs);

export {dibsRouter};

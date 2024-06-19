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

import { StoresService } from "../services/stores.service.js";
import { StoresRepository } from "../repositories/stores.repository.js";

const dibsRouter = express.Router();

const storesRepository = new StoresRepository(prisma);
const storesService = new StoresService(storesRepository);

const dibsRepository = new DibsRepository(prisma);
const dibsService = new DibsService(dibsRepository,storesService);
const dibsController = new DibsController(dibsService);

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);

// 찜 생성
dibsRouter.post("/:store_id", requireAccessToken(authService), dibsController.createDibs);

// 찜 삭제
dibsRouter.delete("/:store_id", requireAccessToken(authService), dibsController.deleteDibs);

// 찜한 가게 목록 조회
dibsRouter.get("/user", requireAccessToken(authService), dibsController.getUserDibs);

// 이번 주 찜이 가장 많은 가게 조회
dibsRouter.get("/top", requireAccessToken(authService), dibsController.getTopDibs);

export {dibsRouter};

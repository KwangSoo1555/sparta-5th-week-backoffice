import express from "express";

import { prisma } from "../utils/prisma.util.js";
import { OrdersRepository } from "../repositories/orders.respository.js";

import { UsersRepository } from "../repositories/users.repository.js";
import { UsersService } from "../services/users.service.js";
import { UsersController } from "../controllers/users.controller.js";

const usersRouter = express.Router();

const ordersRepository = new OrdersRepository(prisma);

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository, ordersRepository);
const usersController = new UsersController(usersService);

// 내 정보 조회 API api/users/me
usersRouter.get("/me", usersController.getUserInfo);

// 내 정보 수정 API api/users/me
usersRouter.patch("/me", usersController.updateUserInfo);

// 내 정보 권한 수정 API api/users/me
usersRouter.patch("/me/to_owner", usersController.updateUserPermission);

// 주문 내역 조회 API
usersRouter.get("/me/orders", usersController.getOrdersInfo);

export { usersRouter };

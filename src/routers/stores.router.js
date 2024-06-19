import express from "express";
import { validateCreateStore } from "../middlewares/validators/create-store-validator.middleware.js";
import { validateUpdateStore } from "../middlewares/validators/updated-store-validator.middleware.js"
import { prisma } from "../utils/prisma.util.js";
import { OrdersRepository } from "../repositories/orders.respository.js";
import { StoresRepository } from "../repositories/stores.repository.js";
import { StoresService } from "../services/stores.service.js";
import { StoresController } from "../controllers/stores.controller.js";

const storesRouter = express.Router();

const ordersRepository = new OrdersRepository(prisma);
const storesRepository = new StoresRepository(prisma);
const storesService = new StoresService(storesRepository, ordersRepository);
const storesController = new StoresController(storesService);

// 주문 상태 수정
storesRouter.patch("/orders/:order_id", storesController.updateOrderStatus);

// 가게 생성
storesRouter.post("/stores", validateCreateStore, storesController.createStore);

// 가게 상세 조회
storesRouter.get("/stores/:store_id", storesController.findStoreById);

// 가게 수정
storesRouter.patch(
  "/stores/:store_id",
  validateUpdateStore,
  storesController.updateStore,
);

// 가게 삭제
storesRouter.delete("/stores/:store_id", storesController.deleteStore);

export { storesRouter };

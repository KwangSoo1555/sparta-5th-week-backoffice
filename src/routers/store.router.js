import express from "express";
import { createStoreValidator } from "../middlewares/validators/create-store-validator.middleware.js";
import { updateStoreValidator } from "../middlewares/validators/updated-store-validator.middleware.js";
import { prisma } from "../utils/prisma.util.js";
import { StoreRepository } from "../repositories/stores.repository.js";
import { StoreService } from "../services/stores.service.js";
import { StoreController } from "../controllers/stores.controller.js";
import { reviewsRouter } from "./resumes.router.js";

const storesRouter = express.Router();

const storeRepository = new StoreRepository(prisma);
const storeService = new StoreService(storeRepository);
const storeController = new StoreController(storeService);

// 가게 생성
storeRouter.post("/stores", createStoreValidator, storeController.createStore);

// 가게 상세 조회
storeRouter.get("/stores/:store_id", storeController.getStoreById);

// 가게 수정
storeRouter.put(
  "/stores/:store_id",
  updateStoreValidator,
  storesController.updateStore,
);

// 가게 삭제
storeRouter.delete("/stores/:store_id", storeController.deleteStore);

export { storesRouter };

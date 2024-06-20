import express from "express";

import { prisma } from "../utils/prisma.util.js";
import { StoresRepository } from "../repositories/stores.repository.js";

import { DibsRepository } from "../repositories/dibs.repository.js";
import { DibsService } from "../services/dibs.service.js";
import { DibsController } from "../controllers/dibs.controller.js";

const dibsRouter = express.Router();

const storesRepository = new StoresRepository(prisma);

const dibsRepository = new DibsRepository(prisma);
const dibsService = new DibsService(dibsRepository, storesRepository);
const dibsController = new DibsController(dibsService);

// 찜 생성
dibsRouter.post("/:store_id", dibsController.createDibs);

// 찜 삭제
dibsRouter.delete("/:store_id", dibsController.deleteDibs);

// 찜한 가게 목록 조회
dibsRouter.get("/user", dibsController.getUserDibs);

// 이번 주 찜이 가장 많은 가게 조회
dibsRouter.get("/top", dibsController.getTopDibs);

export {dibsRouter};

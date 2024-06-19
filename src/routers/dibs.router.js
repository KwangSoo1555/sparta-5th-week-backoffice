import express from "express";
import { requireDetailRoles } from "../middlewares/require-roles.middleware.js";
import requireAccessToken from "../middlewares/require-access-token.middleware.js";
import { DibsRepository } from "../repositories/dibs.repository.js";
import { DibsService } from "../services/dibs.service.js";
import { DibsController } from "../controllers/dibs.controller.js";

const router = express.Router();
const dibsRepository = new DibsRepository();
const dibsService = new DibsService(dibsRepository);
const dibsController = new DibsController(dibsService);

// 찜 생성
router.post("/:store_id/dibs", requireAccessToken, requireDetailRoles, dibsController.createDibs);

// 찜 삭제
router.delete("/:store_id/dibs", requireAccessToken, dibsController.deleteDibs);

// 찜한 가게 목록 조회
router.get("/user/dibs", requireAccessToken, dibsController.getUserDibs);

// 이번 주 찜이 가장 많은 가게 조회
router.get("/top-dibs", requireAccessToken, dibsController.getTopDibs);

export default router;

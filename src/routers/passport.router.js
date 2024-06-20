import express from "express";

import { prisma } from "../utils/prisma.util.js";

import { PassPortRepository } from "../repositories/passport.repository.js";
import { PassPortService } from "../services/passport.service.js";
import { PassPortController } from "../controllers/passport.controllers.js";

const passPortRouter = express.Router();

const passPortRepository = new PassPortRepository(prisma);
const passPortService = new PassPortService(passPortRepository);
const passPortController = new PassPortController(passPortService);

passPortRouter.get("/naver_login", passPortController.naverLogin);
passPortRouter.get("/naver/oauth", passPortController.naverCallback);

passPortRouter.get("/fail", passPortController.fail);

export { passPortRouter };

import express from "express";

import { prisma } from "../utils/prisma.util.js";

import { RefreshTokenRepository } from "../repositories/access-token-reissue.repository.js";
import { RefreshTokenService } from "../services/access-token-reissue.service.js";
import { RefreshTokenController } from "../controllers/access-token-reissue.controller.js";

const reIssueAccessTokenRouter = express.Router();

const refreshTokenRepository = new RefreshTokenRepository(prisma);
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
const refreshTokenController = new RefreshTokenController(refreshTokenService);

// 토큰 재발급 API
reIssueAccessTokenRouter.post("/", refreshTokenController.reIssueAccessTokenByRefreshToken);

export { reIssueAccessTokenRouter };

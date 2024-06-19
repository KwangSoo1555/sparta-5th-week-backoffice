import express from "express";

import { prisma } from "../utils/prisma.util.js";
import { RefreshTokenRepository } from "../repositories/access-token-reissue.repository.js";
import { RefreshTokenService } from "../services/access-token-reissue.service.js";
import { RefreshTokenController } from "../controllers/access-token-reissue.controller.js";
import { requireRefreshToken } from "../middlewares/require-refresh-token.middleware.js";
import { AuthService } from "../services/auth.service.js";
import { UsersRepository } from "../repositories/users.repository.js";

const reIssueAccessTokenRouter = express.Router();

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);

const refreshTokenRepository = new RefreshTokenRepository(prisma);
const refreshTokenService = new RefreshTokenService(refreshTokenRepository);
const refreshTokenController = new RefreshTokenController(refreshTokenService);

reIssueAccessTokenRouter.post("/", requireRefreshToken(authService), refreshTokenController.reIssueAccessTokenByRefreshToken);

export { reIssueAccessTokenRouter };

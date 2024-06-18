import express from "express";
import { signUpValidator } from "../middlewares/validators/sign-up-validator.middleware.js";
import { signInValidator } from "../middlewares/validators/sign-in-validator.middleware.js";
import { prisma } from "../utils/prisma.util.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";
import { AuthController } from "../controllers/auth.controller.js";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";

const authRouter = express.Router();

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);
const authController = new AuthController(authService);

// 이메일 인증 API /api/auth/auth-email
authRouter.post("/verify_emil", authController.sendAuthEmail);

// 회원가입 API /api/auth/sign-up
authRouter.post("/sign_up", signUpValidator, authController.signUp);

// 로그인 API /api/auth/sign-in
authRouter.post("/sign_in", signInValidator, authController.signIn);

// 로그아웃 API 
authRouter.post("/sign_out", requireAccessToken(authService), authController.signOut)

export { authRouter };

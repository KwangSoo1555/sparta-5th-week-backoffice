import express from "express";
import { authRouter } from "./auth.router.js";
import { reIssueRefreshTokenRouter } from "./refresh-token-reissue.router.js";
import { usersRouter } from "./users.router.js";
import { customerStoresRouter } from "./customer-stores.router.js";
import { reviewsRouter } from "./reviews.router.js";
import { menusRouter } from "./menus.router.js";
import { storesRouter } from "./stores.router.js";
import { dibsRouter } from  "./dibs.router.js";
import { prisma } from "../utils/prisma.util.js";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";

const apiRouter = express.Router();

// requireAccessToken에 의존성 주입
// UsersRepository 인스턴스 생성
const usersRepository = new UsersRepository(prisma);
// AuthService 인스턴스 생성
const authService = new AuthService(usersRepository);

apiRouter.use("/auth", authRouter);
apiRouter.use("/refreshToken", reIssueRefreshTokenRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/stores", customerStoresRouter); //아직 미구현 삭제 금지, 손님 가게 api
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/owners", [storesRouter, menusRouter]);
apiRouter.use("/dibs", dibsRouter);

export { apiRouter };

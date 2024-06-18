import express from "express";
<<<<<<< HEAD
import { authRouter } from "./auth.router.js";
import { usersRouter } from "./users.router.js";
import { resumesRouter } from "./resumes.router.js";
import { prisma } from "../utils/prisma.util.js";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";

const apiRouter = express.Router();
=======
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { prisma } from "../utils/prisma.util.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";
import { UsersController } from "../controllers/users.controller.js";

const usersRouter = express.Router();
// 이놈은 controller계층에서 끝나서 authService나 그런거 입력 안받아도됨
const usersController = new UsersController();
>>>>>>> d8f1a807d14d407f93fe7760bade4a28335e3a28

// requireAccessToken에 의존성 주입
// UsersRepository 인스턴스 생성
const usersRepository = new UsersRepository(prisma);
// AuthService 인스턴스 생성
const authService = new AuthService(usersRepository);

<<<<<<< HEAD
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/resumes", requireAccessToken(authService), resumesRouter);

export { apiRouter };
=======
usersRouter.get(
  "/me",
  requireAccessToken(authService),
  usersController.getUserInfo,
);

export { usersRouter };
>>>>>>> d8f1a807d14d407f93fe7760bade4a28335e3a28

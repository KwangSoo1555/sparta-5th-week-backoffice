import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";
import { prisma } from "../utils/prisma.util.js";

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);

export const requireAccessToken = async (socket, next) => {
  try {
    const authorization = socket.handshake.headers.authorization;

    if (!authorization) {
      return next(new Error(MESSAGES.AUTH.COMMON.JWT.NO_TOKEN));
    }

    const [type, accessToken] = authorization.split(" ");

    if (type !== "Bearer") {
      return next(new Error(MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE));
    }

    if (!accessToken) {
      return next(new Error(MESSAGES.AUTH.COMMON.JWT.NO_TOKEN));
    }

    try {
      const user = await authService.verifyAccessToken(accessToken);
      user.password = undefined;
      console.log(user+"-------------");
      socket.user = user;
      socket.accessToken = accessToken;
      next();
    } catch (error) {
      return next(new Error(error.message));
    }
  } catch (error) {
    next(new Error(error.message));
  }
};
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export const requireRefreshToken = (authService) => {
  return async (req, res, next) => {
    try {
      // 인증 정보 파싱
      const authorization = req.headers.authorization;

      // Authorization이 없는 경우
      if (!authorization) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
        });
      }

      // JWT 표준 인증 형태와 일치하지 않는 경우
      const [type, refreshToken] = authorization.split(" ");

      if (type !== "Bearer") {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE,
        });
      }

      // refreshToken이 없는 경우
      if (!refreshToken) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
        });
      }

      try {
        // refreshToken보내면 service에서 사용자 정보 줌.
        const user = await authService.verifyRefreshToken(refreshToken);
        req.user = user;
        req.refreshToken = refreshToken;
        
        next();
      } catch (error) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: error.message,
        });
      }
    } catch (error) {
      next(error);
    }
  };
};

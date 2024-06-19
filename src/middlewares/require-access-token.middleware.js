import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export const requireAccessToken = (authService) => {
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
      const [type, accessToken] = authorization.split(" ");

      if (type !== "Bearer") {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NOT_SUPPORTED_TYPE,
        });
      }

      // AccessToken이 없는 경우
      if (!accessToken) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.NO_TOKEN,
        });
      }

      try {
        // AccessToken보내면 service에서 사용자 정보 줌.
        const user = await authService.verifyAccessToken(accessToken);
        req.user = user;
        req.accessToken = accessToken;
        
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

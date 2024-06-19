import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class RefreshTokenController {
  constructor(refreshTokenService) {
    this.refreshTokenService = refreshTokenService;
  }

  reIssueAccessTokenByRefreshToken = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const refreshToken = req.refreshToken;

      const reIssueToken = await this.refreshTokenService.reIssueAccessTokenByRefreshToken(
          userId,
          refreshToken,
          req.ip,
          req.get("User-Agent"),
        );

      return res.status(HTTP_STATUS.OK).json({ data: reIssueToken });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.EXPIRED
        });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.COMMON.JWT.INVALID
        });
      } else {
        next(error);
      }
    }
  };
}

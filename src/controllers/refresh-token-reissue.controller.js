import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { AUTH_CONSTANT } from "../constants/auth.constant.js";

export class RefreshTokenController {
  constructor(refreshTokenService) {
    this.refreshTokenService = refreshTokenService;
  }

  reIssueRefreshToken = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const refreshToken = req.headers.refreshToken;

      const reIssueRefreshToken = await this.refreshTokenService.reIssueRefreshToken(
          userId,
          refreshToken,
          req.ip,
          req.get("User-Agent"),
        );

      return res.status(HTTP_STATUS.OK).json({ data: reIssueRefreshToken });
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ error: "Refresh token has expired." });
      } else {
        return res
          .status(HTTP_STATUS.UNAUTHORIZED)
          .json({ error: "Invalid refresh token." });
      }
    }
  };
}

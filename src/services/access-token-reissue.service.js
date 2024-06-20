import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ENV } from "../constants/env.constant.js";
import { AUTH_CONSTANT } from "../constants/auth.constant.js";
import { HttpError } from "../errors/http.error.js";
import { MESSAGES } from "../constants/message.constant.js";

export class RefreshTokenService {
  constructor(refreshTokenRepository) {
    this.refreshTokenRepository = refreshTokenRepository;
  }

  reIssueAccessTokenByRefreshToken = async (userId, refreshToken, ip, userAgent) => {
    const checkRefreshToken = await this.refreshTokenRepository.checkRefreshToken({ userId });

    const match = bcrypt.compareSync(refreshToken, checkRefreshToken.refreshToken);

    if (!match) {
      throw new HttpError.Forbidden(MESSAGES.AUTH.COMMON.JWT.INVALID);
    }

    // 그 사용자 id를 payload로 해서 token 발급
    const payload = { id: userId };

    const reIssueAccessToken = jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
      expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN,
    });

    const reIssueRefreshToken = jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
      expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN,
    });

    const hashedReIssueRefreshToken = bcrypt.hashSync(reIssueRefreshToken, AUTH_CONSTANT.HASH_SALT_ROUNDS);

    // 변수명 없이 refresh token 이 생성되는 즉시 repository 로 전달
    await this.refreshTokenRepository.reIssueAccessTokenByRefreshToken(
      userId,
      hashedReIssueRefreshToken,
      ip,
      userAgent,
    );

    return { reIssueAccessToken, reIssueRefreshToken };
  };
}

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { ENV } from "../constants/env.constant.js";
import { AUTH_CONSTANT } from "../constants/auth.constant.js";
import { HttpError } from "../errors/http.error.js";
import { MESSAGES } from "../constants/message.constant.js";

export class AuthService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  signUp = async (email, password, name, phone, address) => {
    // 이메일이 중복 됐는지 체크
    const existedUserByEmail = await this.usersRepository.checkAuthUser({ email });
    if (existedUserByEmail)
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);

    // 이름이 중복 됐는지 체크
    const existedUserByName = await this.usersRepository.checkAuthUser({name});
    if (existedUserByName)
      throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.NAME.DUPLICATED);

    // 비밀번호 뭉게기
    const hashedPassword = bcrypt.hashSync(
      password,
      AUTH_CONSTANT.HASH_SALT_ROUNDS,
    );

    // 저장소에게 사용자 저장을 요청
    const signUpUser = await this.usersRepository.createUser(
      email,
      hashedPassword,
      name,
      phone,
      address,
    );

    // 저장된 사용자 정보를 수정해서 리턴
    signUpUser.password = undefined;

    return signUpUser;
  };

  signIn = async (email, password, ip, userAgent) => {
    // 이메일과 비밀번호로 맞나 체크
    const user = await this.usersRepository.checkAuthUser({ email });
    const userId = user.userId;

    const isPasswordMatched =
      user && bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched)
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.UNAUTHORIZED);

    // 그 사용자 id를 payload로 해서 token 발급
    const payload = { id: userId };

    const accessToken = jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
      expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN,
    });

    const refreshToken = jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
      expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN,
    });

    const hashedRefreshToken = bcrypt.hashSync(
      refreshToken,
      AUTH_CONSTANT.HASH_SALT_ROUNDS,
    );

    // 변수명 없이 refresh token 이 생성되는 즉시 repository 로 전달
    await this.usersRepository.storeRefreshToken(
      userId,
      hashedRefreshToken,
      ip,
      userAgent,
    );

    return { accessToken, refreshToken };
  };

  signOut = async (userId) => {
    const user =
      await this.usersRepository.BySignOutUpdateRefreshTokenToNull(
        userId
      );

    return user;
  };

  // accessToken받고 payload로 user정보 받음.
  verifyAccessToken = async (accessToken) => {
    try {
      // token받고 payload로 사용자 체크
      const payload = jwt.verify(accessToken, ENV.ACCESS_TOKEN_SECRET);
      const userId = payload.id;

      const user = await this.usersRepository.checkAuthUser({ userId });

      if (!user) {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NO_USER);
      }

      return user;
    } catch (error) {
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.EXPIRED);
    }
  };

  // refreshToken받고 payload로 user정보 받음.
  verifyRefreshToken = async (refreshToken) => {
    try {
      // token받고 payload로 사용자 체크
      const payload = jwt.verify(refreshToken, ENV.REFRESH_TOKEN_SECRET);
      const userId = payload.id;

      const user = await this.usersRepository.checkAuthUser({ userId });

      if (!user) {
        throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.NO_USER);
      }

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.JWT.EXPIRED);
    }
  };
}

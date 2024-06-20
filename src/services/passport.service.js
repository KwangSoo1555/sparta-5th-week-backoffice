import jwt from "jsonwebtoken";

import { ENV } from "../constants/env.constant.js";
import { AUTH_CONSTANT } from "../constants/auth.constant.js";
import { USERS_CONSTANT } from "../constants/user.constant.js";

export class PassPortService {
  constructor(passPortRepository) {
    this.passPortRepository = passPortRepository;
  }

  findUserById = async (id) => {
    return this.passPortRepository.findUserById(id);
  };

  findOrCreateUser = async (profile) => {
    console.log('Profile:', profile);
    let user = await this.passPortRepository.findUserBySocialId(profile.id);
    console.log('User found:', user);
    if (!user) {
      user = await this.passPortRepository.createUser({
        email: profile._json.email,
        name: profile.displayName,
        socialId: profile.id,
        provider: USERS_CONSTANT.PROVIDER.NAVER,
      });
      console.log('User created:', user)
    }
    return user;
  };

  jwt = async (payload) => {
    return {
      accessToken: jwt.sign(payload, ENV.ACCESS_TOKEN_SECRET, {
        expiresIn: AUTH_CONSTANT.ACCESS_TOKEN_EXPIRES_IN,
      }),
      refreshToken: jwt.sign(payload, ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: AUTH_CONSTANT.REFRESH_TOKEN_EXPIRES_IN,
      }),
    };
  };
}

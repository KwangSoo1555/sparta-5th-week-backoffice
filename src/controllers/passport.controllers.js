import passport from "passport";

import { Strategy as NaverStrategy } from "passport-naver";

import { ENV } from "../constants/env.constant.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
import { AUTH_CONSTANT } from "../constants/auth.constant.js";

export class PassPortController {
  constructor(passPortService) {
    this.passPortService = passPortService;
    this.setUpPassPort();
  }

  setUpPassPort() {
    passport.use(
      new NaverStrategy(
        {
          clientID: ENV.NAVER_CLIENT_ID,
          clientSecret: ENV.NAVER_CLIENT_SECRET,
          callbackURL: ENV.NAVER_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
          try {
            console.log('Profile received:', profile);
            let user = await this.passPortService.findOrCreateUser(profile);
            console.log('User after findOrCreateUser:', user);
            return done(null, user);
          } catch (error) {
            console.error('Error in NaverStrategy:', error);
            return done(error);
          }
        },
      ),
    );

    passport.serializeUser((user, done) => {
      console.log('Serialize user:', user);
      done(null, user.userId);
    });

    passport.deserializeUser(async (userId, done) => {
      try {
        const user = await this.passPortService.findUserById(userId);
        console.log('Deserialize user:', user);
        done(null, user);
      } catch (error) {
        done(error);
      }
    });
  }

  naverLogin = (req, res, next) => {
    passport.authenticate(AUTH_CONSTANT.PASSPORT.NAVER.NAME)(req, res, next);
  };

  naverCallback = (req, res, next) => {
    passport.authenticate(AUTH_CONSTANT.PASSPORT.NAVER.NAME, {
      failureRedirect: AUTH_CONSTANT.PASSPORT.COMMON.FAILURE_REDIRECT,
    })
    (req, res, async () => {
      console.log('req.user:', req.user)

      if (!req.user || !req.user.id) {
        console.error('Authentication failed: req.user is null');
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          status: HTTP_STATUS.UNAUTHORIZED,
          message: MESSAGES.AUTH.PASSPORT.COMMON.FAIL,
        });
      }

      const user = req.user;
      console.log('User after authentication:', user);
      
      const payload = { id: user.id };
      console.log('Payload:', payload);
      const data = await this.passPortService.jwt(payload);

      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.PASSPORT.NAVER.SUCCEED,
        data: data,
      });
    });
  };

  fail = (req, res) => {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: HTTP_STATUS.UNAUTHORIZED,
      message: MESSAGES.AUTH.PASSPORT.COMMON.FAIL,
    });
  };
}

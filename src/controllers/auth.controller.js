import nodemailer from "nodemailer";

import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
import { AUTH_CONSTANT } from "../constants/auth.constant.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  // 이메일 인증 controller
  static smtpTransport = nodemailer.createTransport({
    pool: true,
    maxConnections: process.env.MAIL_MAX_CONNECTION,
    service: process.env.MAIL_SERVICE,
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  sendAuthEmail = async (req, res, next) => {
    try {
      const { email } = req.body;
      const verificationCode = EmailVerification.codeIssue();
      const timestamp = Date.now();

      if (!email) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
          status: HTTP_STATUS.BAD_REQUEST,
          message: MESSAGES.AUTH.COMMON.EMAIL.REQUIRED,
        });
      }

      EmailVerification.codes[email] = {
        code: verificationCode,
        timestamp,
      };

      // 여기서도 메일 옵션 util 에서 관리 (html은 상수가 아니기 때문)
      // 다른 방법 mailOptions 를 그냥 함수로 만들어 보기
      const mailOptions = {
        from: AUTH_CONSTANT.AUTH_EMAIL.FROM,
        to: email,
        subject: AUTH_CONSTANT.AUTH_EMAIL.SUBJECT,
        html: `
        <h1>${AUTH_CONSTANT.AUTH_EMAIL.HTML}</h1>
        <p>${verificationCode}</p>
        `,
      };

      AuthController.smtpTransport.sendMail(mailOptions);

      console.log(EmailVerification.codes[email].code);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_UP.EMAIL.SUCCEED,
        data: EmailVerification.codes,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: MESSAGES.AUTH.SIGN_UP.EMAIL.FAIL,
      });
      next(error);
    }
  };

  // 회원가입 API /api/auth/sign-up
  signUp = async (req, res, next) => {
    try {
      const { email, name, password, phone, address, verificationCode } =
        req.body;

      const latestVerification = EmailVerification.codes[email];

      // 이메일 인증 유효성 검사
      if (!latestVerification || latestVerification.code !== verificationCode) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: MESSAGES.AUTH.SIGN_UP.VERIFICATION_CODE.INCONSISTENT,
        });
      }

      if (EmailVerification.isExpired(latestVerification.timestamp)) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
          message: MESSAGES.AUTH.SIGN_UP.VERIFICATION_CODE.EXPIRED,
        });
      }

      const signUpUser = await this.authService.signUp(
        email,
        password,
        name,
        phone,
        address,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data: signUpUser,
      });
    } catch (error) {
      next(error);
    }
  };

  // 로그인 API /api/auth/sign-in
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const issueToken = await this.authService.signIn(
        email,
        password,
        req.ip,
        req.get("User-Agent"),
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: issueToken,
      });
    } catch (error) {
      next(error);
    }
  };

  // 로그아웃 API /api/auth/sign-out
  signOut = async (req, res, next) => {
    try {
      const userId = req.user.userId;

      const signOutUser = await this.authService.signOut(userId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_OUT.SUCCEED,
        data: {
          tokenId: signOutUser.tokenId,
          userId: signOutUser.userId,
          refreshToken: signOutUser.refreshToken,
          ip: signOutUser.ip,
          userAgent: signOutUser.userAgent,
        },
      });
    } catch (error) {
      next(error);
    }
  };
}

// 이메일 인증 관련
class EmailVerification {
  static codeNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static codeIssue() {
    return EmailVerification.codeNumber(111111, 999999);
  }

  static expirationTime = 5 * 60 * 1000; // 5분 뒤 코드 인증 만료

  static isExpired(timestamp) {
    return Date.now() > timestamp + EmailVerification.expirationTime;
  }

  static codes = {};
}

import nodemailer from "nodemailer";

import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  // 회원가입 API controller
  signUp = async (req, res, next) => {
    try {
      const { email, password, name } = req.body;

      const signUpUser = await this.authService.signUp(email, password, name);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        signUpUser,
      });
    } catch (error) {
      next(error);
    }
  };

  // 로그인 API /api/auth/sign-in
  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const accessToken = await this.authService.signIn(email, password);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_IN.SUCCEED,
        data: { accessToken },
      });
    } catch (error) {
      next(error);
    }
  };

  // 이메일 인증 controller
  smtpTransport = nodemailer.createTransport({
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
      const verificationCode = EmailVerificationUtil.codeIssue();
      const timestamp = Date.now();

      EmailVerificationUtil.codes[email] = {
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

      // 메일 보내는 로직은 await 빼기
      smtpTransport.sendMail(mailOptions);

      console.log(EmailVerificationUtil.codes[email].code);

      res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.AUTH.SIGN_UP.SUCCEED,
        data: EmailVerificationUtil.codes,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        message: MESSAGES.AUTH.SIGN_UP.FAIL,
      });
      next(error);
    }
  };
}

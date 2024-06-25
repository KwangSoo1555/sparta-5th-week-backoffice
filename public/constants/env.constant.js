import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  // 서버 포트
  FRONT_PORT: process.env.FRONT_PORT,
  SERVER_PORT: process.env.SERVER_PORT,
};

import "dotenv/config";

export const ENV = {
  SERVER_PORT: process.env.SERVER_PORT,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET,
};

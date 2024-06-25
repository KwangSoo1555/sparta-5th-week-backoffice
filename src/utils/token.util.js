import jwt from "jsonwebtoken";
import { ENV } from "../constants/env.constant.js";

export function isValidToken(token) {
  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

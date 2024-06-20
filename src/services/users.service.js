import bcrypt from "bcrypt";

import { AUTH_CONSTANT } from "../constants/auth.constant.js";
import { HttpError } from "../errors/http.error.js";
import { MESSAGES } from "../constants/message.constant.js";

export class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  updateUserInfo = async (userId, email, name, currentPassword, newPassword, phone, address) => {
    const existedUser = await this.usersRepository.checkAuthUser({ userId });

    if (newPassword) {
      if (!currentPassword)
        throw new HttpError.BadRequest(MESSAGES.AUTH.COMMON.PASSWORD.REQURIED);

      const match = bcrypt.compare(currentPassword, existedUser.password);

      if (!match)
        throw new HttpError.Unauthorized(MESSAGES.AUTH.COMMON.CURRENT_PASSWORD.NOT_MACHTED_WITH_PASSWORD);

      if (newPassword === currentPassword)
        throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.NEW_PASSWORD.NEW_PASSWORD_EQUAL_CURRENT_PASSWORD);

      existedUser.password = bcrypt.hashSync(newPassword, AUTH_CONSTANT.HASH_SALT_ROUNDS);
    }

    if (email) {
      if (email === existedUser.email)
        throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.EMAIL.DUPLICATED);
    }

    if (name) {
      if (name === existedUser.name)
        throw new HttpError.Conflict(MESSAGES.AUTH.COMMON.NAME.DUPLICATED);
    }

    const updatedUser = await this.usersRepository.updateUserInfo(
      userId,
      email,
      name,
      existedUser.password, 
      newPassword, 
      phone,
      address,
    );

    updatedUser.newPassword = undefined;

    return updatedUser;
  };
}

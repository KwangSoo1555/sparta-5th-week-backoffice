import bcrypt from "bcrypt";

import { AUTH_CONSTANT } from "../constants/auth.constant.js";
import { HttpError } from "../errors/http.error.js";
import { MESSAGES } from "../constants/message.constant.js";

export class UsersService {
  constructor(usersRepository, ordersRepository) {
    this.usersRepository = usersRepository;
    this.ordersRepository = ordersRepository;
  }

  updateUserInfo = async (userId, email, name, imgUrl, currentPassword, newPassword, phone, address) => {
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
      imgUrl, 
      existedUser.password, 
      newPassword, 
      phone,
      address,
    );

    updatedUser.newPassword = undefined;

    return updatedUser;
  };

  updateUserPermission = async (userId) => {
    const existedUser = await this.usersRepository.checkAuthUser({ userId });
    if (!existedUser)
      throw new HttpError.NotFound(MESSAGES.USERS.COMMON.NOT_FOUND);

    const updatedUser = await this.usersRepository.updateUserPermission(
      userId,
    );

    updatedUser.password = undefined;

    return updatedUser;
  };

  getOrdersInfo = async (userId) => {
    const order = await this.ordersRepository.getOrdersOnUser(userId)

    return order;
  }
}

import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  getUserInfo = async (req, res, next) => {
    try {
      const data = req.user;

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.READ_ME.SUCCEED,
        data: { data },
      });
    } catch (error) {
      next(error);
    }
  };

  updateUserInfo = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      let imgUrl = req.file?.location;

      imgUrl = imgUrl === undefined ? null : imgUrl;

      const { email, name, currentPassword, newPassword, phone, address } = req.body;

      const updatedUserInfo = await this.usersService.updateUserInfo(
        userId,
        email,
        name,
        imgUrl,
        currentPassword,
        newPassword,
        phone,
        address,
      );

      updatedUserInfo.password = undefined;
      updatedUserInfo.newPassword = undefined;

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.UPDATE_ME.SUCCEED,
        data: { updatedUserInfo },
      });
    } catch (error) {
      next(error);
    }
  };

  updateUserPermission = async (req, res, next) => {
    try {
      const userId = req.user.userId;

      const updatedUserInfo = await this.usersService.updateUserPermission(
        userId,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.USERS.UPDATE_ME.SUCCEED,
        data: updatedUserInfo,
      });
    } catch (error) {
      next(error);
    }
  };
}

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
        data: {
          id: data.id,
          email: data.email,
          name: data.name,
          phone: data.phone,
          address: data.address,
          point: data.point,
          grade: data.grade,
          role: data.role,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
        },
      });
    } catch (error) {
      next(error);
    }
  };

  updateUserInfo = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const { email, name, currentPassword, newPassword, phone, address } = req.body;

      const updatedUserInfo = await this.usersService.updateUserInfo(
        userId,
        email,
        name,
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
        data: {
          userId: updatedUserInfo.userId, 
          email: updatedUserInfo.email, 
          name: updatedUserInfo.name, 
          phone: updatedUserInfo.phone, 
          address: updatedUserInfo.address, 
          updatedAt: updatedUserInfo.updatedAt, 
        },
      });
    } catch (error) {
      next(error);
    }
  };

  updateUserPermission = async (req, res, next) => {
    try {
      const userId = req.user.userId;

      const updatedUserInfo = await this.usersService.updateUserInfo(
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

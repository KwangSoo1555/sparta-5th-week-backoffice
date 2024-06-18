import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class MenusController {
  constructor(menusService) {
    this.menusService = menusService;
  }

  getMenus = async (req, res, next) => {
    try {
      const storeId = req.params.store_Id;
      const menus = await this.menusService.getMenus(storeId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.MENUS.READ_LIST.SUCCEED,
        data: menus,
      });
    } catch (error) {
      next(error);
    }
  };

  getMenuDetail = async (req, res, next) => {
    try {
      const storeId = req.params.store_Id;
      const menuId = req.params.menu_id;

      const menu = await this.menusService.getMenuDetail(storeId, menuId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.MENUS.READ_DETAIL.SUCCEED,
        data: menu,
      });
    } catch (error) {
      next(error);
    }
  };

  postMenus = async (req, res, next) => {
    try {
      const storeId = req.params.store_Id;

      const { name, price, imgUrl, popularity } = req.body;

      const menus = await this.menusService.postMenus(
        storeId,
        name,
        price,
        imgUrl,
        popularity,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.MENUS.CREATE.SUCCEED,
        data: menus,
      });
    } catch (error) {
      next(error);
    }
  };

  patchMenus = async (req, res, next) => {
    try {
      const storeId = req.params.store_Id;
      const menuId = req.params.menu_Id;

      const { name, price, imgUrl, popularity, status } = req.body;

      const menus = await this.menusService.patchMenus(
        storeId,
        menuId,
        name,
        price,
        imgUrl,
        popularity,
        status,
      );

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.MENUS.UPDATE.SUCCEED,
        data: menus,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteMenus = async (req, res, next) => {
    try {
      const storeId = req.params.store_Id;
      const menuId = req.params.menu_Id;

      const menus = await this.menusService.deleteMenus(storeId, menuId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.MENUS.DELETE.SUCCEED,
        data: menus,
      });
    } catch (error) {
      next(error);
    }
  };
}

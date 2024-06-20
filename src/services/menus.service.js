import { HttpError } from "../errors/http.error.js";
import { MESSAGES } from "../constants/message.constant.js";

export class MenusService {
  constructor(menusRepository) {
    this.menusRepository = menusRepository;
  }

  getMenus = async (storeId) => {
    const menus = await this.menusRepository.getMenus(storeId);

    return menus.map((menu) => {
      return {
        menuId: menu.menuId,
        storeId: menu.storeId,
        name: menu.name,
        price: menu.price,
        imgUrl: menu.imgUrl,
        popularity: menu.popularity,
        status: menu.status,
        createdAt: menu.createdAt,
        updatedAt: menu.updatedAt,
      };
    });
  };

  getMenuDetail = async (storeId, menuId) => {
    const menu = await this.menusRepository.getMenuDetail(storeId, menuId);
    if (!menu) throw new HttpError.NotFound(MESSAGES.MENUS.COMMON.NOT_FOUND);

    return menu;
  };

  postMenus = async (storeId, name, price, imgUrl, popularity) => {
    const menu = await this.menusRepository.postMenus(
      storeId,
      name,
      price,
      imgUrl,
      popularity,
    );

    if (!menu)
      throw new HttpError.InternalServerError(MESSAGES.MENUS.CREATE.FAILED);

    const data = {
      menuId: menu.menuId,
      storeId: menu.storeId,
      name: menu.name,
      price: menu.price,
      imgUrl: menu.imgUrl,
      popularity: menu.popularity,
      status: menu.status,
      createdAt: menu.createdAt,
      updatedAt: menu.updatedAt,
    };

    return data;
  };

  patchMenus = async (
    storeId,
    menuId,
    name,
    price,
    imgUrl,
    popularity,
    status,
  ) => {
    const existedMenu = await this.menusRepository.getMenuDetail(
      storeId,
      menuId,
    );

    if (!existedMenu)
      throw new HttpError.NotFound(MESSAGES.MENUS.COMMON.NOT_FOUND);

    const updatedMenu = await this.menusRepository.patchMenus(
      storeId,
      menuId,
      name,
      price,
      imgUrl,
      popularity,
      status,
    );

    return updatedMenu;
  };

  deleteMenus = async (storeId, menuId) => {
    let existedMenu = await this.menusRepository.getMenuDetail(storeId, menuId);

    if (!existedMenu)
      throw new HttpError.NotFound(MESSAGES.MENUS.COMMON.NOT_FOUND);

    const deletedMenu = await this.menusRepository.deleteMenus(storeId, menuId);

    return deletedMenu;
  };
}

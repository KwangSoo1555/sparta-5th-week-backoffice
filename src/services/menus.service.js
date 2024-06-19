import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class MenusService {
  constructor(menusRepository) {
    this.menusRepository = menusRepository;
  }

  getMenu = async (storeId) => {
    const menus = await this.menusRepository.getMenu(storeId);

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

  postMenus = async (id, authorId) => {
    const menu = await this.menusRepository.postMenus(
      storeId,
      name,
      price,
      imgUrl,
      popularity,
    );

    if (!menu) throw new HttpError.NotFound(MESSAGES.MENUS.COMMON.NOT_FOUND);

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

    const deletedMenu = await this.resumesRepository.deleteMenus(
      storeId,
      menuId,
    );

    return deletedMenu;
  };
}

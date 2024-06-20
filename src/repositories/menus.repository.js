export class MenusRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  getMenus = async (storeId) => {
    const findMenus = await this.prisma.menus.findMany({
      where: { storeId: +storeId },
      orderBy: {
        price: "asc",
      },
    });

    return findMenus;
  };

  getMenuDetail = async (storeId, menuId) => {
    const menu = await this.prisma.menus.findUnique({
      where: { storeId: +storeId, menuId: +menuId },
    });

    return menu;
  };

  postMenus = async (storeId, name, price, imgUrl, popularity) => {
    const createdMenu = await this.prisma.menus.create({
      data: {
        storeId: +storeId,
        name,
        price,
        imgUrl,
        popularity,
      },
    });

    return createdMenu;
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
    const updatedMenu = await this.prisma.menus.update({
      where: { storeId: +storeId, menuId: +menuId },
      data: {
        name,
        price,
        imgUrl,
        popularity,
        status,
      },
    });

    return updatedMenu;
  };

  deleteMenus = async (storeId, menuId) => {
    const deletedMenu = await this.prisma.menus.delete({
      where: { storeId: +storeId, menuId: +menuId },
    });

    return deletedMenu;
  };
}

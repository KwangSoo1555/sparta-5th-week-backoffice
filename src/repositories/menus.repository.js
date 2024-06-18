export class MenusRepository {
    constructor(prisma) {
      this.prisma = prisma;
    }
  
  
    getMenus = async (storeId) => {
      const findMenus = await this.prisma.menus.findMany({
        where: { storeId },
        orderBy: {
          price: sort,
        },
      });
  
      return findMenus;
    };

    getMenuDetail = async (storeId, menuId) => {
      const menu = await this.prisma.menus.findUnique({
        where: { storeId,
                 menuId,
         },
      });
  
      return menu;
    };

  

    patchMenus = async (storeId, menuId, name, price, imgUrl, popularity, status) => {
      const updatedMenu = await this.prisma.menu.update({
        where: { storeId, menuId },
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
      const deletedMenu = await this.prisma.menu.findUnique({
        where: { storeId, 
                 menuId,
         },
      });
  
      return deletedMenu;
    };
  }
  
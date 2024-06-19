import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";
import { OrdersRepository } from "../repositories/orders.respository.js";
import { StoresRepository } from "../repositories/stores.repository.js";
import { MenusRepository } from "../repositories/menus.repository.js";

export class CustomerStoresService {
  ordersRepository = new OrdersRepository();
  storesRepository = new StoresRepository();
  menusRepository = new MenusRepository();
  // 고객 가게 정보 조회
  getStoreInfo = async () => {};

  // 주문하기
  createOrder = async ({
    storeId,
    userId,
    paymentMethod,
    requests,
    orderItems,
  }) => {
    // Promise 객체들의 배열 ㄴㄴ, Promise.all로 결과값들이 담김 배열
    const orderItemsWithPrice = await Promise.all(
      orderItems.map(async (item) => {
        const menu = await this.menusRepository.getMenuDetail(
          storeId,
          item.menuId,
        );

        if (!menu) throw new HttpError(MESSAGES.MENUS.COMMON.NOT_FOUND);

        return {
          menuId: item.menuId,
          quantity: item.quantity,
          price: menu.price,
        };
      }),
    );

    const order = await this.ordersRepository.createOrder({
      storeId,
      userId,
      paymentMethod,
      requests,
      orderItemsWithPrice,
    });

    return order;
  };
}

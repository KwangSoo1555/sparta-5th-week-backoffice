import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class CustomerStoresService {
  constructor(ordersRepository, storesRepository, menusRepository) {
    this.ordersRepository = ordersRepository;
    this.storesRepository = storesRepository;
    this.menusRepository = menusRepository;
  }

  // 고객 가게 정보 조회
  getStoreInfo = async (storeId) => {
    console.log("service:  ", storeId);
    const storeInfo = await this.storesRepository.findStoreById(storeId);

    if (!storeInfo)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

    const data = {
      name: storeInfo.name,
      category: storeInfo.category,
      address: storeInfo.address,
      storePictureUrl: storeInfo.storePictureUrl,
      phone: storeInfo.phone,
      content: storeInfo.content,
      dibsCount: storeInfo.dibsCount,
      reviewCount: storeInfo.reviewCount,
      status: storeInfo.status,
      rating: storeInfo.rating,
    };
    return data;
  };

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

        if (!menu)
          throw new HttpError.NotFound(MESSAGES.MENUS.COMMON.NOT_FOUND);

        return {
          menuId: item.menuId,
          quantity: item.quantity,
          price: menu.price,
        };
      }),
    );
    // 주문 생성
    const createdOrder = await this.ordersRepository.createdOrder({
      storeId,
      userId,
      paymentMethod,
      requests,
      orderItemsWithPrice,
    });

    // const createdOrderId = createdOrder.orderId;
    // console.log(createdOrderId);
    // // 주문 상세 조회
    // const order = await this.ordersRepository.getOrderDetail({
    //   createdOrderId,
    // });

    return createdOrder;
  };
}

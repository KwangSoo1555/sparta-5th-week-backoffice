import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class CustomerStoresService {
  constructor(
    ordersRepository,
    storesRepository,
    menusRepository,
    usersRepository,
  ) {
    this.ordersRepository = ordersRepository;
    this.storesRepository = storesRepository;
    this.menusRepository = menusRepository;
    this.usersRepository = usersRepository;
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
    // Promise 객체들의 배열, Promise.all로 결과값들이 담김 배열
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
    // 고객의 point가 총액total_price보다 많은지 체크
    // 총 주문 금액 계산
    const totalPrice = orderItemsWithPrice.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    const userPoint = await this.usersRepository.getUserPoint(userId);

    if (userPoint < totalPrice)
      throw new HttpError.BadRequest(MESSAGES.USERS.POINT.NOT_ENOUGH_POINT);

    // 주문 생성
    const createdOrder = await this.ordersRepository.createdOrder({
      storeId,
      userId,
      paymentMethod,
      requests,
      orderItemsWithPrice,
    });

    // 사용자 포인트 변경
    await this.usersRepository.updateUserPoint(userId, userPoint - totalPrice);

    // const createdOrderId = createdOrder.orderId;
    // console.log(createdOrderId);
    // // 주문 상세 조회
    // const order = await this.ordersRepository.getOrderDetail({
    //   createdOrderId,
    // });

    return createdOrder;
  };
}

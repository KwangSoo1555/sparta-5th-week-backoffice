import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";
import { ORDER_STATUS } from "../constants/order-status.constant.js";
export class StoresService {
  constructor(storesRepository, ordersRepository) {
    this.storesRepository = storesRepository;
    this.ordersRepository = ordersRepository;
  }

  createStore = async (
    userId,
    name,
    category,
    address,
    storePictureUrl,
    phone,
    content,
  ) => {
    const createdStore = await this.storesRepository.createStore(
      userId,
      name,
      category,
      address,
      storePictureUrl,
      phone,
      content,
    );

    return createdStore;
  };

  findStoreById = async (storeId) => {
    const store = await this.storesRepository.findStoreById(storeId);

    if (!store) throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

    const data = {
      name: store.name,
      category: store.category,
      address: store.address,
      storePictureUrl: store.storePictureUrl,
      phone: store.phone,
      content: store.content,
      dibsCount: store.dibsCount,
      reviewCount: store.reviewCount,
      createdAt: store.createdAt,
      updatedAt: store.updatedAt,
      status: store.status,
      rating: store.rating,
    };
    return data;
  };

  updateStore = async (
    userId,
    storeId,
    name,
    category,
    address,
    storePictureUrl,
    phone,
    content,
  ) => {
    const existedStore = await this.storesRepository.findStoreById(storeId);
    if (!existedStore)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

    const ownerCheck = await this.storesRepository.findStoreByUserId(
      storeId,
      userId,
    );
    if (!ownerCheck)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.OWNER_NOT_FOUND);

    const updatedStore = await this.storesRepository.updateStore(
      storeId,
      name,
      category,
      address,
      storePictureUrl,
      phone,
      content,
    );

    return updatedStore;
  };

  deleteStore = async (storeId) => {
    let existedStore = await this.storesRepository.findStoreById(
      storeId,
      userId,
    );

    if (!existedStore)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

    const ownerCheck = await this.storesRepository.findStoreByUserId(
      storeId,
      userId,
    );
    if (!ownerCheck)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.OWNER_NOT_FOUND);

    const deletedStore = await this.storesRepository.deleteStore(storeId);

    return deletedStore;
  };

  updateOrderStatus = async ({ userId, orderId, status }) => {
    const isValidOrderStatus = Object.values(ORDER_STATUS).includes(status);

    // 주문 상태가 유효한지 확인
    if (!isValidOrderStatus)
      throw new HttpError.BadRequest(MESSAGES.ORDERS.UPDATE.INVALID_STATUS);

    const existedOrder = await this.ordersRepository.getOrderDetail({
      orderId,
    });

    // 주문이 존재하는지 확인
    if (!existedOrder)
      throw new HttpError.NotFound(MESSAGES.ORDERS.COMMON.NOT_FOUND);

    // 완성 상태이면사장한테 돈주기
    if (status === ORDER_STATUS.COMPLETE) {
      // 주문 정보로 totalPrice
      const totalPrice = existedOrder.totalPrice;

      // 트랜잭션 걸린 주문 상태변경을 실행하고
      const updatedOrder = await this.ordersRepository.updateCompletedOrder({
        orderId,
        status,
        userId,
        totalPrice,
      });

      return updatedOrder;
    } else {
      // 완성 상태 변경하기
      const updatedOrder = await this.ordersRepository.updateOrder({
        orderId,
        status,
      });
      return updatedOrder;
    }
  };
}

import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";
import { Order_Status } from "../constants/order-status.constant.js";
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

  // 사장님 주문 목록 조회
  getOrders = async (userId) => {
    const store = await this.storesRepository.findStoreByUserId2(userId);

    if (!store)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.OWNER_NOT_FOUND);

    const storeId = store.storeId;

    const orders = await this.ordersRepository.getOrders({ storeId });

    return orders;
  };

  // 사장님 주문 상태 변경
  updateOrderStatus = async ({ userId, orderId, status }) => {
    const isValidOrderStatus = Object.values(Order_Status).includes(status);

    if (!isValidOrderStatus)
      throw new HttpError.BadRequest(MESSAGES.ORDERS.UPDATE.INVALID_STATUS);

    const existedOrder = await this.ordersRepository.getOrderDetail({
      orderId,
    });

    if (!existedOrder)
      throw new HttpError.NotFound(MESSAGES.ORDERS.COMMON.NOT_FOUND);

    if (status === Order_Status.COMPLETE) {
      const totalPrice = existedOrder.totalPrice;

      const updatedOrder = await this.ordersRepository.updateCompletedOrder({
        orderId,
        status,
        userId,
        totalPrice,
      });
      
      return updatedOrder;
    } else {
      const updatedOrder = await this.ordersRepository.updateOrder({
        orderId,
        status,
      });
      return updatedOrder;
    }
  };

  findStoreByUserId = async (userId) => {
    const store = await this.storesRepository.findStoreByUserId2(userId);

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
}

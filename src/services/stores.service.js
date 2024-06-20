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
    dibsCount,
    reviewCount,
    status,
    rating,
  ) => {
    const createdStore = await this.storesRepository.createStore(
      userId,
      name,
      category,
      address,
      storePictureUrl,
      phone,
      content,
      dibsCount,
      reviewCount,
      status,
      rating,
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
    dibsCount,
    reviewCount,
    status,
    rating,
  ) => {
    const existedStore = await this.storesRepository.findStoreById(storeId);
    if (!existedStore)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

    const ownerCheck = await this.storesRepository.findStoreByUserId(storeId,userId);
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
      dibsCount,
      reviewCount,
      status,
      rating,
    );

    return updatedStore;
  };

  deleteStore = async (storeId) => {
    let existedStore = await this.storesRepository.findStoreById(storeId,userId);

    if (!existedStore)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

    const ownerCheck = await this.storesRepository.findStoreByUserId(storeId,userId);
    if (!ownerCheck)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.OWNER_NOT_FOUND);

    const deletedStore = await this.storesRepository.deleteStore(storeId);

    return deletedStore;
  };

  updateOrderStatus = async ({ orderId, status }) => {
    const isValidOrderStatus = Object.values(Order_Status).includes(status);

    if (!isValidOrderStatus)
      throw new HttpError.BadRequest(MESSAGES.ORDERS.UPDATE.INVALID_STATUS);

    const ExistedOrder = await this.ordersRepository.getOrderDetail({
      orderId,
    });

    if (!ExistedOrder)
      throw new HttpError.NotFound(MESSAGES.ORDERS.COMMON.NOT_FOUND);

    const updatedOrder = await this.ordersRepository.updateOrder({
      orderId,
      status,
    });

    return updatedOrder;
  };
}

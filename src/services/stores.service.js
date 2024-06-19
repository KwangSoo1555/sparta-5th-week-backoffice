import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class StoresService {
  constructor(storesRepository) {
    this.storesRepository = storesRepository;
  }

  createStore = async (
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
    let existedStore = await this.storesRepository.findStoreById(storeId);

    if (!existedStore)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

    const deletedStore = await this.storesRepository.deleteStore(storeId);

    return deletedStore;
  };
}

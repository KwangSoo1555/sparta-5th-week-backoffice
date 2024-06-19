import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class StoresService {
    constructor(storesRepository) {
      this.storesRepository = storesRepository;
    }
  
    createStore = async (name, category, address, storePictureUrl, phone, content, dibsCount, reviewCount, status, rating) => {
        const createdStore = await this.StoresRepository.createStore(
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
    }
  
  
    findStoreById = async (id) => {
        const Store = await this.storesRepository.findStoreById(id,storeId);
      
      if (!Store)
        throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

      const data ={
        name: Store.name,
        category: Store.category,
        address: Store.address,
        storePictureUrl: Store.storePictureUrl,
        phone: Store.phone,
        content: Store.content,
        dibsCount: Store.dibsCount,
        reviewCount: Store.reviewCount,
        createdAt: Store.createdAt,
        updatedAt: Store.updatedAt,
        status: Store.status,
        rating: Store.rating
      }
      return data;
    }
  
    updateStore =async (name, category, address, storePictureUrl, phone, content, dibsCount, reviewCount, status, rating) => {
        const existedStore = await this.storesRepository.findStoreById(
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
        rating
      );
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
        rating
      );
  
      return updatedStore;
    };
      deleteStore = async (id) => {
        let existedStore = await this.storesRepository.findStoreById( id);
    
        if (!existedStore)
          throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);
    
        const deletedStore = await this.storesRepository.deleteStore(id);
    
        return deletedStore;
      };
  }
  
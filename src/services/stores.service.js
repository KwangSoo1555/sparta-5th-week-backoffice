import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class StoresService {
    constructor(storesRepository) {
      this.storesRepository = storesRepository;
    }
  
    createStore = async (storeId,name, category, address, storePictureUrl, phone, content, dibsCount, reviewCount, createdDate, updatedDate, status, rating) => {
        const createdStore = await this.StoresRepository.createStore(
          storeId,
          name,
          category,
          address,
          storePictureUrl,
          phone,
          content,
          dibsCount,
          reviewCount,
          createdDate,
          updatedDate,
          status,
          rating,
      );

      return createdStore;
    }
  
  
    findStoreById = async (storeid) => {
        const Store = await this.StoresRepository.findStoreById(id,storeid);
      
      if (!Store)
        throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

      const data ={
        storeId : Store.storeId,
        name: Store.name,
        category: Store.category,
        address: Store.address,
        storePictureUrl: Store.storePictureUrl,
        phone: Store.phone,
        content: Store.content,
        dibsCount: Store.dibsCount,
        reviewCount: Store.reviewCount,
        createdDate: Store.createdDate,
        updatedDate: Store.updatedDate,
        status: Store.status,
        rating: Store.rating
      }
      return createdStore;
    }
  
    updateStore =async (storeId, name, category, address, storePictureUrl, phone, content, dibsCount, reviewCount, createdDate, updatedDate, status, rating) => {
        const existedStore = await this.StoreRepository.findStoreById(
          storeId,
        name,
        category,
        address,
        storePictureUrl,
        phone,
        content,
        dibsCount,
        reviewCount,
        createdDate,
        updatedDate,
        status,
        rating
      );
      if (!existedStore)
        throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);
  
      const updatedStore = await this.StoresRepository.updateStore(
        storeId,
        name,
        category,
        address,
        store_picture_url,
        phone,
        content,
        dibsCount,
        reviewCount,
        createdDate,
        updatedDate,
        status,
        rating
      );
  
      return updatedStore;
    };
      deleteStore = async (id, storeId) => {
        let existedStore = await this.StoresRepository.findStoreById(
          id,
          storeId,
        );
    
        if (!existedStore)
          throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);
    
        const deletedStore = await this.StoresRepository.deleteStore(
          id,
          storeid,
        );
    
        return deletedStore;
      };
  }
  
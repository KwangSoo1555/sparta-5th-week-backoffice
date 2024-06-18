import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class StoresService {
    constructor(storesRepository) {
      this.storesRepository = storesRepository;
    }
  
    createStore = async (name, category, address, store_picture_url, phone, content, dibs_count, review_count, created_date, updated_date, status, rating) => {
        const createdStore = await this.StoresRepository.createStore(
        name,
        category,
        address,
        store_picture_url,
        phone,
        content,
        dibs_count,
        review_count,
        created_date,
        updated_date,
        status,
        rating
      );

      return createdStore;
    }
  
  
    findStoreById = async (id, name) => {
        const Store = await this.StoresRepository.findStoreById(id,name);
      
      if (!Store)
        throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

      const data ={
        name: Store.name,
        category: Store.category,
        address: Store.address,
        store_picture_url: Store.store_picture_url,
        phone: Store.phone,
        content: Store.content,
        dibs_count: Store.dibs_count,
        review_count: Store.review_count,
        created_date: Store.created_date,
        updated_date: Store.updated_date,
        status: Store.status,
        rating: Store.rating
      }
      return createdStore;
    }
  
    updateStore =async (id, name, category, address, store_picture_url, phone, content, dibs_count, review_count, created_date, updated_date, status, rating) => {
        const existedStore = await this.StoreRepository.findStoreById(
        id,
        name,
        category,
        address,
        store_picture_url,
        phone,
        content,
        dibs_count,
        review_count,
        created_date,
        updated_date,
        status,
        rating
      );
      if (!existedStore)
        throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);
  
      const updatedStore = await this.StoresRepository.updateStore(
        id,
        name,
        category,
        address,
        store_picture_url,
        phone,
        content,
        dibs_count,
        review_count,
        created_date,
        updated_date,
        status,
        rating
      );
  
      return updatedStore;
    };
      deleteStore = async (id, name) => {
        let existedStore = await this.StoresRepository.findStoreById(
          id,
          authorId,
        );
    
        if (!existedStore)
          throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);
    
        const deletedStore = await this.StoresRepository.deleteStore(
          id,
          authorId,
        );
    
        return deletedStore;
      };
  }
  
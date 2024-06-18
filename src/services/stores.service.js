import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class StoresService {
    constructor(storesRepository) {
      this.storesRepository = storesRepository;
    }
  
    createStore = async (store_id,name, category, address, store_picture_url, phone, content, dibs_count, review_count, created_date, updated_date, status, rating) => {
        const createdStore = await this.StoresRepository.createStore(
        store_id,
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
  
  
    findStoreById = async (id, store_id) => {
        const Store = await this.StoresRepository.findStoreById(id,store_id);
      
      if (!Store)
        throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

      const data ={
        store_id : Store.store_id,
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
  
    updateStore =async (store_id, name, category, address, store_picture_url, phone, content, dibs_count, review_count, created_date, updated_date, status, rating) => {
        const existedStore = await this.StoreRepository.findStoreById(
          store_id,
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
        store_id,
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
      deleteStore = async (id, store_id) => {
        let existedStore = await this.StoresRepository.findStoreById(
          id,
          store_id,
        );
    
        if (!existedStore)
          throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);
    
        const deletedStore = await this.StoresRepository.deleteStore(
          id,
          store_id,
        );
    
        return deletedStore;
      };
  }
  
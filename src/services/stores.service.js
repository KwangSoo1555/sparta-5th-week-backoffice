import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class StoresService {
    constructor(storesRepository) {
      this.storesRepository = storesRepository;
    }
  
    createStore = async (storeid,name, category, address, store_picture_url, phone, content, dibs_count, review_count, created_date, updated_date, status, rating) => {
        const createdStore = await this.StoresRepository.createStore(
        storeid,
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
  
  
    findStoreById = async (storeid) => {
        const Store = await this.StoresRepository.findStoreById(id,storeid);
      
      if (!Store)
        throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);

      const data ={
        storeid : Store.storeid,
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
  
    updateStore =async (storeid, name, category, address, store_picture_url, phone, content, dibs_count, review_count, created_date, updated_date, status, rating) => {
        const existedStore = await this.StoreRepository.findStoreById(
          storeid,
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
        storeid,
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
      deleteStore = async (id, storeid) => {
        let existedStore = await this.StoresRepository.findStoreById(
          id,
          storeid,
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
  
import { HttpError } from "../errors/http.error.js";
import { MESSAGES } from "../constants/message.constant.js";

export class SearchService {
  constructor(searchRepository) {
    this.searchRepository = searchRepository;
  }

  getRegionSearch = async (regionName) => {
    const searches = await this.searchRepository.getRegionSearch(regionName);

    if (!searches) throw new HttpError.NotFound(MESSAGES.SEARCH.COMMON.NOT_FOUND);

    return searches.map((search) => {
      return {
        storeId: search.storeId,
        name: search.name,
        address: search.address,
        imgUrl: search.store_picture_url,
        phone: search.phone,
        createdAt: search.createdAt,
        updatedAt: search.updatedAt,
      };
    });
  };

  getStoreSearch = async (storeName) => {
    const searches = await this.searchRepository.getStoreSearch(storeName);
    if (!searches) throw new HttpError.NotFound(MESSAGES.SEARCH.COMMON.NOT_FOUND);

    return searches.map((search) => {
        return {
          storeId: search.storeId,
          name: search.name,
          address: search.address,
          imgUrl: search.store_picture_url,
          phone: search.phone,
          createdAt: search.createdAt,
          updatedAt: search.updatedAt,
        };
      });
  };

  getKeywordSearch = async (keyword) => {
    const searches = await this.searchRepository.getKeywordSearch(keyword);
    if (!searches) throw new HttpError.NotFound(MESSAGES.SEARCH.COMMON.NOT_FOUND);

    return searches.map((search) => {
        return {
          storeId: search.storeId,
          name: search.name,
          address: search.address,
          imgUrl: search.store_picture_url,
          phone: search.phone,
          createdAt: search.createdAt,
          updatedAt: search.updatedAt,
        };
      });
  };

  getKeywordSearchOrderedbyRate = async (keyword) => {
    const searches = await this.searchRepository.getKeywordSearchOrderedbyRate(keyword);
    if (!searches) throw new HttpError.NotFound(MESSAGES.SEARCH.COMMON.NOT_FOUND);

    return searches.map((search) => {
        return {
          storeId: search.storeId,
          name: search.name,
          address: search.address,
          imgUrl: search.store_picture_url,
          phone: search.phone,
          createdAt: search.createdAt,
          updatedAt: search.updatedAt,
        };
      });
  };
  
}

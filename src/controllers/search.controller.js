import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class SearchController {
  constructor(searchService) {
    this.searchService = searchService;
  }

  getRegionSearch = async (req, res, next) => {
    try {
      const regionName = req.params.region_name;
      const searches = await this.searchService.getRegionSearch(regionName);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.SEARCH.COMMON.SUCCEED,
        data: searches,
      });
    } catch (error) {
      next(error);
    }
  };

  getStoreSearch = async (req, res, next) => {
    try {
      const storeName = req.params.store_name;

      const searches = await this.searchService.getStoreSearch(storeName);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.SEARCH.COMMON.SUCCEED,
        data: searches,
      });
    } catch (error) {
      next(error);
    }
  };

  getKeywordSearch = async (req, res, next) => {
    try {
      const keyword = req.params;

      const searches = await this.searchService.getKeywordSearch(keyword);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.SEARCH.COMMON.SUCCEED,
        data: searches,
      });
    } catch (error) {
      next(error);
    }
  };

  getKeywordSearchOrderedbyRate = async (req, res, next) => {
    try {
      const keyword = req.params;

      const searches = await this.searchService.getKeywordSearchOrderedbyRate(keyword);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.SEARCH.COMMON.SUCCEED,
        data: searches,
      });
    } catch (error) {
      next(error);
    }
  };

}

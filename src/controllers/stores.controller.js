import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class StoresController {
  constructor(storesService) {
    this.storesService = storesService;
  }

  //가게 생성
  createStore = async (req, res, next) => {
    try {
      const {
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
      } = req.body;

      const createdStore = await this.storesService.createStore(
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

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.STORES.COMMON.CREATE.SUCCEED,
        createdStore,
      });
    } catch (error) {
      next(error);
    }
  };

  //가게 상세조회
  findStoreById = async (req, res, next) => {
    try {
      const storeId = req.params.store_id;
      const store = await this.storesService.findStoreById(storeId);
      if (store) {
        res.status(HTTP_STATUS.OK).json({
          status: HTTP_STATUS.OK,
          message: MESSAGES.STORES.COMMON.READ_DETAIL,
          data: store,
        });
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({
          status: HTTP_STATUS.NOT_FOUND,
          message: MESSAGES.STORES.COMMON.NOT_FOUND,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  // 가게 수정
  updateStore = async (req, res, next) => {
    try {
      const storeId = req.params.store_id;

      const {
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
      } = req.body;

      const updatedStore = await this.storesService.updateStore(
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

      return res.status(HTTP_STATUS.UPDATED).json({
        status: HTTP_STATUS.UPDATED,
        message: MESSAGES.STORES.COMMON.UPDATE.SUCCEED,
        data: updatedStore,
      });
    } catch (error) {
      next(error);
    }
  };

  // 가게 삭제
  deleteStore = async (req, res) => {
    try {
      const storeId = req.params.store_id;
      await this.storesService.deleteStore(storeId);
      return res.status(HTTP_STATUS.DELETED).json({
        status: HTTP_STATUS.DELETED,
        message: MESSAGES.STORES.COMMON.DELETE,
      });
    } catch (error) {
      next(error);
    }
  };
}

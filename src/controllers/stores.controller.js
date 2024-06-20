import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class StoresController {
  constructor(storesService) {
    this.storesService = storesService;
  }

  // 가게 생성
  createStore = async (req, res, next) => {
    try {
      const userId = req.user.userId;

      const { name, category, address, storePictureUrl, phone, content } =
        req.body;

      const createdStore = await this.storesService.createStore(
        userId,
        name,
        category,
        address,
        storePictureUrl,
        phone,
        content,
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

  // 가게 상세조회
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
      const userId = req.user.userId;

      const { name, category, address, storePictureUrl, phone, content } =
        req.body;

      const updatedStore = await this.storesService.updateStore(
        userId,
        storeId,
        name,
        category,
        address,
        storePictureUrl,
        phone,
        content,
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
  deleteStore = async (req, res, next) => {
    try {
      const storeId = req.params.store_id;
      const userId = req.user.userId;
      await this.storesService.deleteStore(storeId, userId);
      return res.status(HTTP_STATUS.DELETED).json({
        status: HTTP_STATUS.DELETED,
        message: MESSAGES.STORES.COMMON.DELETE,
      });
    } catch (error) {
      next(error);
    }
  };

  // 주문 목록 조회
  getOrders = async (req, res, next) => {
    try {
      const user = req.user;
      const userId = user.userId;

      const orders = await this.storesService.getOrders(userId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.ORDERS.READ_LIST,
        data: orders,
      });
    } catch (error) {
      next(error);
    }
  };

  // 주문 상태 수정
  updateOrderStatus = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const orderId = req.params.order_id;
      const { status } = req.body;

      const updatedOrder = await this.storesService.updateOrderStatus({
        userId,
        orderId,
        status,
      });

      return res.status(HTTP_STATUS.UPDATED).json({
        status: HTTP_STATUS.UPDATED,
        message: MESSAGES.ORDERS.UPDATE.SUCCEED,
        data: updatedOrder,
      });
    } catch (error) {
      next(error);
    }
  };
}

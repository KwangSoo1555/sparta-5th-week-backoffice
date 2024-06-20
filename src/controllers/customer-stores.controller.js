import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class CustomerStoresController {
  constructor(customerStoresService) {
    this.customerStoresService = customerStoresService;
  }

  // 고객 가게 정보 조회
  getStoreInfo = async (req, res, next) => {
    try {
      const storeId = req.params.store_id;

      const store = await this.customerStoresService.getStoreInfo(storeId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.STORES.COMMON.READ_DETAIL.SUCCEED,
        data: store,
      });
    } catch (error) {
      next(error);
    }
  };

  // 주문하기
  createOrder = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const storeId = req.params.store_id;
      const { paymentMethod, requests, orderItems } = req.body;

      const createdOrder = await this.customerStoresService.createOrder({
        storeId,
        userId,
        paymentMethod,
        requests,
        orderItems,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.ORDERS.CREATE.SUCCEED,
        data: createdOrder,
      });
    } catch (error) {
      next(error);
    }
  };
}

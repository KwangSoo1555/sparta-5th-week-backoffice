import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";
import { CustomerStoresService } from "../services/customer-stores.service.js";

export class CustomerStoresController {
  customerStoresService = new CustomerStoresService();
  // 고객 가게 정보 조회
  getStoreInfo = async (req, res, next) => {
    try {
      const storeId = req.params.store_Id;
      const store = await customerStoresService.getStoreInfo(storeId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: "가게 정보 조회에 성공했습니다.",
        data: store,
      });
    } catch (error) {
      next(error);
    }
  };

  // 주문하기
  createOrder = async (req, res, next) => {
    try {
      //
    } catch (error) {
      next(error);
    }
  };
}

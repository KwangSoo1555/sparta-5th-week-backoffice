import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class DibsController {
  constructor(dibsService) {
    this.dibsService = dibsService;
  }

  // 찜 생성
  createDibs = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const storeId = +req.params.store_id;

      const newDibs = await this.dibsService.createDibs(userId, storeId);

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.DIBS.CREATE.SUCCEED,
        data: newDibs,
      });
    } catch (error) {
      next(error);
    }
  };

  // 사용자가 찜한 가게 목록 조회
  getUserDibs = async (req, res, next) => {
    try {
      const userId = req.user.userId;
    
    const dibsList = await this.dibsService.findDibsByUser(userId);

    return res.status(HTTP_STATUS.OK).json({
      status: HTTP_STATUS.OK,
      message: MESSAGES.DIBS.LIST.SUCCEED,
      data: dibsList,
    });
  } catch (error) {
    next(error);
  }
};

  // 이번 주 찜이 가장 많은 가게 조회
  getTopDibs = async (req, res, next) => {
    try {
      const topDibbedStore = await this.dibsService.getTopDibs();
      if (topDibbedStore) {
        res.status(HTTP_STATUS.OK).json(topDibbedStore);
      } else {
        res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Store not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  // 찜 삭제
  deleteDibs = async (req, res, next) => {
    try {
      const { userId } = req.user;
      const storeId = parseInt(req.params.store_id, 10);
      const deletedDibs = await this.dibsService.deleteDibs(userId, storeId);

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.DIBS.DELETE.SUCCEED,
        data: deletedDibs,
      });
    } catch (error) {
      next(error);
    }
  };
}

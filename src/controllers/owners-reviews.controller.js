import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class OwnersReviewsController {
  constructor(ownersReviewsService) {
    this.ownersReviewsService = ownersReviewsService;
  }

  // 리뷰 생성
  createOwnersReview = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const storeId = +req.params.store_id;
      const reviewId = +req.params.review_id;
      const { content } = req.body;

      const data = await this.ownersReviewsService.createOwnersReview({
        userId,
        storeId,
        reviewId,
        content,
      });

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.REVIEWS.CREATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  getOwnersReviews = async (req, res, next) => {
    try {
      const userId = req.user.userId;
      const storeId = +req.params.store_id;
      const reviewId = +req.params.review_id;

      const data = await this.ownersReviewsService.getOwnersReviews({
        userId,
        storeId,
        reviewId,
      });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.REVIEWS.READ_LIST.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  updateOwnersReview = async (req, res, next) => {
    try {
      const ownersReviewId = req.params.owner_review_id;
      const userId = req.user.userId;
      const storeId = +req.params.store_id;
      const reviewId = +req.params.review_id;
      const { content } = req.body;

      const updatedOwnersReview = await this.ownersReviewsService.updateOwnersReview({
          ownersReviewId, 
          userId, 
          storeId, 
          reviewId, 
          content, 
        });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.REVIEWS.UPDATE.SUCCEED,
        data: updatedOwnersReview,
      });
    } catch (error) {
      next(error);
    }
  };
}

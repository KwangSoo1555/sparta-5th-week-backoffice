import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class ReviewsController {
  constructor(reviewsService) {
    this.reviewsService = reviewsService;
  }

  // 리뷰 생성
  createReview = async (req, res, next) => {
    try {
      const user = req.user;
      const userId = user.userId;
      const { rating, content, imgUrl } = req.body;
      const storeId = req.params.store_id;

      const data = await this.reviewsService.createReview({
        storeId,
        userId,
        rating,
        content,
        imgUrl,
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

  // 리뷰 목록 조회
  getReviews = async (req, res, next) => {
    try {
      const user = req.user;
      const userId = user.userId;
      const storeId = req.params.store_id;

      let sort = req.query.sort || "rating-desc";
      sort = sort?.toLowerCase();

      const data = await this.reviewsService.getReviews({
        storeId,
        sort,
      });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.REVIEWS.READ_LIST.SUCCEED,
        data: data,
      });
    } catch (error) {
      next(error);
    }
  };

  // 리뷰 수정
  updateReview = async (req, res, next) => {
    try {
      const { rating, content, imgUrl } = req.body;
      const storeId = req.params.store_id;
      const reviewId = req.params.id;

      const data = await this.reviewsService.updateReview({
        reviewId,
        rating,
        content,
        imgUrl,
      });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.REVIEWS.UPDATE.SUCCEED,
        data,
      });
    } catch (error) {
      next(error);
    }
  };

  // 리뷰 삭제
  deleteReview = async (req, res, next) => {
    try {
      const reviewId = req.params.id;

      const data = await this.reviewsService.deleteReview({ reviewId });

      return res.status(HTTP_STATUS.OK).json({
        status: HTTP_STATUS.OK,
        message: MESSAGES.REVIEWS.DELETE.SUCCEED,
        data: { id: data.id },
      });
    } catch (error) {
      next(error);
    }
  };
}

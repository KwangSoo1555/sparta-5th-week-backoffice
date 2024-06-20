import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";

export class ReviewsService {
  constructor(reviewsRepository, storesService) {
    this.reviewsRepository = reviewsRepository;
    this.storesService = storesService;
  }

  // 리뷰 생성
  createReview = async ({ storeId, userId, rating, content, imgUrl }) => {
    const storeInfo = await this.storesService.findStoreById(
      storeId
    )

    
    const storeRating = ((storeInfo.rating * storeInfo.reviewCount) + rating ) / (storeInfo.reviewCount + 1);
    const storeReviewCount = storeInfo.reviewCount + 1;
    

    const createdReview = await this.reviewsRepository.createReview({
      storeId,
      userId,
      rating,
      content,
      imgUrl,
      storeRating,
      storeReviewCount,
    });


    return createdReview;
  };

  // 리뷰 목록 조회
  getReviews = async ({ storeId, sort }) => {
    let orderBy;

    if (sort === "asc") {
      orderBy = { createdAt: "asc" }; // 오래된 순
    } else if (sort === "desc") {
      orderBy = { createdAt: "desc" }; // 최신 순
    } else if (sort === "rating-asc") {
      orderBy = { rating: "asc" }; // rating 낮은 순
    } else {
      orderBy = { rating: "desc" }; // rating 높은 순
    }

    const data = await this.reviewsRepository.getReviews({ storeId, orderBy });

    return data;
  };

  // 리뷰 수정
  updateReview = async ({ reviewId, rating, content, imgUrl }) => {
    const existedReview = await this.reviewsRepository.getReview({
      reviewId,
    });

    if (!existedReview)
      throw new HttpError.NotFound(MESSAGES.REVIEWS.COMMON.NOT_FOUND);

    const data = await this.reviewsRepository.updateReview({
      reviewId,
      rating,
      content,
      imgUrl,
    });

    return data;
  };

  // 리뷰 삭제
  deleteReview = async ({ reviewId }) => {
    const existedReview = await this.reviewsRepository.getReview({
      reviewId,
    });

    if (!existedReview)
      throw new HttpError.NotFound(MESSAGES.REVIEWS.COMMON.NOT_FOUND);

    const data = await this.reviewsRepository.deleteReview({ reviewId });
  };
}

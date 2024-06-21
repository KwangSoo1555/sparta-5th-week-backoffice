import { HttpError } from "../errors/http.error.js";
import { MESSAGES } from "../constants/message.constant.js";

export class OwnersReviewsService {
  constructor(ownersReviewsRepository, storesRepository) {
    this.ownersReviewsRepository = ownersReviewsRepository;
    this.storesRepository = storesRepository;
  }

  // 리뷰 생성
  createOwnersReview = async (userId, storeId, reviewId, content) => {
    const checkStore = await this.storesRepository.findStoreById(storeId);
    const checkReview = await this.reviewsRepository.findReviewById(reviewId);

    if (!checkStore)
      throw new HttpError.NotFound(MESSAGES.STORES.COMMON.NOT_FOUND);
    if (!checkReview)
      throw new HttpError.NotFound(MESSAGES.REVIEWS.COMMON.NOT_FOUND);

    if (userId !== checkStore.userId)
      throw new HttpError.Forbidden(MESSAGES.STORES.COMMON.OWNER_NOT_FOUND);
    if (storeId !== checkStore.storeId)
      throw new HttpError.Forbidden(MESSAGES.STORES.COMMON.OWNER_NOT_FOUND);
    if (reviewId !== checkReview.reviewId)
      throw new HttpError.Forbidden(MESSAGES.REVIEWS.COMMON.NOT_FOUND);

    const createdReview = await this.ownersReviewsRepository.createOwnersReview(
      {
        userId,
        storeId,
        reviewId,
        content,
      },
    );

    return createdReview;
  };

  getOwnersReviews = async (userId, storeId, reviewId) => {
    return await this.ownersReviewsRepository.getOwnersReviews({
      userId,
      storeId,
      reviewId,
    });
  };

  updateOwnersReview = async (
    ownersReviewId,
    userId,
    storeId,
    reviewId,
    content,
  ) => {
    const isExistedReview = await this.ownersReviewsRepository.checkOwnersReviews(userId)

    if (userId !== isExistedReview.userId)
        throw new HttpError.Unauthorized(MESSAGES.REVIEWS.COMMON.UNAUTHORIZED)
    if (ownersReviewId !== isExistedReview.ownersReviewId)
        throw new HttpError.NotFound(MESSAGES.REVIEWS.COMMON.NOT_FOUND)
    if (storeId !== isExistedReview.storeId)
        throw new HttpError.Forbidden(MESSAGES.REVIEWS.COMMON.UNAUTHORIZED)
    if (reviewId !== isExistedReview.reviewId)
        throw new HttpError.NotFound(MESSAGES.REVIEWS.COMMON.NOT_FOUND)

    const updatedOwnersReview = await this.ownersReviewsRepository.updateOwnersReview(
        userId, 
        content,
    )

    return updatedOwnersReview;


  };
}

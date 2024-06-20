export class ReviewsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 리뷰 생성
  createReview = async ({ storeId, userId, rating, content, imgUrl, storeRating, storeReviewCount }) => {
    const data = await this.prisma.$transaction([

    this.prisma.reviews.create({
      data: {
        storeId: +storeId,
        userId,
        rating,
        content,
        imgUrl,
      },
    }),

    this.prisma.stores.update({
      where: { storeId: +storeId },
      data: {
        rating : +storeRating,
        reviewCount : +storeReviewCount,
      },
    })

    ]);

    return data;
  };
  // 리뷰 목록 조회
  getReviews = async ({ storeId, orderBy }) => {
    const reviews = await this.prisma.reviews.findMany({
      where: { storeId: +storeId },
      orderBy: orderBy,
    });

    return reviews;
  };

  // 리뷰 상세 조회
  getReview = async ({ reviewId }) => {
    const review = await this.prisma.reviews.findUnique({
      where: { reviewId: +reviewId },
    });

    return review;
  };

  // 리뷰 수정
  updateReview = async ({ reviewId, rating, content, imgUrl }) => {
    const data = await this.prisma.reviews.update({
      where: { reviewId: +reviewId },
      data: {
        ...(rating && { rating }),
        ...(content && { content }),
        ...(imgUrl && { imgUrl }),
      },
    });

    return data;
  };

  // 리뷰 삭제
  deleteReview = async ({ reviewId }) => {
    const data = await this.prisma.reviews.delete({
      where: { reviewId: +reviewId },
    });

    return data;
  };
}

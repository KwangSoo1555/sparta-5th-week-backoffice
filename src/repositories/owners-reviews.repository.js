export class OwnersReviewsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  checkOwnersReviews = async (params) => {
    return await this.prisma.ownersReviews.findFirst({
      where: params,
    });
  };

  createOwnersReview = async (userId, storeId, reviewId, content) => {
    const createdReviews = await this.prisma.ownersReviews.create({
      data: {
        userId,
        storeId,
        reviewId,
        content,
      },
    });

    return createdReviews;
  };

  getOwnersReviews = async (userId, storeId, reviewId) => {
    return await this.prisma.ownersReviews.findMany();
  };

  updateOwnersReview = async (userId, content) => {
    const updatedOwnersReview = await this.prisma.ownersReviews.update({
      where: { userId: userId },
      data: {
        ...(content && { content }),
      },
    });

    return updatedOwnersReview;
  };
}

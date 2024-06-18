import express from "express";
import { prisma } from "../utils/prisma.util.js";
import { ReviewsRepository } from "../repositories/resumes.repository.js";
import { CustomerReviewsService } from "../services/resumes.service.js";
import { CustomerReviewsController } from "../controllers/resumes.controller.js";

const reviewsRouter = express.Router();

const ReviewsRepository = new ReviewsRepository(prisma);
const customerReviewsService = new CustomerReviewsService(ReviewsRepository);
const customerReviewsController = new CustomerReviewsController(
  customerReviewsService,
);

// 리뷰 생성
reviewsRouter.post("/reviews", customerReviewsController.createReview);
// 리뷰 조회
reviewsRouter.get("/reviews", customerReviewsController.getReviews);
// 리뷰 수정
reviewsRouter.put("/reviews/:id", customerReviewsController.updateReview);
// 리뷰 삭제
reviewsRouter.delete("/reviews/:id", customerReviewsController.deleteReview);

export { reviewsRouter };

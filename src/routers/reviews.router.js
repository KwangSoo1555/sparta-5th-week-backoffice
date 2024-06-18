import express from "express";
import { prisma } from "../utils/prisma.util.js";
import { ReviewsRepository } from "../repositories/reviews.repository.js";
import { ReviewsService } from "../services/customer-review.service.js";
import { ReviewsController } from "../controllers/customer-review.controller.js";

const reviewsRouter = express.Router();

const reviewsRepository = new ReviewsRepository(prisma);
const reviewsService = new ReviewsService(reviewsRepository);
const reviewsController = new ReviewsController(reviewsService);

// 리뷰 생성
reviewsRouter.post("/reviews", reviewsController.createReview);
// 리뷰 조회
reviewsRouter.get("/reviews", reviewsController.getReviews);
// 리뷰 수정
reviewsRouter.put("/reviews/:id", reviewsController.updateReview);
// 리뷰 삭제
reviewsRouter.delete("/reviews/:id", reviewsController.deleteReview);

export { reviewsRouter };

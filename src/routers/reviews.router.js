import express from "express";
import { prisma } from "../utils/prisma.util.js";
import { ReviewsRepository } from "../repositories/reviews.repository.js";
import { ReviewsService } from "../services/customer-review.service.js";
import { ReviewsController } from "../controllers/customer-review.controller.js";

import { StoresRepository } from "../repositories/stores.repository.js";
import { StoresService } from "../services/stores.service.js";

const reviewsRouter = express.Router();

const storesRepository = new StoresRepository(prisma);
const storesService = new StoresService(storesRepository);

const reviewsRepository = new ReviewsRepository(prisma);
const reviewsService = new ReviewsService(reviewsRepository, storesService);
const reviewsController = new ReviewsController(reviewsService);

// 리뷰 생성
reviewsRouter.post("/:store_id", reviewsController.createReview);
// 리뷰 조회
reviewsRouter.get("/:store_id", reviewsController.getReviews);
// 리뷰 수정
reviewsRouter.patch("/:store_id/:review_id", reviewsController.updateReview);
// 리뷰 삭제
reviewsRouter.delete("/:store_id/:review_id", reviewsController.deleteReview);

export { reviewsRouter };

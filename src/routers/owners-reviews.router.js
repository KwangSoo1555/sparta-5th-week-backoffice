import express from "express";

import { prisma } from "../utils/prisma.util.js";

import { StoresRepository } from "../repositories/stores.repository.js";
import { ReviewsRepository } from "../repositories/reviews.repository.js";

import { OwnersReviewsRepository } from "../repositories/owners-reviews.repository.js"
import { OwnersReviewsService } from "../services/owners-reviews.service.js"
import { OwnersReviewsController } from "../controllers/owners-reviews.controller.js"

const ownersReviewsRouter = express.Router();

const storesRepository = new StoresRepository(prisma);
const reviewsRepository = new ReviewsRepository(prisma);

const ownersReviewsRepository = new OwnersReviewsRepository(prisma);
const ownersReviewsService = new OwnersReviewsService(ownersReviewsRepository, storesRepository, reviewsRepository);
const ownersReviewsController = new OwnersReviewsController(ownersReviewsService);

// 리뷰 생성
ownersReviewsRouter.post("/reviews/:store_id/:review_id", ownersReviewsController.createOwnersReview);
// // 리뷰 조회
ownersReviewsRouter.get("/reviews/:store_id", ownersReviewsController.getOwnersReviews);
// // 리뷰 수정
ownersReviewsRouter.patch("reviews/:store_id/:review_id/owner_review_id", ownersReviewsController.updateOwnersReview);
// // 리뷰 삭제
// ownersReviewsRouter.delete("/:store_id/:review_id", ownersReviewsController.deleteOwnersReview);

export { ownersReviewsRouter };

import express from "express";
// import { createResumeValidator } from "../middlewares/validators/create-resume-validator.middleware.js";
// import { updateResumeValidator } from "../middlewares/validators/updated-resume-validator.middleware.js";
import { prisma } from "../utils/prisma.util.js";
import { ReviewsRepository } from "../repositories/resumes.repository.js";
import { CustomerReviewsService } from "../services/resumes.service.js";
import { CustomerReviewsController } from "../controllers/resumes.controller.js";

const resumesRouter = express.Router();

const ReviewsRepository = new ResumesRepository(prisma);
const customerReviewsService = new CustomerReviewsService(ReviewsRepository);
const customerReviewsController = new CustomerReviewsController(
  customerReviewsService,
);

// 리뷰 생성
resumesRouter.post("/reviews", customerReviewsController.createReview);
// 리뷰 조회
resumesRouter.get("/reviews", customerReviewsController.getReviews);
// 이력서 상세 조회
// resumesRouter.get("/reviews/:id", customerReviewsController.getReviewById);
// 리뷰 수정
resumesRouter.put("/reviews/:id", customerReviewsController.updateReview);
// 리뷰 삭제
resumesRouter.delete("/reviews/:id", customerReviewsController.deleteReview);

export { reviewsRouter };

import express from "express";
import { prisma } from "../utils/prisma.util.js";
import { SearchRepository } from "../repositories/search.repository.js";
import { SearchService } from "../services/search.service.js";
import { SearchController } from "../controllers/search.controller.js";

const searchRouter = express.Router();

const searchRepository = new SearchRepository(prisma);
const searchService = new SearchService(searchRepository);
const searchController = new SearchController(searchService);


// 지역 검색
searchRouter.get("/search/regionName/:region_name", searchController.getRegionSearch);
// 업체 검색
searchRouter.get("/search/storeName/:store_name", searchController.getStoreSearch);
// 키워드 검색
searchRouter.get("/search/keyword/:keyword", searchController.getKeywordSearch);

export { searchRouter };

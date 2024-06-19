import express from "express";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { createMenuValidator } from "../middlewares/validators/create-menu-validator.middleware.js";
import { updateMenuValidator } from "../middlewares/validators/updated-menu-validator.middleware.js";
import { prisma } from "../utils/prisma.util.js";
import { MenusRepository } from "../repositories/menus.repository.js";
import { MenusService } from "../services/menus.service.js";
import { MenusController } from "../controllers/menus.controller.js";

const menusRouter = express.Router();

const menusRepository = new MenusRepository(prisma);

const menusService = new MenusService(menusRepository);

const menusController = new MenusController(menusService);

menusRouter.get("/menus/:store_id", menusController.getMenus);

menusRouter.get("/menus/:store_id/:menu_id", menusController.getMenuDetail);

menusRouter.post("/menus/:store_id", createMenuValidator, menusController.postMenus);

menusRouter.patch("/menus/:store_id/:menu_id", updateMenuValidator, menusController.patchMenus);

menusRouter.delete("/menus/:store_id/:menu_id", menusController.deleteMenus);

export { menusRouter };

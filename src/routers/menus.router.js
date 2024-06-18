import express from "express";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { prisma } from "../utils/prisma.util.js";
import { MenusRepository } from "../repositories/menus.repository.js";
import { MenusService } from "../services/menus.service.js";
import { MenusController } from "../controllers/menus.controller.js";

const menusRouter = express.Router();

const menusRepository = new MenusRepository(prisma);

const  menusController = new MenusController(menusService);

const menusService = new MenusService(menusRepository);

menusRouter.get("/menu", requireAccessToken(authService), menusController.getMenus);

menusRouter.get("/menu/:menu_id", requireAccessToken(authService), menusController.getMenuDetail);

menusRouter.post("/menu", requireAccessToken(authService), menusController.postMenus);

menusRouter.patch("/menu/:menu_id", requireAccessToken(authService), menusController.patchMenus);

menusRouter.delete("/menu/:menu_id", requireAccessToken(authService), menusController.deleteMenus);

export { menusRouter };

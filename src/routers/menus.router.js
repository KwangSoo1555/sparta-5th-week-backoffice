import express from "express";
import { requireAccessToken } from "../middlewares/require-access-token.middleware.js";
import { createMenuValidator } from "../middlewares/validators/create-menu-validator.middleware.js";
import { updateMenuValidator } from "../middlewares/validators/updated-menu-validator.middleware.js";
import { prisma } from "../utils/prisma.util.js";
import { MenusRepository } from "../repositories/menus.repository.js";
import { MenusService } from "../services/menus.service.js";
import { MenusController } from "../controllers/menus.controller.js";

import { UsersRepository } from "../repositories/users.repository.js";
import { AuthService } from "../services/auth.service.js";

const menusRouter = express.Router();

const usersRepository = new UsersRepository(prisma);
const authService = new AuthService(usersRepository);

const menusRepository = new MenusRepository(prisma);

const menusService = new MenusService(menusRepository);

const menusController = new MenusController(menusService);

menusRouter.get("/menus/:store_id", requireAccessToken(authService), menusController.getMenus);

menusRouter.get("/menus/:store_id/:menu_id", requireAccessToken(authService), menusController.getMenuDetail);

menusRouter.post("/menus/:store_id", requireAccessToken(authService), createMenuValidator, menusController.postMenus);

menusRouter.patch("/menus/:store_id/:menu_id", requireAccessToken(authService), updateMenuValidator, menusController.patchMenus);

menusRouter.delete("/menus/:store_id/:menu_id", menusController.deleteMenus);

export { menusRouter };

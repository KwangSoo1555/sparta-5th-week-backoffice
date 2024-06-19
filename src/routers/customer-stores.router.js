import express from "express";
import { CustomerStoresController } from "../controllers/customer-stores.controller.js";
import { MenusController } from "../controllers/menus.controller.js";

const customerStoresRouter = express.Router();

const customerStoresController = new CustomerStoresController();
const menusController = new MenusController();

// 고객 가게 정보 조회
customerStoresRouter.get("/:store_id", customerStoresController.getStoreInfo);
// 메뉴 목록 조회
customerStoresRouter.get("/:store_id/menus", menusController.getMenus);
// 주문하기
customerStoresRouter.post(
  "/:store_id/orders",
  customerStoresController.createOrder,
);
// 메뉴 상세 조회
customerStoresRouter.get("/:store_id/:menu_id", menusController.getMenuDetail);

export { customerStoresRouter };

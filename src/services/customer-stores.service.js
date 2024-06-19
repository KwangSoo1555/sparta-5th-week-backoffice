import { MESSAGES } from "../constants/message.constant.js";
import { HttpError } from "../errors/http.error.js";
import { OrdersRepository } from "../repositories/orders.respository.js";
import { StoresRepository } from "../repositories/stores.repository.js";
import { MenusRepository } from "../repositories/menus.repository.js";

export class CustomerStoresService {
  ordersRepository = new OrdersRepository();
  storesRepository = new StoresRepository();
  menusRepository = new MenusRepository();
  // 고객 가게 정보 조회
  getStoreInfo = async () => {};
  // 메뉴 목록 조회
  // 주문하기
  // 메뉴 상세 조회
}

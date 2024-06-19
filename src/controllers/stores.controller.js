import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/message.constant.js";

export class StoresController {
  constructor(storesService) {
    this.storesService = storesService;
  }

  //가게 생성
  createStore = async (req, res, next) => {
    try {
      const {
        name,
        category,
        address,
        storePictureUrl,
        phone,
        content,
        dibsCount,
        reviewCount,
        status,
        rating,
      } = req.body;

      const createdStore = await this.storesService.createStore(
        name,
        category,
        address,
        storePictureUrl,
        phone,
        content,
        dibsCount,
        reviewCount,
        status,
        rating,
      );

      return res.status(HTTP_STATUS.CREATED).json({
        status: HTTP_STATUS.CREATED,
        message: MESSAGES.RESUMES.CREATE.SUCCEED,
        createdStore,
      });
    } catch (error) {
      next(error);
    }
  };

  //가게 상세조회
  findStoreById = async (req, res, next) => {
    try {
      const { storeId } = req.params;
      const store = await this.storesService.findStoreById(storeId);
      if (store) {
        res.status(200).json(store);
      } else {
        res.status(404).json({ message: "Store not found" });
      }
    } catch (error) {
      next(error);
    }
  };

  // 가게 수정
  updateStore = async (
    name,
    category,
    address,
    storePictureUrl,
    phone,
    content,
    dibsCount,
    reviewCount,
    status,
    rating,
  ) => {
    const updatedStore = await this.prisma.stores.update({
      where: { store_id: +id, storeId },
      data: {
        ...(name && { name }),
        ...(category && { category }),
        ...(address && { address }),
        ...(storePictureUrl && { storePictureUrl }),
        ...(phone && { phone }),
        ...(content && { content }),
        ...(dibsCount && { dibsCount }),
        ...(reviewCount && { reviewCount }),
        ...(status && { status }),
        ...(rating && { rating }),
      },
    });

    return updatedStore;
  };

  // 가게 삭제
  deleteStore = async (req, res) => {
    try {
      const { id, storeId } = req.params;
      await this.storesService.deleteStore(id, storeId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

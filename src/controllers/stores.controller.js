import { HTTP_STATUS } from "../constants/http-status.constant.js";

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
          store_picture_url,
          phone,
          content,
          dibs_count,
          review_count,
          created_date,
          updated_date,
          status,
          rating
        } = req.body;
  
        const createdStore = await this.storesService.createStore(
          name,
          category,
          address,
          store_picture_url,
          phone,
          content,
          dibs_count,
          review_count,
          created_date,
          updated_date,
          status,
          rating
        );
  
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
            message: MESSAGES.AUTH.SIGN_UP.EMAIL.FAIL,
          });
      } catch (error) {
        next(error);
      }
    };
  
    //가게 상세조회
    findStoreById = async (req, res, next) => {
        try {
          const { id } = req.params;
          const store = await this.storesService.findStoreById(id, name);
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
      updateStore = async (id, name, category, address, store_picture_url, phone, content, dibs_count, review_count, created_date, updated_date, status, rating) => {
        const updatedStore = await this.prisma.stores.update({
          where: { store_id: +id },
          data: {
            ...(name && { name }),
            ...(category && { category }),
            ...(address && { address }),
            ...(store_picture_url && { store_picture_url }),
            ...(phone && { phone }),
            ...(content && { content }),
            ...(dibs_count && { dibs_count }),
            ...(review_count && { review_count }),
            ...(created_date && { created_date }),
            ...(updated_date && { updated_date }),
            ...(status && { status }),
            ...(rating && { rating }),
          },
        });
    
        return updatedStore;
      };
    
      // 가게 삭제
      deleteStore = async (req, res) => {
        try {
          const { id } = req.params;
          await this.storesService.deleteStore(id);
          res.status(204).send();
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      };
    }
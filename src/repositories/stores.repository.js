export class StoresRepository {
    constructor(prisma) {
      // 생성자(Constructor)에서 전달받은 Prisma 클라이언트의 의존성을 주입합니다.
      this.prisma = prisma;
    }
  
    // 가게 생성
    createStore = async (store_id,name, category, address, store_picture_url, phone, content, dibs_count, review_count, created_date, updated_date, status, rating) => {
      const createdStore = await this.prisma.stores.create({
        data: {
          store_id,
          name,
          category,
          address,
          storepictureurl,
          phone,
          content,
          dibscount,
          reviewcount,
          createddate,
          updateddate,
          status,
          rating,
        },
      });
  
      return createdStore;
    };

  

    findStoreById = async (id, store_id) => {
      const store = await this.prisma.stores.findUnique({
        where: { store_id: +id,store_id },
      });
  
      return store;
    };
  
    // 가게 수정
    updateStore = async (store_id, name, category, address, store_picture_url, phone, content, dibs_count, review_count, created_date, updated_date, status, rating) => {
      const updatedStore = await this.prisma.stores.update({
        where: { store_id: +id ,store_id },
        data: {
          ...(store_id && { store_id }),
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
    deleteStore = async (id, store_id) => {
      const deletedStore = await this.prisma.stores.delete({
        where: { store_id: +id, store_id},
      });
  
      return deletedStore;
    };
  }
  
export class StoresRepository {
    constructor(prisma) {
      // 생성자(Constructor)에서 전달받은 Prisma 클라이언트의 의존성을 주입합니다.
      this.prisma = prisma;
    }
  
    // 가게 생성
    createStore = async (storeid,name, category, address, storePictureUrl, phone, content, dibsCount, reviewCount, createdDate, updatedDate, status, rating) => {
      const createdStore = await this.prisma.stores.create({
        data: {
         storeid,
         name,
         category,
         address,
         storePictureUrl,
         phone,
         content,
         dibsCount,
         reviewCount,
         createdDate,
         updatedDate,
         status,
         rating,
        },
      });
  
      return createdStore;
    };

  

    findStoreById = async (storeid) => {
      const store = await this.prisma.stores.findUnique({
        where: {storeid: +storeid },
      });
  
      return store;
    };
   
    // 가게 수정
    updateStore = async (storeid, name, category, address, storePictureUrl, phone, content, dibsCount, reviewCount, createdDate, updatedDate, status, rating) => {
      const updatedStore = await this.prisma.stores.update({
        where: { storeid: +id ,storeid },
        data: {
          ...(storeid && { storeid }),
          ...(name && { name }),
          ...(category && { category }),
          ...(address && { address }),
          ...(storePictureUrl && { storePictureUrl }),
          ...(phone && { phone }),
          ...(content && { content }),
          ...(dibsCount && { dibsCount }),
          ...(reviewCount && { reviewCount }),
          ...(createdDate && { createdDate }),
          ...(updatedDate && { updatedDate }),
          ...(status && { status }),
          ...(rating && { rating }),
        },
      });
  
      return updatedStore;
    };
  
    // 가게 삭제
    deleteStore = async (id, storeid) => {
      const deletedStore = await this.prisma.stores.delete({
        where: { storeid: +id, storeid},
      });
  
      return deletedStore;
    };
  }
  
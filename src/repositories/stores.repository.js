import { STORE_STATUS_CONSTANT } from "../constants/store.constant.js";

export class StoresRepository {
  constructor(prisma) {
    // 생성자(Constructor)에서 전달받은 Prisma 클라이언트의 의존성을 주입합니다.
    this.prisma = prisma;
  }

  // 가게 생성
  createStore = async (
    userId,
    name,
    category,
    address,
    storePictureUrl,
    phone,
    content,
  ) => {
    const createdStore = await this.prisma.stores.create({
      data: {
        userId,
        name,
        category,
        address,
        storePictureUrl,
        phone,
        content,
      },
    });

    return createdStore;
  };

  findStoreById = async (storeId) => {
    const store = await this.prisma.stores.findFirst({
      where: { storeId: +storeId },
    });

    return store;
  };

  // 유저 ID로
  findStoreByUserId2 = async (userId) => {
    const store = await this.prisma.stores.findUnique({
      where: { userId: +userId },
    });

    return store;
  };

  // 가게 수정
  updateStore = async (
    storeId,
    name,
    category,
    address,
    storePictureUrl,
    phone,
    content,
  ) => {
    const updatedStore = await this.prisma.stores.update({
      where: { storeId: +storeId },
      data: {
        ...(name && { name }),
        ...(category && { category }),
        ...(address && { address }),
        ...(storePictureUrl && { storePictureUrl }),
        ...(phone && { phone }),
        ...(content && { content }),
      },
    });

    return updatedStore;
  };

  // 가게 삭제
  deleteStore = async (storeId) => {
    const deletedStore = await this.prisma.stores.delete({
      where: { storeId: +storeId },
    });

    return deletedStore;
  };

  // dibsService 로 stores 테이블 정보 넘김.
  checkStoreToDibsService = async (params) => {
    return await this.prisma.stores.findFirst({
      where: params,
    });
  };

  findStoreByUserId = async (storeId, userId) => {
    const store = await this.prisma.stores.findFirst({
      where: {
        storeId: +storeId,
        userId: +userId,
      },
    });

    return store;
  };

  // 열려있는 가게 목록 조회
  getOpenStores = async () => {
    const openStores = await this.prisma.stores.findMany({
      where: { status: STORE_STATUS_CONSTANT.OPEN },
    });

    return openStores;
  };
}

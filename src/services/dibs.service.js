import { HttpError } from "../errors/http.error.js";
// import { startOfWeek, endOfWeek } from "date-fns";

export class DibsService {
  constructor(dibsRepository, storesRepository) {
    this.dibsRepository = dibsRepository;
    this.storesRepository = storesRepository;
  }

  createDibs = async (userId, storeId) => {
    const store = await this.storesRepository.checkStoreToDibsService({ storeId });

    if (!store)
      throw new HttpError.NotFound("Store not found");

    if (store.userId === userId)
      throw new HttpError.BadRequest("You cannot dibs your own store");

    const existingDibs = await this.dibsRepository.findDibsByUserAndStore(userId, storeId);

    if (existingDibs) {
      throw new HttpError.BadRequest("You have already dibsed this store");
    }

    const newDibs = await this.dibsRepository.createDibs(userId, storeId);
    const dibsCount = await this.dibsRepository.countDibsByStore(storeId);

    return {
      id: newDibs.logId,
      userId: newDibs.userId,
      dibsNumber: dibsCount,
      dibsNumber: store.dibsCount, 
      createdAt: newDibs.createdAt,
      updatedAt: newDibs.updatedAt,
    };
  };

  deleteDibs = async (userId, storeId) => {
    const dibs = await this.dibsRepository.findDibsByUserAndStore(
      userId,
      storeId,
    );

    if (!dibs) {
      throw new HttpError.NotFound("Dibs not found");
    }

    await this.dibsRepository.deleteDibs(dibs.logId);
    const dibsCount = await this.dibsRepository.countDibsByStore(storeId);

    return {
      id: dibs.logId,
      userId: dibs.userId,
      dibsNumber: dibsCount,
      createdAt: dibs.createdAt,
      updatedAt: dibs.updatedAt,
    };
  }

  async getUserDibs(userId) {
    const dibsList = await this.dibsRepository.findDibsByUser(userId);
    const findStoresByStoreId =
      await this.dibsRepository.findStoreById(storeId);
    console.log(findStoresByStoreId);

    return dibsList.map((dibs) => ({
      id: dibs.store.storeId,
      name: dibs.store.name,
      category: dibs.store.category,
      address: dibs.store.address,
      storePictureUrl: dibs.store.storePictureUrl,
      phone: dibs.store.phone,
      content: dibs.store.content,
      createdAt: dibs.store.createdAt,
      updatedAt: dibs.store.updatedAt,
    }));
  }

  findDibsByUser = async (userId) => {
    const dibsList = await this.dibsRepository.findDibsByUser(userId);

    return dibsList;
  };

  async getTopDibs() {
    const startOfWeekDate = startOfWeek(new Date());
    const endOfWeekDate = endOfWeek(new Date());

    const topDibbedStore = await this.dibsRepository.findTopDibbedStore(
      startOfWeekDate,
      endOfWeekDate,
    );

    if (!topDibbedStore) {
      throw new HttpError.NotFound("No top dibbed store found for this week");
    }

    return {
      userId: topDibbedStore.User.name,
      title: topDibbedStore.name,
      content: topDibbedStore.content,
      createdAt: topDibbedStore.createdAt,
      dibsCount: topDibbedStore._count.Dibs,
    };
  }
}

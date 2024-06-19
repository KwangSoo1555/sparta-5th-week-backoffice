export class DibsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findStoreById = async (storeId) => {
    return await this.prisma.stores.findUnique({
      where: { storeId: +storeId },
      include: { User: true },
    });
  };

  findDibsByUserAndStore = async (userId, storeId) => {
    return await this.prisma.dibsLog.findFirst({
      where: { storeId: +storeId, userId: +userId },
    });
  };

  createDibs = async (userId, storeId) => {
    return await this.prisma.dibsLog.create({
      data: { storeId: +storeId, userId: +userId },
    });
  };

  deleteDibs = async (dibId) => {
    return await this.prisma.dibsLog.delete({
      where: { dibId: +dibId },
    });
  };

  countDibsByStore = async (storeId) => {
    return await this.prisma.dibsLog.count({
      where: { storeId: +storeId },
    });
  };

  findDibsByUser = async (userId) => {
    return await this.prisma.dibsLog.findMany({
      where: { userId: +userId },
      include: {
        store: true,
      },
    });
  };

  findTopDibbedStore = async (startOfWeekDate, endOfWeekDate) => {
    return await this.prisma.store.findFirst({
      where: {
        createdAt: {
          gte: startOfWeekDate,
          lte: endOfWeekDate,
        },
      },
      orderBy: {
        DibsLog: {
          _count: "desc",
        },
      },
      include: {
        User: true,
        _count: {
          select: { DibsLog: true },
        },
      },
    });
  };
}

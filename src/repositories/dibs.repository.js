export class DibsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findDibsByUserAndStore = async (userId, storeId) => {
    return await this.prisma.dibs.findFirst({
      where: { storeId: +storeId, userId: +userId },
    });
  }

  createDibs = async (userId, storeId) => {
    return await this.prisma.dibs.create({
      data: {userId: +userId , storeId: +storeId },
    });
  }

  deleteDibs = async (dibId) => {
    return await this.prisma.dibs.delete({
      where: { dibId: +dibId },
    });
  }

  countDibsByStore = async (storeId) => {
    return await this.prisma.dibs.count({
      where: { storeId: +storeId },
    });
  }

  findDibsByUser = async (userId) => {
    return await this.prisma.dibs.findMany({
      where: { userId: +userId }
    });
  }

  findTopDibbedStore = async (startOfWeekDate, endOfWeekDate) => {
    return await this.prisma.store.findFirst({
      where: {
        createdAt: {
          gte: startOfWeekDate,
          lte: endOfWeekDate,
        },
      },
      orderBy: {
        Dibs: {
          _count: 'desc',
        },
      },
      include: {
        User: true,
        _count: {
          select: { Dibs: true },
        },
      },
    });
  }
}

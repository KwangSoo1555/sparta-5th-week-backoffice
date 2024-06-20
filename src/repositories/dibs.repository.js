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
    return await this.prisma.dibs.findFirst({
      where: { storeId: +storeId, userId: +userId },
    });
  };

  createDibs = async (userId, storeId) => {
    return await this.prisma.dibs.create({
      data: { 
        userId: userId, 
        storeId: storeId 
      },
    });
  };

  deleteDibs = async (dibsId) => {
    return await this.prisma.dibs.delete({
      where: { dibsId: +dibsId          
       },
    });
  };

  countDibsByStore = async (storeId) => {
    return await this.prisma.dibs.count({
      where: { storeId: +storeId },
    });
  };

  findDibsByUser = async (userId) => {
    return await this.prisma.dibs.findMany({
      where: { userId: +userId },
    });
  };

//   async findTopDibbedStores() {
//     return await this.prisma.stores.findMany({
//       orderBy: {
//         dibsCount: {
//           _count: 'desc',
//         },
//       },
//       include: {
//         users: true,
//         _count: {
//           select: { dibs: true },
//         },
//         dibs: true,
//       },
//     });
//   }
}

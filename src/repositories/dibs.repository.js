import { prisma } from "../utils/prisma/index.js";

export class DibsRepository {
    findStoreById = async (storeId) => {
    return await prisma.store.findUnique({
      where: { storeId: +storeId },
      include: { User: true },
    });
  }

  findDibsByUserAndStore = async (userId, storeId) => {
    return await prisma.dibsLog.findFirst({
      where: { storeId: +storeId, userId: +userId },
    });
  }

  createDibs = async (userId, storeId) => {
    return await prisma.dibsLog.create({
      data: { storeId: +storeId, userId: +userId },
    });
  }

  deleteDibs = async (dibId) => {
    return await prisma.dibsLog.delete({
      where: { dibId: +dibId },
    });
  }

  countDibsByStore = async (storeId) => {
    return await prisma.dibsLog.count({
      where: { storeId: +storeId },
    });
  }

  findDibsByUser = async (userId) => {
    return await prisma.dibsLog.findMany({
      where: { userId: +userId },
      include: {
        store: true,
      },
    });
  }

  findTopDibbedStore = async (startOfWeekDate, endOfWeekDate) => {
    return await prisma.store.findFirst({
      where: {
        createdAt: {
          gte: startOfWeekDate,
          lte: endOfWeekDate,
        },
      },
      orderBy: {
        DibsLog: {
          _count: 'desc',
        },
      },
      include: {
        User: true,
        _count: {
          select: { DibsLog: true },
        },
      },
    });
  }
}

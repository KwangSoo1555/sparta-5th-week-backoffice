export class PassPortRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findUserBySocialId(socialId) {
    return this.prisma.users.findFirst({
      where: { socialId },
    });
  }

  async createUser(data) {
    return this.prisma.users.create({
      data,
    });
  }

  async findUserById(userId) {
    return this.prisma.users.findUnique({
      where: { userId },
    });
  }
}

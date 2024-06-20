export class UsersRepository {
  constructor(prisma) {
    //생성자(Constructor)에서 전달받은 Prisma 클라이언트의 의존성을 주입합니다.
    this.prisma = prisma;
  }

  checkAuthUser = async (params) => {
    return await this.prisma.users.findFirst({
      where: params,
    });
  };

  createUser = async (email, hashedPassword, name, phone, address) => {
    const signUpUser = await this.prisma.users.create({
      data: {
        email,
        password: hashedPassword,
        name,
        phone,
        address,
      },
    });

    return signUpUser;
  };

  storeRefreshToken = async (userId, refreshToken, ip, userAgent) => {
    const storedRefreshToken = await this.prisma.refreshToken.upsert({
      where: { userId },
      update: {
        refreshToken,
        ip,
        userAgent,
        updatedAt: new Date(),
      },
      create: {
        userId,
        refreshToken,
        ip,
        userAgent,
      },
    });

    return storedRefreshToken;
  };

  BySignOutUpdateRefreshTokenToNull = async (userId) => {
    const refreshTokenNull = await this.prisma.refreshToken.update({
      where: { userId: userId },
      data: {
        refreshToken: null,
      },
    });

    return refreshTokenNull;
  };

  updateUserInfo = async (
    userId,
    email,
    name,
    password,
    newPassword,
    phone,
    address,
  ) => {
    const updatedUser = await this.prisma.users.update({
      where: { userId: userId },
      data: {
        ...(email && { email }),
        ...(name && { name }),
        ...(newPassword && { password }),
        ...(phone && { phone }),
        ...(address && { address }),
        // ...(image && { imgUrl }), 나중에 이미지 칼럼 추가하면 그때 수정하는 걸로
        updatedAt: new Date(),
      },
    });

    return updatedUser;
  };

  updateUserPermission = async (userId) => {
    const updatedUser = await this.prisma.users.update({
      where: { userId: +userId },
      data: {
        role : "OWNER",
      },
    });

    return updatedUser;
  };

  // 사용자의 포인트 조회
  getUserPoint = async (userId) => {
    const user = await this.prisma.users.findUnique({
      where: { userId: +userId },
      select: { point: true },
    });

    return user.point;
  };

  // 사용자의 포인트 업데이트
  updateUserPoint = async (userId, newPoint) => {
    await this.prisma.users.update({
      where: { userId: +userId },
      data: { point: +newPoint },
    });
  };
}

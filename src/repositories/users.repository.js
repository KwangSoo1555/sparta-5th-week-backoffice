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
}

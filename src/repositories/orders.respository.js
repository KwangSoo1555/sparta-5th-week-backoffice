export class OrdersRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  // 주문 생성하기
  createdOrder = async ({
    storeId,
    userId,
    paymentMethod,
    requests,
    orderItemsWithPrice,
  }) => {
    const createdOrder = await this.prisma.$transaction(async (tx) => {
      // 주문 생성
      const newOrder = await tx.orders.create({
        data: {
          storeId: +storeId,
          userId,
          totalPrice: orderItemsWithPrice.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          ),
          paymentMethod,
          requests,
        },
      });

      // 주문 상세 생성
      await tx.orderItems.createMany({
        data: orderItemsWithPrice.map((item) => ({
          orderId: newOrder.orderId,
          menuId: item.menuId,
          quantity: item.quantity,
          price: item.price,
        })),
      });

      return newOrder;
    });

    return createdOrder;
  };

  // 주문 상세 내역 조회
  getOrderDetail = async ({ orderId }) => {
    const orderDetail = await this.prisma.orders.findUnique({
      where: { orderId: +orderId },
      include: {
        storeIdByStores: true,
      },
    });

    return orderDetail;
  };

  // 주문 상태 변경
  updateOrder = async ({ orderId, status }) => {
    const updatedOrder = await this.prisma.orders.update({
      where: { orderId: +orderId },
      data: { status },
    });

    return updatedOrder;
  };

  // COMPLETE로 주문 상태 변경
  updateCompletedOrder = async ({ orderId, status, userId, totalPrice }) => {
    const result = await this.prisma.$transaction(async (tx) => {
      // 주문 상태 업데이트
      const updatedOrder = await tx.orders.update({
        where: { orderId: +orderId },
        data: { status },
      });

      // 사장 포인트 업데이트
      const updatedUser = await tx.users.update({
        where: { userId: +userId },
        data: {
          point: {
            increment: totalPrice,
          },
        },
      });

      return updatedOrder;
    });

    return result;
  };
}

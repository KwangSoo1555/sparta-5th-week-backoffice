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
      // include: {
      //   orderItems: {
      //     select: {
      //       menuId: true,
      //       price: true,
      //       quantity: true,
      //       menus: {
      //         select: {
      //           name: true,
      //           price: true,
      //         },
      //       },
      //     },
      //   },
      // },
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
}

import { prisma } from "../utils/prisma.util.js";

export class OrdersRepository {
  // 주문 생성하기
  createOrder = async ({
    storeId,
    userId,
    paymentMethod,
    requests,
    orderItemsWithPrice,
  }) => {
    const createdOrder = await prisma.orders.create({
      data: {
        storeId,
        userId,
        totalPrice: orderItemsWithPrice.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0,
        ),
        paymentMethod,
        requests,
        orderItems: {
          create: orderItemsWithPrice.map((item) => ({
            menuId: item.menuId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    return createdOrder;
  };
  // 주문 상태 변경
}

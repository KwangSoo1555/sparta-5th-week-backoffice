// import { ENV } from "./constants/env.constant.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
// import { io } from "socket.io-client";

// 처음 로딩이 시작되었을때, 인증하고, 주문 기록 조회 - 로딩되었을 때, 바로 받아야함.
document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    alert("로그인이 필요합니다.");
    window.location.href = "./login-customer.html";
    return;
  }

  const response = await fetch(`http://localhost:5000/api/users/me/orders`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();
  console.log(data);

  if (data.status !== HTTP_STATUS.OK || data.data.length === 0) {
    alert(data.message);
  }

  for (let i = 0; i < data.data.length; i++) {
    const orderElement = `
  <li>
    <div>
      <span>주문 번호: ${data.data[i].orderId}</span>
      <span>가게 번호: ${data.data[i].storeId}</span>
      <span>총 가격: ${data.data[i].totalPrice}</span>
      <span>요청사항: ${data.data[i].requests}</span>
      <span>주문 상태: ${data.data[i].status}</span>
      <span>주문 시간: ${data.data[i].createdAt}</span>
    </div>
  </li>
  `;
    const orderList = document.getElementById("orderList");
    orderList.insertAdjacentHTML("beforeend", orderElement);
  }

  const socket = io(`http://localhost:5000`, {
    auth: {
      token: accessToken,
    },
  });

  // 주문 상태 변경시 알람
  socket.on("orderStatusUpdate", (order) => {
    console.log(order);
    const orderElement = document.getElementById(`order-${order.orderId}`);
    if (orderElement) {
      orderElement.querySelector(".order-status").innerHTML =
        `주문 상태: ${order.status}`;
    }
  });

  socket.on("connect", () => {
    console.log(`${socket.id} 연결 성공`);
  });

  socket.on("disconnect", () => {
    console.log(`${socket.id} 연결 해제`);
  });
});

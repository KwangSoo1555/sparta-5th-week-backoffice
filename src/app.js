import express from "express";
import http from "http";
import { Server } from "socket.io";
import { ENV } from "./constants/env.constant.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";
import { HTTP_STATUS } from "./constants/http-status.constant.js";
import { apiRouter } from "./routers/index.js";
import path from "path";
import cors from "cors";
import { fileURLToPath } from "url";
import { isValidToken } from "./utils/token.util.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// 최상위 경로
const basePath = path.join(__dirname, "public");

const app = express();

const server = http.createServer(app); // http 서버 생성
const allowedOrigins = ["http://localhost:3003", "http://127.0.0.1:3003"];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
}); // socket.io 서버 생성

// CORS 설정 업데이트
app.use(cors({ origin: allowedOrigins })); // 백엔드에서 CORS 설정해줘야함.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health-check", (req, res) => {
  return res.status(HTTP_STATUS.OK).send(`I'm healthy.`);
});

app.use("/api", apiRouter);

app.use(errorHandler);

app.use("/static", express.static(basePath)); // public 폴더에 정적 파일 서빙
// socket.io 설정
io.use((socket, next) => {
  if (isValidToken(socket.handshake.auth.token)) {
    next();
  } else {
    next(new Error("Token is required"));
  }
});

io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
  });

  // 주문 상태 변경
  socket.on("orderStatusUpdate", (order) => {
    console.log("Order status updated", order);
    io.emit("orderStatusUpdate", order);
  });
});

// 서버 실행 : app.listen 대신 server.listen 사용
server.listen(ENV.SERVER_PORT, () => {
  console.log(`서버가 ${ENV.SERVER_PORT}번 포트에서 실행 중입니다.`);
});

import express from 'express';
import { prisma } from "../utils/prisma.util.js";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { requireAccessToken } from "../middlewares/socket-access-token.middleware.js";

import { StoresRepository } from "../repositories/stores.repository.js";
import { StoresService } from "../services/stores.service.js";
import { StoresController } from "../controllers/stores.controller.js";

const socketRouter = express();
const storesRouter = express.Router();

const storesRepository = new StoresRepository(prisma);
const storesService = new StoresService(storesRepository);
const storesController = new StoresController(storesService);

const server = createServer(socketRouter);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

socketRouter.use('/ownerOrder', (req, res) => {
  res.sendFile(join(__dirname, '../owner.html'));
});

socketRouter.use('/customerOrder', (req, res) => {
  res.sendFile(join(__dirname, '../customer.html'));
});

// Apply the middleware for all connections
io.use(requireAccessToken);

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log(`User connected with ID: ${socket.id}`);

  io.emit("message", `${socket.id} 님이 연결되었습니다.`);

  // Message event listener
  socket.on("message",async (msg) => {
    io.emit("message", `${socket.id}: ${msg}`);

    // Create custom req and res objects
    const req = {
        body: {
          userId: socket.user, // Example, adapt this as needed
        },
      };
      const res = {
        status: (statusCode) => ({
          json: (data) => {
            console.log(`Response: ${statusCode}`, data);
          },
        }),
        json: (data) => {
          console.log('Response:', data);
        },
      };
  
      // Call the updateOrderStatus method
      try {
        console.log(await storesController.findStoreByUserId(req, res));
      } catch (error) {
        console.error('Error updating order status:', error);
      }

    console.log(msg);
  });

  socket.on("disconnect", () => {
    socket.broadcast.emit("message", `${socket.id} 님의 연결이 끊어졌습니다.`);
  });
});

server.listen(3001, () => {
  console.log(`서버가 ${3001}번 포트에서 실행 중입니다.`);
});

export { socketRouter };
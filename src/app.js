import express from 'express';
import { ENV } from './constants/env.constant.js';
import { errorHandler } from './middlewares/error-handler.middleware.js';
import { HTTP_STATUS } from './constants/http-status.constant.js';
import { apiRouter } from './routers/index.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health-check', (req, res) => {
  return res.status(HTTP_STATUS.OK).send(`I'm healthy.`);
});

app.use('/api', apiRouter);

app.use(errorHandler);

app.listen(ENV.SERVER_PORT, () => {
  console.log(`서버가 ${ENV.SERVER_PORT}번 포트에서 실행 중입니다.`);
});

import http from 'http';
import Koa from 'koa';
import cors from 'kcors';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import SocketIo from 'socket.io';

import database from './database';
import router from './router';
import getRcon from './rcon';
import { registerConnLogger } from './sockets';

import getConfigs from '../config/getConfigs';

const appConfig = getConfigs([
  'MESSENGER_APP_SECRET',
  'MESSENGER_VALIDATION_TOKEN',
  'MESSENGER_PAGE_ACCESS_TOKEN',
  'SERVER_URL',
]);

const app = new Koa();
const server = http.createServer(app.callback());
const io = new SocketIo(server);
const rcon = getRcon(io);

app.use(logger());
app.use(async (ctx, next) => {
  ctx.db = database;
  ctx.state.appConfig = appConfig;
  ctx.io = io;
  await next();
});
app.use(cors());
app.use(bodyParser());

app.use(router.routes());
app.use(router.allowedMethods());

server.listen(process.env.PORT, () => {
  let addr;
  try {
    addr = server.address();
    registerConnLogger(io);
  } catch (err) {
    console.log(err);
  } finally {
    console.log(`Koa server started at port ${addr.port}`);
  }
});

export default app;

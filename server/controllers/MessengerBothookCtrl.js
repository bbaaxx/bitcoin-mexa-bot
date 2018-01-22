import messengerHookController, {
  hookRegisterCheck,
} from '../../messenger/hookController';

export default {
  async get(ctx, next) {
    const register = hookRegisterCheck(
      ctx.request.query,
      ctx.state.appConfig.MESSENGER_VALIDATION_TOKEN,
    );
    if (register) {
      ctx.body = register;
    } else {
      ctx.throw(403, '403 Error: not allowed');
    }
    await next();
  },
  async post(ctx, next) {
    const data = ctx.request.body;
    await messengerHookController(data, {
      config: ctx.appConfig,
      db: ctx.db,
      io: ctx.io,
      debug: ctx.debug,
    });
    await next();
    ctx.status = 200;
  },
};

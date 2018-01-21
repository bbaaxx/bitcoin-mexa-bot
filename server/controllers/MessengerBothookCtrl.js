import handle from '../../messenger/handlers';

const handlerMapping = {
  optin: 'authentication',
  message: 'message',
  delivery: 'deliveryConfirmation',
  postback: 'postback',
  read: 'messageRead',
  account_linking: 'accountLink'
};

function inferActionType(messagingEvent) {
  let type = 'unknown';
  const eventKeys = Object.keys(messagingEvent);
  const messageTypes = Object.keys(handlerMapping);

  for (let i = 0; i < messageTypes.length; i += 1) {
    if (eventKeys.find(key => Boolean(key === messageTypes[i]))) {
      type = messageTypes[i];
    }
  }

  return {
    type,
    messagingEvent
  };
}

const messagingEventProcessor = ctx => messagingEvent => {
  const event = inferActionType(messagingEvent);
  if (Object.keys(handlerMapping).includes(event.type)) {
    handle[handlerMapping[event.type]](messagingEvent, ctx);
  } else {
    console.error('Bothook received unknown messagingEvent: ', messagingEvent);
  }
};

const processEntry = ctx => pageEntry => {
  const pageID = pageEntry.id;
  const timeOfEvent = pageEntry.time;
  if (Array.isArray(pageEntry.messaging)) {
    pageEntry.messaging.forEach(messagingEventProcessor(ctx));
  }
};

export default {
  async get(ctx, next) {
    const { query } = ctx.request;
    const { appConfig } = ctx.state;
    if (
      query['hub.mode'] === 'subscribe' &&
      query['hub.verify_token'] === appConfig.MESSENGER_VALIDATION_TOKEN
    ) {
      ctx.body = query['hub.challenge'];
    } else {
      ctx.throw(403, '403 Error: not allowed');
    }
    await next();
  },
  async post(ctx, next) {
    const data = ctx.request.body;
    if (data.object === 'page' && Array.isArray(data.entry)) {
      // Data.entry should be an array as there can be multiple entries
      data.entry.forEach(processEntry(ctx));
    }
    await next();
    ctx.status = 200;
  }
};

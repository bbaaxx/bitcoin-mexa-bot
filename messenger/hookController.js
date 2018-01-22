import handle from './handlers';

const handlerMapping = {
  optin: 'authentication',
  message: 'message',
  delivery: 'deliveryConfirmation',
  postback: 'postback',
  read: 'messageRead',
  account_linking: 'accountLink',
};

export default function(data, app) {
  return new Promise((resolve, reject) => {
    try {
      if (data.object === 'page' && Array.isArray(data.entry)) {
        // Data.entry is an array as there can be multiple entries
        data.entry.forEach(processEntry(app));
        resolve(true);
      } else {
        throw new Error(
          `Message expected to come from a page but instead got ${data.object}`,
        );
      }
    } catch (e) {
      reject(e);
    }
  });
}

export function hookRegisterCheck(query, token) {
  return query['hub.mode'] === 'subscribe' &&
    query['hub.verify_token'] === token
    ? query['hub.challenge']
    : false;
}

function processEntry(app) {
  return pageEntry => {
    const pageID = pageEntry.id;
    const timeOfEvent = pageEntry.time;
    if (Array.isArray(pageEntry.messaging)) {
      pageEntry.messaging.forEach(applyHandler(app));
    } else {
      console.warn('No message was found on the event data.');
    }
  };
}

function applyHandler(app) {
  return messagingEvent => {
    const event = inferActionType(messagingEvent);
    if (Object.keys(handlerMapping).includes(event.type)) {
      // This line calls the handler
      handle[handlerMapping[event.type]](messagingEvent, app);
    } else {
      console.error(
        'Bothook received an unknown messagingEvent: ',
        messagingEvent,
      );
    }
  };
}

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
    messagingEvent,
  };
}

function flattenEventData(event) {
  const { message } = event;
  return {
    message,
    senderID: event.sender.id,
    recipientID: event.recipient.id,
    timeOfMessage: event.timestamp,
    isEcho: message.is_echo,
    messageId: message.mid,
    appId: message.app_id,
    metadata: message.metadata,
    messageText: message.text,
    messageAttachments: message.attachments,
    quickReply: message.quick_reply,
  };
}

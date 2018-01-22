import classifyIntent from '../../brains/classifyIntent';

import handleEcho from './handleEcho';
import handleQuickReply from './handleQuickReply';
import handleAttachment from './handleAttachment';

/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message'
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 */
export default function handleMessage(event) {
  const eventData = flattenEventData(event);
  const {
    senderID,
    recipientID,
    timeOfMessage,
    message,
    isEcho,
    messageId,
    appId,
    metadata,
    messageText,
    messageAttachments,
    quickReply,
  } = eventData;

  if (isEcho) {
    return handleEcho(eventData);
  }
  if (quickReply) {
    return handleQuickReply(eventData);
  }
  if (messageAttachments) {
    return handleAttachment(eventData);
  }
  if (messageText) {
    const reaction = classifyIntent(eventData);
    // ctx.rcon(reaction);
  }
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

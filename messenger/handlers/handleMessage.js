import sendTextMessage from '../send/sendTextMessage';
import callSendAPI from '../send/callSendAPI';

import classifyIntent from '../../brains/classifyIntent';

import * as sapiex from '../send/examples';

/*
 * Message Event
 *
 * This event is called when a message is sent to your page. The 'message'
 * object format can vary depending on the kind of message that was received.
 * Read more at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-received
 *
 * For this example, we're going to echo any text that we get. If we get some
 * special keywords ('button', 'generic', 'receipt'), then we'll send back
 * examples of those bubbles to illustrate the special message bubbles we've
 * created. If we receive a message with an attachment (image, video, audio),
 * then we'll simply confirm that we've received the attachment.
 *
 */
export default function handleMessage(event, ctx) {
  ctx.rcon('Message handler says HI !!!!!!!');
  ctx.rcon(event);

  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  // ctx.rcon(`Received message for user ${senderID} and page ${recipientID} at ${timeOfMessage} with message:`);
  // ctx.rcon(message);

  const isEcho = message.is_echo;
  const messageId = message.mid;
  const appId = message.app_id;
  const metadata = message.metadata;

  // You may get a text or attachment but not both
  const messageText = message.text;
  const messageAttachments = message.attachments;
  const quickReply = message.quick_reply;

  if (isEcho) {
    // Just logging message echoes to console
    return ctx.rcon(
      `Received echo for message ${messageId} and app ${appId} with metadata ${metadata}`
    );
  } else if (quickReply) {
    const quickReplyPayload = quickReply.payload;
    ctx.rcon(
      `Quick reply for message ${messageId} with payload ${quickReplyPayload}`
    );
    return sendTextMessage(senderID, 'Quick reply tapped');
  } else if (messageAttachments) {
    return sendTextMessage(senderID, 'Message with attachment received');
  }

  const reaction = classifyIntent(message);

  ctx.rcon('----> reaction <-----');
  ctx.rcon(reaction);

  if (messageText) {
    // If we receive a text message, check to see if it matches any special
    // keywords and send back the corresponding example. Otherwise, just echo
    // the text we received.
    switch (messageText
      .replace(/[^\w\s]/gi, '')
      .trim()
      .toLowerCase()) {
      case 'hello':
      case 'hi':
        return sapiex.sendHiMessage(senderID);
      case 'image':
        return sapiex.requiresServerURL(sapiex.sendImageMessage, [senderID]);
      case 'gif':
        return sapiex.requiresServerURL(sapiex.sendGifMessage, [senderID]);
      case 'audio':
        return sapiex.requiresServerURL(sapiex.sendAudioMessage, [senderID]);
      case 'video':
        return sapiex.requiresServerURL(sapiex.sendVideoMessage, [senderID]);
      case 'file':
        return sapiex.requiresServerURL(sapiex.sendFileMessage, [senderID]);
      case 'button':
        return sapiex.sendButtonMessage(senderID);
      case 'generic':
        return sapiex.requiresServerURL(sapiex.sendGenericMessage, [senderID]);
      case 'receipt':
        return sapiex.requiresServerURL(sapiex.sendReceiptMessage, [senderID]);
      case 'quick reply':
        return sapiex.sendQuickReply(senderID);
      case 'read receipt':
        return sapiex.sendReadReceipt(senderID);
      case 'typing on':
        return sapiex.sendTypingOn(senderID);
      case 'typing off':
        return sapiex.sendTypingOff(senderID);
      case 'account linking':
        return sapiex.requiresServerURL(sapiex.sendAccountLinking, [senderID]);
      default:
        return sendTextMessage(senderID, messageText);
    }
  }
}

import sendTextMessage from '../messenger/send/sendTextMessage';
import callSendAPI from '../messenger/send/callSendAPI';
import * as sapiex from '../messenger/send/examples';

export default () => ({
  'hello-message': '',
});

function sanitizeMessageText(messageText) {
  console.log(';;;;;;;;;;;;;;;;;', messageText);
  return messageText
    .replace(/[^\w\s]/gi, '')
    .trim()
    .toLowerCase();
}

export function triggerStaticAction(data) {
  const { senderID, message, messageText, recipientID, timeOfMessage } = data;

  const text = sanitizeMessageText(messageText);

  switch (text) {
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

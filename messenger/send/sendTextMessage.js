import callSendAPI from './callSendAPI';
/*
 * Send a text message using the Send API.
 *
 */
export default function sendTextMessage(
  recipientId,
  messageText,
  metadata = '',
) {
  var messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
      metadata: metadata,
    },
  };

  callSendAPI(messageData);
}

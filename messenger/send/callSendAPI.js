import rp from 'request-promise-native';

/*
 * Call the Send API. The message data goes in the body. If successful, we'll
 * get the message id in a response
 *
 */
export default function callSendAPI(messageData) {
  rp({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: process.env.MESSENGER_PAGE_ACCESS_TOKEN },
    method: 'POST',
    json: messageData
  })
    .then(response => {
      const messageId = response['message_id'];
      const recipientId = response['recipient_id'];
      // if (messageId) {
      //   console.log(`Successfully sent message with id ${messageId} to recipient ${recipientId}`);
      // }
      // else {
      //   console.log(`Successfully called Send API for recipient ${recipientId}`);
      // }
    })
    .catch(err => console.error(err));
}

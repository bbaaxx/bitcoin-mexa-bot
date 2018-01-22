import sendTextMessage from '../send/sendTextMessage';

export default eventData =>
  sendTextMessage(eventData.senderID, 'Message with attachment received');

import sendTextMessage from '../send/sendTextMessage';

export default eventData => {
  const { messageId } = eventData;
  const { payload } = eventData.quickReply;
  console.log(`Quick reply for message ${messageId} with payload ${payload}`);
  return sendTextMessage(senderID, 'Quick reply tapped');
};

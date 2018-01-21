import message from '../../messenger/handlers/handleMessage';
import authentication from '../../messenger/handlers/handleAuthentication';
import deliveryConfirmation from '../../messenger/handlers/handleDeliveryConfirmation';
import postback from '../../messenger/handlers/handlePostback';
import messageRead from '../../messenger/handlers/handleMessageRead';
import accountLink from '../../messenger/handlers/handleAccountLink';

export default {
  message,
  authentication,
  deliveryConfirmation,
  postback,
  messageRead,
  accountLink
};

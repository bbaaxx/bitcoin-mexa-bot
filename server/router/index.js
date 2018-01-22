import Router from 'koa-router';
import staticServe from 'koa-static';

import MessengerBothookCtrl from '../controllers/MessengerBothookCtrl';
import AuthController from '../controllers/AuthCtrl';
import verifyRequestSignature from '../../messenger/helpers/verifyRequestSignature';

const router = new Router();

router
  .get('/messenger-bothook', MessengerBothookCtrl.get)
  .post(
    '/messenger-bothook',
    verifyRequestSignature(),
    MessengerBothookCtrl.post,
  )
  .get('/authorize', AuthController.get)
  .get('/*', staticServe('public'));

export default router;

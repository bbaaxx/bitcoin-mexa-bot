import crypto from 'crypto';

/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
export default () => async (ctx, next) => {
  const errorMsg = 'FATAL: Couldn\'t validate the request origin.';
  const signature = ctx.request.header['x-hub-signature'];
  const { rawBody } = ctx.request;
  
  if (typeof signature === 'undefined' || typeof rawBody === 'undefined') {
    throw new Error(errorMsg + ' Request signature or body missing' );
  }
  
  const { appConfig } = ctx.state;
  const [ _, sigHash ] = signature.split('=');
  const reqBuffer = Buffer.from(rawBody);
  const expectedHash = crypto
    .createHmac('sha1', appConfig.MESSENGER_APP_SECRET)
    .update(reqBuffer)
    .digest('hex');
  if (sigHash !== expectedHash ) {
    throw new Error(errorMsg);
  }
  await next();
}
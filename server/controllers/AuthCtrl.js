const getSuccessPage = (
  accountLinkingToken,
  redirectURI,
  redirectURISuccess
) => `
<html>
  <head>
    <title>OAuth Test</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style> div { margin: 10px 0px 10px 0px; } </style>
  </head>
  <body>
    <h1>Login</h1>
    <div>
      This should be a login page. If the user successfully logs, they should
      be redirect to this link: <a href="${redirectURISuccess}">Complete Account Link</a>
    </div>
    <div>Account linking token: ${accountLinkingToken}</div>
    <div>Redirect URI: ${redirectURI}</div>
    <div>Redirect URI Successful: ${redirectURISuccess}</div>
  </body>
</html>`;

export default {
  async get(ctx, next) {
    const { query } = ctx.request;
    const accountLinkingToken = query['account_linking_token'];
    const redirectURI = query['redirect_uri'];

    // Authorization Code should be generated per user by the developer. This will
    // be passed to the Account Linking callback.
    const authCode = '1234567890';

    const redirectURISuccess = `${redirectURI}&authorization_code=${authCode}`;
    await next();
    ctx.body = getSuccessPage(
      accountLinkingToken,
      redirectURI,
      redirectURISuccess
    );
  }
};

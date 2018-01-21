export default (appId, pageId) => `<html>
  <head>
    <title>Messenger Demo</title>
    <script src="https://polygit.org/components/webcomponentsjs/webcomponents-loader.js"></script>
    <link rel="import" href="dev-console.html">
    <script>
    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
    </script>
  </head>
  <body>

    <h1>Messenger Demo</h1>

    <div>
      <p>The "Send to Messenger" plugin will trigger an authentication callback to your webhook.</p>

      <div class="fb-send-to-messenger"
        messenger_app_id="${appId}"
        page_id="${pageId}"
        data-ref="PASS_THROUGH_PARAM"
        color="blue"
        size="large">
      </div>
    </div>
    <div>
      <p>The "Message Us" plugin takes the user directly to Messenger and into a thread with your Page.</p>
      <div class="fb-messengermessageus"
        messenger_app_id="${appId}"
        page_id="${pageId}"
        color="blue"
        size="large">
      </div>
    </div>

    <div>
      <dev-console></dev-console>
    </div>

    <div id="devConsole"></div>
    <script>
    window.fbAsyncInit = function() {
      FB.init({ appId: ${appId}, xfbml: true, version: 'v2.6' });
    };
    </script>
  </body>
</html>`;

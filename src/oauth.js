const { google } = require('googleapis');

const YOUR_CLIENT_ID =
  '269402700454-7jvnv6cikvgdtia963eoqtkakbq3o0vq.apps.googleusercontent.com';
const YOUR_CLIENT_SECRET = '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';

const YOUR_REDIRECT_URL = 'https://testsy.gitple.io';
// const YOUR_REDIRECT_URL = "https://testksw.gitple.io"
// const YOUR_REDIRECT_URL = "https://staging.gitple.io"

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/blogger',
  'https://www.googleapis.com/auth/calendar',
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

oauth2Client.on('tokens', (tokens) => {
  console.log('=== tokens', tokens);
});

// Retrieve access token
// With the code returned, you can ask for an access token as shown below:

// This will provide an object with the access_token and refresh_token.
// Save these somewhere safe so they can be used at a later time.
async function getToken(code) {
  const tokenResult = await oauth2Client.getToken(code).catch((e) => {
    console.error('=== getToken error', e);
    return {
      result: 'fail',
      error: e.response.data,
    };
  });

  if (tokenResult.result === 'fail') {
    console.log('config', {
      YOUR_CLIENT_ID,
      YOUR_CLIENT_SECRET,
      YOUR_REDIRECT_URL,
    });
    console.error('getToken error', tokenResult.error);
    return tokenResult;
  }
  oauth2Client.setCredentials(tokenResult.tokens);

  return {
    tokens: tokenResult.tokens,
    oauth2Client,
  };
}

exports.getToken = getToken;

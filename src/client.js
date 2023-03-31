const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const YOUR_CLIENT_ID = '';
const YOUR_CLIENT_SECRET = '';

const YOUR_REDIRECT_URL = 'https://testsy.gitple.io';
// const YOUR_REDIRECT_URL = "https://testksw.gitple.io"
// const YOUR_REDIRECT_URL = "https://staging.gitple.io"

const oauth2Client = new google.auth.OAuth2(
  YOUR_CLIENT_ID,
  YOUR_CLIENT_SECRET,
  YOUR_REDIRECT_URL
);

const tokenPath = path.join(__dirname, 'token.json');
const tokensBuffer = fs.readFileSync(tokenPath);
const tokens = JSON.parse(tokensBuffer.toString());
if (!tokens.access_token) {
  throw new Error('access_token is required');
}

oauth2Client.on('tokens', (tokens) => {
  console.log('=== token tokens', tokens);
  saveTokens({
    refresh_token: '',
    ...tokens,
  })
    .then((r) => {
      if (!r) {
        console.error('save token fail');
      }
      console.log('token saved at', tokenPath);
    })
    .catch((e) => {
      console.error('save token error', e);
    });
});

oauth2Client.setCredentials({
  refresh_token: '',
});

// set auth as a global default
google.options({
  auth: oauth2Client,
});

async function saveTokens(payload) {
  fs.writeFileSync(tokenPath, JSON.stringify(payload));
  return true;
}
exports.oauth2Client = oauth2Client;
exports.google = google;

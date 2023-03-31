const { google, oauth2Client } = require('./client');

const drive = google.drive({
  version: 'v3',
});

async function getSpreadsheets() {
  const { files } = await drive.files
    .list({
      q: "mimeType='application/vnd.google-apps.spreadsheet'",
      fields: 'nextPageToken, files(id, name)',
      spaces: 'drive',
      // q: "mimeType=application/vnd.google-apps.spreadsheet",
      // fields: "nextPageToken, files(id, name)",
    })
    .then((r) => r.data);

  return files;
}

async function run() {
  let access_token = '';
  let count = 0;

  await getSpreadsheets()
    .then((data) => {
      console.log('=== sheet', data);
      count++;
    })
    .catch((e) => {
      console.error('=== error', e);
      console.error('=== error data', e.response.data);
    });

  access_token = '';
  oauth2Client.setCredentials({ access_token });
  await getSpreadsheets()
    .then((data) => {
      console.log('=== sheet', data);
      count++;
    })
    .catch((e) => {
      console.error('=== error', e);
      console.error('=== error data', e.response.data);
    });

  access_token = '';
  oauth2Client.setCredentials({ access_token });
  await getSpreadsheets()
    .then((data) => {
      console.log('=== sheet', data);
      count++;
    })
    .catch((e) => {
      console.error('=== error', e);
      console.error('=== error data', e.response.data);
    });

  oauth2Client.setCredentials({
    access_token: '',
  });
  await getSpreadsheets()
    .then((data) => {
      console.log('=== sheet', data);
      count++;
    })
    .catch((e) => {
      // console.error('=== error', e);
      console.error('=== error data', e.response.data);
    });

  access_token = '';
  oauth2Client.setCredentials({ access_token });
  await getSpreadsheets()
    .then((data) => {
      console.log('=== sheet', data);
      count++;
    })
    .catch((e) => {
      // console.error('=== error', e);
      console.error('=== error data', e.response.data);
    });

  access_token = '';
  oauth2Client.setCredentials({ access_token });
  await getSpreadsheets()
    .then((data) => {
      console.log('=== sheet', data);
      count++;
    })
    .catch((e) => {
      // console.error('=== error', e);
      console.error('=== error data', e.response.data);
      console.error('=== error token', access_token);
    });

  console.log('=== count', count);
}

run().then(() => console.log('=== done'));

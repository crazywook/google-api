const { google } = require('googleapis');
const { getToken } = require('./oauth');

const code = '';

async function main() {
  const { tokens, authClient } = await getToken(code);

  console.log('=== main tokens', tokens);

  // const drive = google.drive({ version: 'v3', auth: authClient });

  // const list = await drive.files.list();

  // console.log('=== list', list);
}

main()
  .then(() => {
    console.log('=== done');
  })
  .catch((e) => {
    console.error('=== error', e);
  });

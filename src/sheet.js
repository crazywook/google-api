const { google } = require('./client');

const { spreadsheets } = google.sheets({
  version: 'v4',
});

function getSpreadsheetById(spreadsheetId) {
  return spreadsheets
    .get({
      spreadsheetId,
    })
    .then((r) => r.data);
}

exports.getSpreadsheetById = getSpreadsheetById;

async function getSheets(request) {
  return spreadsheets.values
    .get(request)
    .then((r) => r.data)
    .catch((e) => {
      console.error('=== error statue', e.status);
      console.error('=== error statue text', e.statusText);
      console.error('=== error', e.response.data.error);
      console.error('=== error', e.response.data.error.errors);
      throw e;
    });
}
exports.getSheets = getSheets;

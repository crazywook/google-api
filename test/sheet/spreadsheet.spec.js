const { expect } = require('chai');

const { getSpreadsheetById, getSheets } = require('../../src/sheet');

describe('Spreadsheet', () => {
  // const id = '1oF8D_2Icaum16gV9yV2zcsOjKK5ynPux9mfz1oympJs';
  // const id = '1nOQZOnH1sQliK5UPG0t7e0_wbnYnaVhdH3exUEiDapE';
  const id = '1fBilSgh5wwDKEEHHeU_5U2UhUl9sCTECa384qDiQaqs';

  it('should retrieve a spreadsheet', async () => {
    const sheets = await getSpreadsheetById(id)
      .then((r) => {
        // console.log('sheet', r);
        // r.sheets.forEach((s) => {
        //   console.log('sheet', s);
        // });
        return r.sheets.map(({ properties: p }) => {
          console.log('=== sheet', p);
          return {
            id: p.id,
            title: p.title,
          };
        });
      })
      .catch((e) => {
        console.error(e);
      });

    sheets.forEach((sheet) => {
      console.log('sheet', sheet);
      expect(sheet).has.property('id');
      expect(sheet).has.property('title');
    });
  });

  it('should retrieve a sheet by sheet id', async () => {
    const request = {
      spreadsheetId: '1nOQZOnH1sQliK5UPG0t7e0_wbnYnaVhdH3exUEiDapE',
      range: 'bot_data!A1:B',
    };

    const sheet = await getSheets(request);

    console.log('=== sheet', sheet.values);

    expect(sheet.values).to.be.exist;
  });
});

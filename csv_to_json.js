const csv = require('csv');
const json_export = require('jsonexport');
const fs = require('fs');
const path = require('path');


const parseCSV = async (str) => {
  return await new Promise((done) => {
    csv.parse(
      str,
      {
        relaxColumnCount: true,
        columns: true,
        skip_empty_lines: true,
      },
      function (err, output) {
        if (err) {
          throw err;
        }
        done(output);
      }
    );
  });
};
(async () => {
  /** @type {String[]} */
  const csvFiles = fs.readdirSync(path.resolve(__dirname, 'src', 'Data', 'csv'));
  for (let file of csvFiles) {
    /** @type {String} */
    const data = fs.readFileSync(path.join(__dirname, 'src', 'Data', 'csv', file), { encoding: 'ascii'});
    /** @type {Object} */
    const json = await parseCSV(data);
    fs.writeFileSync(path.join(__dirname, 'src', 'Data', 'json', file.replace('.csv', '.json')), JSON.stringify(json), { encoding: 'ascii' });
  }
})();
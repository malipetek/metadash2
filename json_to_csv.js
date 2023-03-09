const json_export = require('jsonexport');
const fs = require('fs');
const path = require('path');

(async () => {
  /** @type {String[]} */
  const jsonFiles = fs.readdirSync(path.resolve(__dirname, 'src', 'Data', 'json'));
  for (let file of jsonFiles) {
    /** @type {String} */
    const data = fs.readFileSync(path.join(__dirname, 'src', 'Data', 'json', file), { encoding: 'utf-8' });
    /** @type {Object} */
    const jsonData = JSON.parse(data);
    json_export(jsonData, {
      typeHandlers: {
        Array: function (value, index, parent) {
          return value.map(v => `${v}|`).join('');
        },
      }
    }, ((err, csv) => {
      if (err) {
        console.error(err);
      }
      fs.writeFileSync(path.join(__dirname, 'src', 'Data', 'csv', file.replace('.json', '.csv')), csv, { encoding: 'utf-8' });
    }))
  }
})();
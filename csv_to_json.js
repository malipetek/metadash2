const csv = require('csv');
const json_export = require('jsonexport');
const fs = require('fs');
const path = require('path');


const parseCSV = async (str, options) => {
  return await new Promise((done) => {
    csv.parse(
      str,
      {
        relaxColumnCount: true,
        columns: true,
        skip_empty_lines: true,
        ...options
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
    const data = fs.readFileSync(path.join(__dirname, 'src', 'Data', 'csv', file), {encoding: 'utf-8'});
    /** @type {Object} */
    const json = await parseCSV(data, {
      on_record: (record) => {
        if (Object.keys(record).map(key => record[key]).some(value => value.indexOf('|') > -1)) {
          for (let key in record) {
            if (record[key].indexOf('|') > -1) {
              record[key] = record[key].split('|').filter(v => !!v);
            }
          }
        }
        if (Object.keys(record).map(key => record[key]).some(value => value.indexOf('null') > -1)) {
          for (let key in record) {
            if (Array.isArray(record[key])) {
              console.log(key, record[key]);
              record[key] = record[key].map(v => v === 'null' ? null : v);
              console.log(key, record[key]);
            }
            if (record[key].indexOf('null') !== -1) {
              record[key] = null;
            }
          }
        }
        return record;
      }
    });
    fs.writeFileSync(path.join(__dirname, 'src', 'Data', 'json', file.replace('.csv', '.json')), JSON.stringify(json).replace(/,([^\s])/g, ', $1').replace(/":/g, '": '));
  }
})();
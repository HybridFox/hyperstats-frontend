const path = require("path");

const glob = require('glob')
const { gettextToI18next } = require('i18next-conv');
const { readFileSync, writeFileSync } = require('fs');
const dir = './src/assets/i18n';

const options = {};

function save(target) {
  return result => {
    writeFileSync(target, result);
  };
}

glob(dir + '/*.po', (err, files) => {
  if (err) {
    throw err;
  }

  files.forEach((file) => {
    const parsed = path.parse(file);
    gettextToI18next(parsed.name, readFileSync(file), options)
      .then(save(dir + `/${parsed.name}.json`));
  });
});

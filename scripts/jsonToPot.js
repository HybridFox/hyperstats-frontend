const { i18nextToPot } = require('i18next-conv');
const { readFileSync, writeFileSync } = require('fs');
const dir = './src/assets/i18n';

function save(target) {
  return result => {
    writeFileSync(target, result);
  };
}

const source = dir + '/template.json';
i18nextToPot('en', readFileSync(source), {})
  .then(save(dir + '/template.pot'));

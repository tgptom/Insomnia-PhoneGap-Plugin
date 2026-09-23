#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const target = process.argv[2];
if (!target) {
  throw new Error('Usage: node scripts/write-fixture-index.js <target-file>');
}

const output = `document.addEventListener('deviceready', function () {
  var plugin = window.plugins && window.plugins.insomnia;
  if (!plugin) {
    console.error('Insomnia plugin not found');
    return;
  }

  var onError = function (error) {
    console.error('Insomnia error', error);
  };

  plugin.keepAwake(function () {
    plugin.allowSleepAgain(function () {
      console.log('Insomnia smoke flow complete');
    }, onError);
  }, onError);
}, false);
`;

fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, output, 'utf8');

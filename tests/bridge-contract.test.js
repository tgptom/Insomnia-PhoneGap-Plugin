const assert = require('assert');
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const scriptPath = path.resolve(__dirname, '../www/Insomnia.js');
const script = fs.readFileSync(scriptPath, 'utf8');

const calls = [];
const constructors = [];
const context = {
  window: {},
  cordova: {
    exec: (...args) => calls.push(args),
    addConstructor: fn => constructors.push(fn)
  }
};

vm.createContext(context);
vm.runInContext(script, context);

assert.strictEqual(constructors.length, 1, 'Insomnia must register one constructor');
constructors[0]();

assert.ok(context.window.plugins, 'window.plugins must be created');
assert.ok(context.window.plugins.insomnia, 'plugin instance must be installed');
assert.strictEqual(typeof context.window.plugins.insomnia.keepAwake, 'function');
assert.strictEqual(typeof context.window.plugins.insomnia.allowSleepAgain, 'function');

const success = () => {};
const error = () => {};

context.window.plugins.insomnia.keepAwake(success, error);
context.window.plugins.insomnia.allowSleepAgain(success, error);

assert.strictEqual(calls.length, 2, 'expected two cordova.exec calls');

assert.strictEqual(calls[0][0], success);
assert.strictEqual(calls[0][1], error);
assert.strictEqual(calls[0][2], 'Insomnia');
assert.strictEqual(calls[0][3], 'keepAwake');
assert.ok(Array.isArray(calls[0][4]) && calls[0][4].length === 0);

assert.strictEqual(calls[1][0], success);
assert.strictEqual(calls[1][1], error);
assert.strictEqual(calls[1][2], 'Insomnia');
assert.strictEqual(calls[1][3], 'allowSleepAgain');
assert.ok(Array.isArray(calls[1][4]) && calls[1][4].length === 0);

console.log('Bridge contract checks passed.');

'use strict';

const webpackModifyMain = require('..');
const assert = require('assert').strict;

assert.strictEqual(webpackModifyMain(), 'Hello from webpackModifyMain');
console.info('webpackModifyMain tests passed');

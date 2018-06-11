'use strict';

const fooManager = require('../../src/managers/foo-manager');

module.exports = {
  loadFoo: data => fooManager.create({
    name: data.name || '',
    body: data.body || {}
  })
};

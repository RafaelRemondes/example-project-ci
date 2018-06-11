'use strict';

const AbstractManager = require('src/managers/abstract-manager');
const Foo = require('src/models/foo-model');

class FooManager extends AbstractManager {
  constructor() {
    super(Foo);
  }
}

module.exports = new FooManager();

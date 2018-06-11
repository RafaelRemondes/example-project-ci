'use strict';

const Model = require('src/models/abstract-model');

class Foo extends Model {
  static get tableName() {
    return 'foos';
  }
}

module.exports = Foo;

'use strict';

const { Model } = require('objection');
const knex = require('src/clients/knex-client');

Model.knex(knex);

module.exports = Model;

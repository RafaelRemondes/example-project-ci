'use strict';

const knex = require('../src/clients/knex-client');
const knexCleaner = require('knex-cleaner');

beforeAll(async () => {
  await knex.migrate.latest();
});

afterEach(async () => {
  jest.restoreAllMocks();

  await knexCleaner.clean(knex, { ignoreTables: 'migrations' });
});

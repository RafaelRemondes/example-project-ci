'use strict';

module.exports = require('knex')({
  client: 'pg',
  connection: {
    database: 'example_project_ci_db',
    host: '0.0.0.0',
    password: null,
    user: 'postgres'
  },
  migrations: {
    tableName: 'migrations'
  }
});

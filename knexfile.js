'use strict';

module.exports = {
  client: 'pg',
  connection: {
    database: 'example_project_ci_db',
    host: process.env.DB_HOST || '0.0.0.0',
    password: null,
    user: 'postgres'
  },
  migrations: {
    tableName: 'migrations'
  }
};

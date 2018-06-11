'use strict';

exports.up = knex => {
  return knex.schema.createTable('foos', table => {
    table
      .uuid('id')
      .defaultTo(knex.raw('uuid_generate_v4()'))
      .notNullable()
      .index();
    table.string('name').notNullable();
    table.jsonb('body').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = () => {};

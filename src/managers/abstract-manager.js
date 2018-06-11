'use strict';

module.exports = class AbstractManager {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data = {}) {
    return await this.repository
      .query()
      .insert(data)
      .returning('*');
  }

  async getAll(where = {}) {
    return await this.repository
      .query()
      .where(where);
  }
};

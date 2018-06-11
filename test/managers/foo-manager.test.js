'use strict';

const fixtures = require('../fixtures');
const fooManager = require('../../src/managers/foo-manager');

describe('FooManager', () => {
  for (let i = 0; i < 100; i++) {
    describe('create()', () => {
      it('should return a Foo', async () => {
        const result = await fooManager.create({ name: 'foo', body: {} });

        expect(result.name).toEqual('foo');
      });

      it('should store the created Foo', async () => {
        const result = await fooManager.create({ name: 'foo', body: {} });
        const foos = await fooManager.getAll({ name: 'foo' });

        expect(foos).toHaveLength(1);
        expect(foos[0].id).toEqual(result.id);
      });
    });
  }

  for (let i = 0; i < 10; i++) {
    describe('getAll()', () => {
      it('should get the persisted Foos', async () => {
        for (let j = 0; j < 1000; j++) {
          await fixtures.loadFoo({ name: 'foo' });
        }

        const foos = await fooManager.getAll({ name: 'foo' });

        expect(foos).toHaveLength(1000);
        expect(foos[0].name).toEqual('foo');
      }, 100000);
    });
  }
});

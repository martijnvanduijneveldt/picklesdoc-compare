import { assert } from 'chai';
import { DiffEle, DiffState, DiffUtil } from '../../src/util/diff.util';

class SimpleObject {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class SimpleCompareObject implements DiffEle {
  state: DiffState = DiffState.Exists;

  constructor(newEle: SimpleObject | undefined, oldEle: SimpleObject | undefined) {
  }
}

describe('DiffUtil', () => {
  describe('byKey', () => {
    it('Simple add at start', () => {
      const old1 = new SimpleObject('key1');
      const new1 = new SimpleObject('key2');

      const res = DiffUtil.arrayByKey<SimpleObject, SimpleCompareObject>(SimpleCompareObject, [new1, old1], [old1], 'name');
      assert.equal(res[0].state, DiffState.Added);
      assert.equal(res[1].state, DiffState.Exists);
    });
    it('Simple add at end', () => {
      const old1 = new SimpleObject('key1');
      const old2 = new SimpleObject('key2');
      const new1 = new SimpleObject('key3');

      const res = DiffUtil.arrayByKey<SimpleObject, SimpleCompareObject>(SimpleCompareObject, [old1, old2, new1], [old1, old2], 'name');
      assert.equal(res[0].state, DiffState.Exists);
      assert.equal(res[1].state, DiffState.Exists);
      assert.equal(res[2].state, DiffState.Added);
    });
    it('Simple add in middle', () => {
      const old1 = new SimpleObject('key1');
      const old2 = new SimpleObject('key2');
      const new1 = new SimpleObject('key3');

      const res = DiffUtil.arrayByKey<SimpleObject, SimpleCompareObject>(SimpleCompareObject, [old1, new1, old2], [old1, old2], 'name');
      assert.equal(res[0].state, DiffState.Exists);
      assert.equal(res[1].state, DiffState.Added);
      assert.equal(res[2].state, DiffState.Exists);
    });
  });
  // it('Features\\00BasicGherkin\\BasicGherkin.feature', () => {
  //   assert.deepEqual(res, expectedArr);
  // });
  // it('Features/00BasicGherkin/BasicGherkin.feature', () => {
  //   assert.deepEqual(res, expectedArr);
  // });
});

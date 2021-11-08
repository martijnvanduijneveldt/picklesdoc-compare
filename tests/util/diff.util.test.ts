import { assert } from 'chai';
import { DiffEle, DiffState, DiffUtil } from '../../src/util/diff.util';
import { JsDiffUtil } from '../../src/util/jsdiff.util';

class SimpleObject {
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

class SimpleCompareObject implements DiffEle {
  state: DiffState = DiffState.Exists;
  name: string;

  constructor(newEle: SimpleObject | null | undefined, oldEle: SimpleObject | null | undefined) {
    this.name = JsDiffUtil.diffWords(newEle?.name, oldEle?.name);
  }
}

const key1 = new SimpleObject('key1');
const key2 = new SimpleObject('key2');
const key3 = new SimpleObject('key3');

describe('DiffUtil', () => {
  describe('byKey', () => {
    it('New value', () => {
      const res = DiffUtil.arrayByKey<SimpleObject, SimpleCompareObject>(SimpleCompareObject, [key1], [], 'name');
      assert.equal(res[0].state, DiffState.Added);
      assert.equal(res[0].name, '<ins>key1</ins>');
    });
    it('Delete only', () => {
      const res = DiffUtil.arrayByKey<SimpleObject, SimpleCompareObject>(SimpleCompareObject, [], [key1], 'name');
      assert.equal(res[0].state, DiffState.Removed);
      assert.equal(res[0].name, '<del>key1</del>');
    });
    it('Simple add at start', () => {
      const res = DiffUtil.arrayByKey<SimpleObject, SimpleCompareObject>(SimpleCompareObject, [key1, key2], [key2], 'name');
      assert.equal(res[0].state, DiffState.Added);
      assert.equal(res[0].name, '<ins>key1</ins>');
      assert.equal(res[1].state, DiffState.Exists);
      assert.equal(res[1].name, 'key2');
    });
    it('Simple add at end', () => {
      const res = DiffUtil.arrayByKey<SimpleObject, SimpleCompareObject>(SimpleCompareObject, [key1, key2, key3], [key1, key2], 'name');
      assert.equal(res[0].state, DiffState.Exists);
      assert.equal(res[0].name, 'key1');
      assert.equal(res[1].state, DiffState.Exists);
      assert.equal(res[1].name, 'key2');
      assert.equal(res[2].state, DiffState.Added);
      assert.equal(res[2].name, '<ins>key3</ins>');
    });
    it('Simple add in middle', () => {
      const res = DiffUtil.arrayByKey<SimpleObject, SimpleCompareObject>(SimpleCompareObject, [key1, key3, key2], [key1, key2], 'name');
      assert.equal(res[0].state, DiffState.Exists);
      assert.equal(res[0].name, 'key1');
      assert.equal(res[1].state, DiffState.Added);
      assert.equal(res[1].name, '<ins>key3</ins>');
      assert.equal(res[2].state, DiffState.Exists);
      assert.equal(res[2].name, 'key2');
    });
  });

});

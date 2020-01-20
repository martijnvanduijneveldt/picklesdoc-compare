import { assert } from 'chai';
import { JsonTableCompare } from '../../src/compare-models/json-table-compare';
import { JsonTable } from '../../src/models/json-table';
import { JsonTestResult } from '../../src/models/json-test-result';
import { Comparable } from '../../src/helper-models/comparable';

describe('TableCompare', () => {
  it('Different length', () => {
    const oldTable = new JsonTable({ DataRows: [['a string', new JsonTestResult()]] });
    const newTable = new JsonTable({ DataRows: [['a string', 'another string', new JsonTestResult()]] });

    const res = new JsonTableCompare(newTable, oldTable);
    assert.equal(res.DataRows[0][0], 'a string');
    assert.equal(res.DataRows[0][1], '<ins>another string</ins>');

    assert.equal(res.DataRows[0][2].constructor.name, 'Comparable');

  });
});

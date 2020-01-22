import { assert } from 'chai';
import { JsonTableCompare } from '../../src/compare-models/json-table-compare';
import { JsonTable } from '../../src/models/json-table';
import { JsonTestResult } from '../../src/models/json-test-result';
import { Comparable } from '../../src/helper-models/comparable';

describe('TableCompare', () => {
  const singleCellTable = new JsonTable({ DataRows: [['a string', new JsonTestResult()]] });
  const doubleCellTable = new JsonTable({ DataRows: [['a string', 'another string', new JsonTestResult()]] });

  it('Test cell add', () => {
    const res = new JsonTableCompare(doubleCellTable, singleCellTable);
    assert.equal(res.DataRows[0][0], 'a string');
    assert.equal(res.DataRows[0][1], '<ins>another string</ins>');

    assert.equal(res.DataRows[0][2].constructor.name, 'Comparable');

  });
  it('Test cell delete', () => {
    const res = new JsonTableCompare(singleCellTable, doubleCellTable);
    assert.equal(res.DataRows[0][0], 'a string');
    assert.equal(res.DataRows[0][1], '<del>another string</del>');

    assert.equal(res.DataRows[0][2].constructor.name, 'Comparable');
  });
  it('Test with missing test result', () => {
    const withResultTable = new JsonTable({ DataRows: [['newValue', new JsonTestResult()]] });
    const withoutResultTable = new JsonTable({ DataRows: [['oldValue', 'some text']] });
    const res = new JsonTableCompare(withResultTable, withoutResultTable);
    assert.equal(res.DataRows[0][0], '<del>oldValue</del><ins>newValue</ins>');
    assert.equal(res.DataRows[0][1], '<del>some text</del>');
    assert.equal(res.DataRows[0][2].constructor.name, 'Comparable');
  });
  it('Test with missing test result different length', () => {
    const newTable = new JsonTable({ DataRows: [['newValue', 'same value', new JsonTestResult()]] });
    const oldTable = new JsonTable({ DataRows: [['oldValue', 'same value']] });
    const res = new JsonTableCompare(newTable, oldTable);
    assert.equal(res.DataRows[0][0], '<del>oldValue</del><ins>newValue</ins>');
    assert.equal(res.DataRows[0][1], 'same value');
    assert.equal(res.DataRows[0][2].constructor.name, 'Comparable');
  });
  it('Table without tests results', () => {
    const empty = new JsonTable({ DataRows: [] });
    const doubleRow = new JsonTable({ DataRows: [['row1'], ['row2']] });
    const res = new JsonTableCompare(doubleRow, empty);
    assert.equal(res.DataRows[0][0], '<ins>row1</ins>');
    assert.equal(res.DataRows[1][0], '<ins>row2</ins>');
  });

});

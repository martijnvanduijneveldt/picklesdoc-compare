import { it, describe, expect } from 'vitest';
import { JsonTableCompare } from '../../src/compare-models/json-table-compare';
import { JsonTable } from '../../src/models/json-table';
import { JsonTestResult } from '../../src/models/json-test-result';
import { Comparable } from '../../src/helper-models/comparable';

describe('TableCompare', () => {
  const singleCellTable = new JsonTable({ DataRows: [['a string', new JsonTestResult()]] });
  const doubleCellTable = new JsonTable({ DataRows: [['a string', 'another string', new JsonTestResult()]] });

  it('Test cell add', () => {
    const res = new JsonTableCompare(doubleCellTable, singleCellTable);
    expect(res.DataRows[0][0]).equal( 'a string');
    expect(res.DataRows[0][1]).equal( '<ins>another string</ins>');

    expect(res.DataRows[0][2].constructor.name).equal( 'Comparable');

  });
  it('Test cell delete', () => {
    const res = new JsonTableCompare(singleCellTable, doubleCellTable);
    expect(res.DataRows[0][0], 'a string');
    expect(res.DataRows[0][1], '<del>another string</del>');

    expect(res.DataRows[0][2].constructor.name).equal( 'Comparable');
  });
  it('Test with missing test result', () => {
    const withResultTable = new JsonTable({ DataRows: [['newValue', new JsonTestResult()]] });
    const withoutResultTable = new JsonTable({ DataRows: [['oldValue', 'some text']] });
    const res = new JsonTableCompare(withResultTable, withoutResultTable);
    expect(res.DataRows[0][0], '<del>oldValue</del><ins>newValue</ins>');
    expect(res.DataRows[0][1], '<del>some text</del>');
    expect(res.DataRows[0][2].constructor.name).equal( 'Comparable');
  });
  it('Test with missing test result different length', () => {
    const newTable = new JsonTable({ DataRows: [['newValue', 'same value', new JsonTestResult()]] });
    const oldTable = new JsonTable({ DataRows: [['oldValue', 'same value']] });
    const res = new JsonTableCompare(newTable, oldTable);
    expect(res.DataRows[0][0], '<del>oldValue</del><ins>newValue</ins>');
    expect(res.DataRows[0][1], 'same value');
    expect(res.DataRows[0][2].constructor.name).equal( 'Comparable');
  });
  it('Table without tests results', () => {
    const empty = new JsonTable({ DataRows: [] });
    const doubleRow = new JsonTable({ DataRows: [['row1'], ['row2']] });
    const res = new JsonTableCompare(doubleRow, empty);
    expect(res.DataRows[0][0], '<ins>row1</ins>');
    expect(res.DataRows[1][0], '<ins>row2</ins>');
  });
  it('Test new table', ()=>{
    const doubleRow = new JsonTable({ DataRows: [['row1'], ['row2']] });
    const res = new JsonTableCompare(doubleRow, null);
    expect(res.DataRows[0][0], '<ins>row1</ins>');
    expect(res.DataRows[1][0], '<ins>row2</ins>');
  })
});

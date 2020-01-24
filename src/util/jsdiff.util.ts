import { diffWords, Change } from 'diff';
import { JsonTableDataRow } from '../models/json-table';
import { JsonTableDataRowCompare } from '../compare-models/json-table-compare';
import { Comparable } from '../helper-models/comparable';
import { JsonTestResult } from '../models/json-test-result';
import { DiffEle } from './diff.util';

function isJsonTestResult(toBeDetermined: JsonTableDataRow): toBeDetermined is JsonTestResult {
  return toBeDetermined instanceof JsonTestResult;
}

export class JsDiffUtil {
  static fullDiff(oldStr: string | null | undefined, newStr: string | null | undefined): string {
    if (oldStr !== newStr) {
      if (!oldStr) {
        return `<ins>${newStr}</ins>`;
      }
      if (!newStr) {
        return `<del>${oldStr}</del>`;
      }
      return `<del>${oldStr}</del><ins>${newStr}</ins>`;
    }
    return oldStr ? oldStr : '';
  }

  static diffMarkdown(newStr: string | null | undefined, oldStr: string | null | undefined): string {
    return oldStr ? oldStr : '';
  }

  static diffWords(newStr: string | null | undefined, oldStr: string | null | undefined): string {
    const parts = diffWords(oldStr ? oldStr : '', newStr ? newStr : '');
    const output = parts.map(p => JsDiffUtil.getChangeVal(p));
    return output.join('');
  }

  static diffArrayByIndex(newArray: string[] | undefined, oldArray: string[] | undefined): string[] {
    let i = 0;
    const result: string[] = [];
    const oldArr = oldArray ? oldArray : [];
    const newArr = newArray ? newArray : [];

    while (i < oldArr.length && i < newArr.length) {
      result[i] = JsDiffUtil.diffWords(oldArr[i], newArr[i]);
      i += 1;
    }

    for (i; i < oldArr.length; i += 1) {
      result[i] = `<del>${oldArr[i]}</del>`;
    }

    for (i; i < newArr.length; i += 1) {
      result[i] = `<ins>${newArr[i]}</ins>`;
    }
    return result;
  }

  private static diffDataRow(
    newArray: JsonTableDataRow[] | undefined,
    oldArray: JsonTableDataRow[] | undefined,
  ): JsonTableDataRowCompare[] {
    let i = 0;
    const result: JsonTableDataRowCompare[] = [];
    const oldArr = oldArray ? oldArray : [];
    const newArr = newArray ? newArray : [];

    let oldLastCell: JsonTestResult | undefined = undefined;
    let newLastCell: JsonTestResult | undefined = undefined;

    let oldLength = oldArr.length;
    if (isJsonTestResult(oldArr[oldLength - 1])) {
      oldLastCell = oldArr[oldLength - 1] as JsonTestResult;
      oldLength -= 1;
    }

    let newLength = newArr.length;
    if (isJsonTestResult(newArr[newLength - 1])) {
      newLastCell = newArr[newLength - 1] as JsonTestResult;
      newLength -= 1;
    }

    while (i < oldLength && i < newLength) {
      result[i] = JsDiffUtil.diffWords(newArr[i] as string, oldArr[i] as string);
      i += 1;
    }

    for (i; i < oldLength; i += 1) {
      result[i] = `<del>${oldArr[i]}</del>`;
    }

    for (i; i < newLength; i += 1) {
      result[i] = `<ins>${newArr[i]}</ins>`;
    }

    if (oldLastCell || newLastCell) {
      result.push(new Comparable(newLastCell, oldLastCell));
    }

    return result;
  }

  static diffNesterDataRows(
    newArray: JsonTableDataRow[][] | undefined,
    oldArray: JsonTableDataRow[][] | undefined,
  ): JsonTableDataRowCompare[][] {
    let i = 0;
    const result: JsonTableDataRowCompare[][] = [];

    const oldArr = oldArray ? oldArray : [];
    const newArr = newArray ? newArray : [];

    while (i < oldArr.length && i < newArr.length) {
      result[i] = this.diffDataRow(newArr[i], oldArr[i]);
      i += 1;
    }

    for (i; i < oldArr.length; i += 1) {
      result[i] = this.diffDataRow(undefined, oldArr[i]);
    }

    for (i; i < newArr.length; i += 1) {
      result[i] = this.diffDataRow(newArr[i], undefined);
    }

    return result;
  }

  private static getChangeVal(change: Change): string {
    if (change.added) {
      return `<ins>${change.value}</ins>`;
    }
    if (change.removed) {
      return `<del>${change.value}</del>`;
    }
    return change.value;
  }
}

import { diffWords, Change } from 'diff';
import { JsonTableDataRow } from '../models/json-table';
import { JsonTableDataRowCompare } from '../compare-models/json-table-compare';
import { Comparable } from '../helper-models/comparable';
import { JsonTestResult } from '../models/json-test-result';

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

    const oldLengthWithoutTests = oldArr.length - 1;
    const newLengthWithoutTests = newArr.length - 1;

    while (i < oldLengthWithoutTests && i < newLengthWithoutTests) {
      result[i] = JsDiffUtil.diffWords(oldArr[i] as string, newArr[i] as string);
      i += 1;
    }

    for (i; i < oldLengthWithoutTests; i += 1) {
      result[i] = `<del>${oldArr[i]}</del>`;
    }

    for (i; i < newLengthWithoutTests; i += 1) {
      result[i] = `<ins>${newArr[i]}</ins>`;
    }

    result[i] = new Comparable<JsonTestResult>(newArr[i] as JsonTestResult, oldArr[i] as JsonTestResult);

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

import { diffWords, Change } from 'diff';

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

  static diffArrayByIndex(newArr: string[] | undefined, oldArr: string[] | undefined): string[] {
    let i = 0;
    const result: string[] = [];
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

  static diffArrayNestedByIndex(oldArr: string[][] | undefined, newArr: string[][] | undefined): string[][] {
    let i = 0;
    const result: string[][] = [];
    while (i < oldArr.length && i < newArr.length) {
      result[i] = JsDiffUtil.diffArrayByIndex(oldArr[i], newArr[i]);
      i += 1;
    }

    for (i; i < oldArr.length; i += 1) {
      result[i] = oldArr[i].map(e => `<del>${e}</del>`);
    }

    for (i; i < newArr.length; i += 1) {
      result[i] = newArr[i].map(e => `<ins>${e}</ins>`);
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

import { JsonComment } from '../models/comment';
import { JsonCommentCompare } from '../compare-models/comment-compare';
import { JsDiffUtil } from './jsdiff.util';

export enum DiffState {
  Exists = 'Exists',
  Added = 'Added',
  Removed = 'Removed',
}

export interface DiffEle {
  state: DiffState;
}

export class DiffString implements DiffEle {
  value: string;
  state: DiffState;

  constructor(value: string, state: DiffState) {
    this.value = value;
    this.state = state;
  }
}

export class DiffUtil {
  public static getDefaultState(newEle: any, oldEle: any): DiffState {
    if (newEle && !oldEle) {
      return DiffState.Added;
    }
    if (!newEle && oldEle) {
      return DiffState.Removed;
    }
    return DiffState.Exists;
  }

  public static stringArrayCompare(newArray: string[] | undefined, oldArray: string[] | undefined): DiffString[] {
    const res: DiffString[] = [];

    const innerOld = oldArray === undefined ? [] : oldArray;
    const innerNew = newArray === undefined ? [] : newArray;

    for (const ele of innerOld) {
      const idx = innerNew.indexOf(ele);
      const diffEle = new DiffString(ele, idx !== -1 ? DiffState.Exists : DiffState.Removed);
      res.push(diffEle);
    }

    for (let i = 0; i < innerNew.length; i += 1) {
      const ele = innerNew[i];
      const idx = innerOld.indexOf(ele);
      if (idx === -1) {
        const diffEle = new DiffString(ele, DiffState.Added);
        res.splice(i, 0, diffEle);
      }
    }

    return res;
  }

  public static commentArrayCompare(
    newArray: JsonComment[] | undefined,
    oldArray: JsonComment[] | undefined,
  ): JsonCommentCompare[] {
    let i = 0;
    const result: JsonCommentCompare[] = [];
    const oldArr = oldArray ? oldArray : [];
    const newArr = newArray ? newArray : [];

    while (i < oldArr.length && i < newArr.length) {
      result[i] = new JsonCommentCompare(newArr[i], oldArr[i]);
      i += 1;
    }

    for (i; i < oldArr.length; i += 1) {
      result[i] = new JsonCommentCompare(undefined, oldArr[i]);
    }

    for (i; i < newArr.length; i += 1) {
      result[i] = new JsonCommentCompare(newArr[i], undefined);
    }
    return result;
  }

  public static arrayByKey<TBase, TCompare extends DiffEle>(
    type: new (newVal: TBase | null | undefined, oldVal: TBase | null | undefined) => TCompare,
    newArray: TBase[] | null | undefined,
    oldArray: TBase[] | null | undefined,
    key: keyof TBase,
  ): TCompare[] {
    const res: TCompare[] = [];

    const innerOld = oldArray === undefined || oldArray === null ? [] : oldArray;
    const innerNew = newArray === undefined || newArray === null ? [] : newArray;

    const innerNewKeys = innerNew.map(e => e[key]);
    const innerOldKeys = innerOld.map(e => e[key]);
    for (const ele of innerOld) {
      const idx = innerNewKeys.indexOf(ele[key]);
      const diffEle = new type(idx !== -1 ? innerNew[idx] : undefined, ele);
      diffEle.state = idx !== -1 ? DiffState.Exists : DiffState.Removed;
      res.push(diffEle);
    }

    for (let i = 0; i < innerNew.length; i += 1) {
      const ele = innerNew[i];
      const idx = innerOldKeys.indexOf(ele[key]);
      if (idx === -1) {
        const diffEle = new type(ele, innerOld[idx]);
        diffEle.state = DiffState.Added;
        res.splice(i, 0, diffEle);
      }
    }

    return res;
  }
}

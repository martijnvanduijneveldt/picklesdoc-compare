import { IEquals } from './i-equals';

export enum ComparableState {
  Matching = 'Matching',
  NotMatching = 'NotMatching',
  New = 'New',
  Old = 'Old',
}

export class Comparable<T extends IEquals<T>> {
  State: ComparableState;
  OldValue: T | undefined | null;
  Value: T | undefined | null;

  constructor(oldValue: T | undefined | null, newValue: T | undefined | null) {
    this.Value = newValue;
    this.OldValue = oldValue;

    if (oldValue === undefined || oldValue === null || newValue === undefined || newValue === null) {
      if ((oldValue === undefined || oldValue === null) && (newValue === undefined || newValue === null)) {
        this.State = ComparableState.Matching;
      } else if (oldValue === undefined || oldValue === null) {
        this.State = ComparableState.New;
      } else {
        this.State = ComparableState.Old;
      }
    } else {
      this.State = oldValue.equals(newValue) ? ComparableState.Matching : ComparableState.NotMatching;
    }

  }
}

export class ComparableString {
  State: ComparableState;
  OldValue: string | undefined;
  Value: string | undefined;

  constructor(oldValue: string | undefined, newValue: string | undefined) {
    this.Value = newValue;
    this.OldValue = oldValue;

    if (oldValue === undefined || newValue === undefined) {
      if (oldValue === undefined && newValue === undefined) {
        this.State = ComparableState.Matching;
      } else if (oldValue === undefined) {
        this.State = ComparableState.New;
      } else {
        this.State = ComparableState.Old;
      }
    } else {
      this.State = oldValue === newValue ? ComparableState.Matching : ComparableState.NotMatching;
    }

  }
}

import { JsonTable } from '../models/json-table';
import { JsDiffUtil } from '../util/jsdiff.util';
import { IJsonTestResult } from '../models/json-test-result';
import { Comparable } from '../helper-models/comparable';

export type JsonTableDataRowCompare = string | Comparable<IJsonTestResult>;

export class JsonTableCompare {
  HeaderRow: string[];
  DataRows: JsonTableDataRowCompare[][];

  constructor(newJson: JsonTable | null | undefined, oldJson: JsonTable | null | undefined) {
    this.HeaderRow = JsDiffUtil.diffArrayByIndex(newJson?.HeaderRow, oldJson?.HeaderRow);
    this.DataRows = JsDiffUtil.diffNesterDataRows(newJson?.DataRows, oldJson?.DataRows);
  }
}

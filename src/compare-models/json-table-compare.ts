import { IJsonTable } from '../models/json-table';
import { JsDiffUtil } from '../util/jsdiff.util';

export class JsonTableCompare {
  HeaderRow: string[];
  DataRows: string[][];

  constructor(newJson: IJsonTable | null | undefined, oldJson: IJsonTable | null | undefined) {
    this.HeaderRow = JsDiffUtil.diffArrayByIndex(newJson?.HeaderRow, oldJson?.HeaderRow);
    this.DataRows = JsDiffUtil.diffArrayNestedByIndex(newJson?.DataRows, oldJson?.DataRows);
  }
}

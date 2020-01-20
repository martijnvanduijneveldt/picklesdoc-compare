import { IJsonTestResult, JsonTestResult } from './json-test-result';

export type IJsonTableDataRow = undefined | string | IJsonTestResult;
export type JsonTableDataRow = undefined | string | JsonTestResult;

export interface IJsonTable {
  HeaderRow?: string[];
  DataRows?: IJsonTableDataRow[][];
}

export class JsonTable {
  HeaderRow: string[];
  DataRows: JsonTableDataRow[][];

  constructor(json: IJsonTable | null | undefined = undefined) {
    this.HeaderRow = json?.HeaderRow ? json.HeaderRow : [];
    this.DataRows = json?.DataRows ? json.DataRows.map(inner => inner.map(this.mapDataRow)) : [];
  }

  private mapDataRow(cell: IJsonTableDataRow | string): JsonTableDataRow {
    return typeof cell === 'string' ? (cell as string) : new JsonTestResult(cell);
  }
}

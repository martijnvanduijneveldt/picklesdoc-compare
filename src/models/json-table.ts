export interface IJsonTable {
  HeaderRow: string[];
  DataRows: string[][];
}

export class JsonTable {
  HeaderRow: string[];
  DataRows: string[][];

  constructor(json: IJsonTable | null = null) {
    this.HeaderRow = json ? json.HeaderRow : [];
    this.DataRows = json ? json.DataRows : [];
  }
}
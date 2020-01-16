export interface IJsonTable {
  HeaderRow?: string[];
  DataRows?: string[][];
}

export class JsonTable {
  HeaderRow: string[];
  DataRows: string[][];

  constructor(json: IJsonTable | null | undefined = undefined) {
    this.HeaderRow = json?.HeaderRow ? json.HeaderRow : [];
    this.DataRows = json?.DataRows ? json.DataRows : [];
  }
}

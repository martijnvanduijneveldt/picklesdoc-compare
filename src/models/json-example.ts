import { JsonTable } from './json-table';

export interface IJsonExample {
  Name?: string;
  Description?: string;
  TableArgument?: JsonTable;
  Tags?: string[];
  NativeKeyword?: string;
}

export class JsonExample {
  Name: string;
  Description: string;
  TableArgument: JsonTable;
  Tags: string[];
  NativeKeyword: string;

  constructor(json: IJsonExample | null | undefined = undefined) {
    this.Name = json?.Name ? json.Name : '';
    this.Description = json?.Description ? json.Description : '';
    this.TableArgument = json?.TableArgument ? new JsonTable(json.TableArgument) : new JsonTable();
    this.Tags = json?.Tags ? json.Tags : [];
    this.NativeKeyword = json?.NativeKeyword ? json.NativeKeyword : '';
  }
}

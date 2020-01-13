import { JsonTable } from './json-table';

export interface IJsonExample {
  Name: string;
  Description: string;
  TableArgument: JsonTable;
  Tags: string[];
  NativeKeyword: string;
}

export class JsonExample {
  Name: string;
  Description: string;
  TableArgument: JsonTable;
  Tags: string[];
  NativeKeyword: string;

  constructor(json: IJsonExample) {
    this.Name = json ? json.Name : '';
    this.Description = json ? json.Description : '';
    this.TableArgument = json ? new JsonTable(json.TableArgument) : new JsonTable();
    this.Tags = json ? json.Tags : [];
    this.NativeKeyword = json ? json.NativeKeyword : '';
  }
}

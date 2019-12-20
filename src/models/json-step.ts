import { JsonComment } from "./comment";
import { JsonKeyword } from "./json-keyword";
import { JsonTable } from "./json-table";

export interface IJsonStep {
  Keyword: JsonKeyword;
  NativeKeyword: string;
  Name: string;
  TableArgument: JsonTable;
  DocStringArgument: string;
  StepComments: JsonComment[];
  AfterLastStepComments: JsonComment[];
}

export class JsonStep implements IJsonStep {
  Keyword: JsonKeyword;
  NativeKeyword: string;
  Name: string;
  TableArgument: JsonTable;
  DocStringArgument: string;
  StepComments: JsonComment[];
  AfterLastStepComments: JsonComment[];

  constructor(json: IJsonStep) {
    this.Keyword = json.Keyword;
    this.NativeKeyword = json.NativeKeyword;
    this.Name = json.Name;
    this.TableArgument = new JsonTable(json.TableArgument);
    this.DocStringArgument = json.DocStringArgument;
    this.StepComments = json.StepComments.map(e => new JsonComment(e));
    this.AfterLastStepComments = json.AfterLastStepComments.map(e => new JsonComment(e));
  }
}
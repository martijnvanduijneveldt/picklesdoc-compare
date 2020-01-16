import { JsonComment } from './comment';
import { JsonKeyword } from './json-keyword';
import { JsonTable } from './json-table';

export interface IJsonStep {
  Keyword?: JsonKeyword | null;
  NativeKeyword?: string;
  Name?: string;
  TableArgument?: JsonTable;
  DocStringArgument?: string;
  StepComments?: JsonComment[];
  AfterLastStepComments?: JsonComment[];
}

export class JsonStep implements IJsonStep {
  Keyword: JsonKeyword | null;
  NativeKeyword: string;
  Name: string;
  TableArgument: JsonTable;
  DocStringArgument: string;
  StepComments: JsonComment[];
  AfterLastStepComments: JsonComment[];

  constructor(json: IJsonStep | null | undefined = undefined) {
    this.Keyword = json?.Keyword ? json.Keyword : null;
    this.NativeKeyword = json?.NativeKeyword ? json.NativeKeyword : '';
    this.Name = json?.Name ? json.Name : '';
    this.TableArgument = new JsonTable(json?.TableArgument);
    this.DocStringArgument = json?.DocStringArgument ? json.DocStringArgument : '';
    this.StepComments = json?.StepComments ? json.StepComments.map(e => new JsonComment(e)) : [];
    this.AfterLastStepComments = json?.AfterLastStepComments
      ? json.AfterLastStepComments.map(e => new JsonComment(e))
      : [];
  }
}

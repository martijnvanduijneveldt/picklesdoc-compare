import { DiffEle, DiffState, DiffUtil } from '../util/diff.util';
import { JsonTableCompare } from './json-table-compare';
import { JsonCommentCompare } from './comment-compare';
import { JsonStep } from '../models/json-step';
import { ComparableString } from '../helper-models/comparable';

export interface IJsonStepCompare extends DiffEle {
  state: DiffState;
}

export class JsonStepCompare implements IJsonStepCompare {
  Keyword: ComparableString;
  NativeKeyword: ComparableString;
  Name: string;
  TableArgument: JsonTableCompare;
  DocStringArgument: ComparableString;
  StepComments: JsonCommentCompare[];
  AfterLastStepComments: JsonCommentCompare[];

  state: DiffState;

  constructor(newJson: JsonStep | null | undefined, oldJson: JsonStep | null | undefined) {
    this.state = DiffUtil.getDefaultState(newJson, oldJson);
    this.Keyword = new ComparableString(newJson?.Keyword, oldJson?.Keyword);
    this.NativeKeyword = new ComparableString(newJson?.NativeKeyword, oldJson?.NativeKeyword);
    this.Name = oldJson?.Name ? oldJson.Name : newJson?.Name ? newJson.Name : '';
    this.TableArgument = new JsonTableCompare(newJson?.TableArgument, oldJson?.TableArgument);
    this.DocStringArgument = new ComparableString(newJson?.NativeKeyword, oldJson?.NativeKeyword);
    this.StepComments = DiffUtil.commentArrayCompare(newJson?.StepComments, oldJson?.StepComments);
    this.AfterLastStepComments = DiffUtil.commentArrayCompare(
      newJson?.AfterLastStepComments,
      oldJson?.AfterLastStepComments,
    );
  }
}

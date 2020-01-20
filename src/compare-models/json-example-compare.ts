import { JsonExample } from '../models/json-example';
import { DiffEle, DiffState, DiffUtil } from '../util/diff.util';
import { JsonTableCompare } from './json-table-compare';
import { JsDiffUtil } from '../util/jsdiff.util';

export class JsonExampleCompare implements DiffEle {
  Name: string;
  Description: string;
  TableArgument: JsonTableCompare;
  Tags: string[];
  NativeKeyword: string;
  state: DiffState;

  constructor(oldJson: JsonExample | null | undefined, newJson: JsonExample | null | undefined) {
    this.state = DiffUtil.getDefaultState(newJson, oldJson);
    this.Name = JsDiffUtil.diffWords(newJson?.Name, oldJson?.Name);
    this.Description = JsDiffUtil.diffMarkdown(newJson?.Description, oldJson?.Description);
    this.TableArgument = new JsonTableCompare(newJson?.TableArgument, oldJson?.TableArgument);
    this.Tags = JsDiffUtil.diffArrayByIndex(newJson?.Tags, oldJson?.Tags);
    this.NativeKeyword = JsDiffUtil.fullDiff(newJson?.NativeKeyword, oldJson?.NativeKeyword);
  }
}

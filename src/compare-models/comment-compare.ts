import { JsonComment } from '../models/comment';
import { JsDiffUtil } from '../util/jsdiff.util';
import { DiffEle, DiffState, DiffUtil } from '../util/diff.util';

export class JsonCommentCompare implements DiffEle {
  Text: string;
  state: DiffState;

  constructor(newJson: JsonComment | null | undefined, oldJson: JsonComment | null | undefined) {
    this.state = DiffUtil.getDefaultState(newJson, oldJson);
    this.Text = JsDiffUtil.diffWords(newJson?.Text, oldJson?.Text);
  }
}

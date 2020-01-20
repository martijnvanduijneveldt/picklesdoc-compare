import { JsonComment } from '../models/comment';
import { JsDiffUtil } from '../util/jsdiff.util';

export class JsonCommentCompare {
  Text: string;

  constructor(oldJson: JsonComment | null | undefined, newJson: JsonComment | null | undefined) {
    this.Text = JsDiffUtil.diffWords(newJson?.Text, oldJson?.Text);
  }
}

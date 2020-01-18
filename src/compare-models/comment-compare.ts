import { IJsonComment } from '../models/comment';
import { JsDiffUtil } from '../util/jsdiff.util';

export class JsonCommentCompare {
  Text: string;

  constructor(oldJson: IJsonComment | null | undefined, newJson: IJsonComment | null | undefined) {
    this.Text = JsDiffUtil.diffWords(newJson?.Text, oldJson?.Text);
  }
}

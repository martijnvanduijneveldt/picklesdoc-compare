export interface IJsonComment {
  Text: string;
}

export class JsonComment {
  Text: string;
  constructor(json: IJsonComment) {
    this.Text = json ? json.Text : '';
  }
}
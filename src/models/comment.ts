export interface IJsonComment {
  Text?: string;
}

export class JsonComment {
  Text: string;

  constructor(json: IJsonComment | null | undefined = undefined) {
    this.Text = json?.Text ? json.Text : '';
  }
}

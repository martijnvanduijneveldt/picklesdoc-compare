export interface ISummaryResult {
  Tags?: ITagWithTotals[];
  Folders?: IFolderWithTotals[];
  NotTestedFolders?: IFolderWithTotals[];
  ManualFolders?: IFolderWithTotals[];
  AutomatedFolders?: IFolderWithTotals[];
  Scenarios?: ITotals;
  Features?: ITotals;
  FolderWithTestKinds?: IFolderWithTestKinds[] | undefined | null;
}

export interface ITotals {
  Total: number;
  Passing: number;
  Failing: number;
  Inconclusive: number;
}

export interface IFolderWithTotals extends ITotals {
  Folder: string;
}

export interface ITagWithTotals extends ITotals {
  Tag: string;
}

export interface IFolderWithTestKinds {
  Folder: string;
  Total: number;
  Manual: number;
  Automated: number;
  NotTested: number;
}

export class SummaryResult implements ISummaryResult {
  AutomatedFolders: FolderWithTotals[];
  Features: Totals;
  FolderWithTestKinds: FolderWithTestKinds[];
  Folders: FolderWithTotals[];
  ManualFolders: FolderWithTotals[];
  NotTestedFolders: FolderWithTotals[];
  Scenarios: Totals;
  Tags: TagWithTotals[];

  constructor(json: ISummaryResult | undefined | null = undefined) {
    this.AutomatedFolders = json?.AutomatedFolders ? json.AutomatedFolders.map(e => new FolderWithTotals(e)) : [];
    this.Features = new Totals(json?.Features);
    this.FolderWithTestKinds = json?.FolderWithTestKinds
      ? json.FolderWithTestKinds.map(e => new FolderWithTestKinds(e))
      : [];
    this.Folders = json?.Folders ? json.Folders.map(e => new FolderWithTotals(e)) : [];
    this.ManualFolders = json && json.ManualFolders ? json.ManualFolders.map(e => new FolderWithTotals(e)) : [];
    this.NotTestedFolders =
      json && json.NotTestedFolders ? json.NotTestedFolders.map(e => new FolderWithTotals(e)) : [];
    this.Scenarios = new Totals(json?.Scenarios);
    this.Tags = json?.Tags ? json.Tags.map(e => new TagWithTotals(e)) : [];
  }
}

export class Totals implements ITotals {
  Failing: number;
  Inconclusive: number;
  Passing: number;
  Total: number;

  constructor(json: ITotals | undefined) {
    this.Failing = json ? json.Failing : 0;
    this.Inconclusive = json ? json.Inconclusive : 0;
    this.Passing = json ? json.Passing : 0;
    this.Total = json ? json.Total : 0;
  }
}

export class FolderWithTotals extends Totals implements IFolderWithTotals {
  Folder: string;

  constructor(json: IFolderWithTotals | undefined) {
    super(json);
    this.Folder = json ? json.Folder : '';
  }
}

export class TagWithTotals extends Totals implements ITagWithTotals {
  Tag: string;

  constructor(json: ITagWithTotals | undefined) {
    super(json);
    this.Tag = json ? json.Tag : '';
  }
}

export class FolderWithTestKinds implements IFolderWithTestKinds {
  Automated: number;
  Folder: string;
  Manual: number;
  NotTested: number;
  Total: number;

  constructor(json: IFolderWithTestKinds | undefined = undefined) {
    this.Automated = json ? json.Automated : 0;
    this.Folder = json ? json.Folder : '';
    this.Manual = json ? json.Manual : 0;
    this.NotTested = json ? json.NotTested : 0;
    this.Total = json ? json.Total : 0;
  }
}

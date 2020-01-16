import { ISummaryResult, SummaryResult } from './summary-generator';
import { IJsonFeatureWithMetaInfo, JsonFeatureWithMetaInfo } from './json-feature-with-meta-info';

export interface IDocumentation {
  Features?: IJsonFeatureWithMetaInfo[];
  Summary?: ISummaryResult;
  Configuration?: IConfiguration;
}

export interface IConfiguration {
  SutName?: string;
  SutVersion?: string;
  GeneratedOn?: string;
}

export class Documentation implements IDocumentation {
  Configuration: Configuration;
  Features: JsonFeatureWithMetaInfo[] = [];
  Summary: SummaryResult;

  constructor(json: IDocumentation | null | undefined = undefined) {
    this.Configuration = new Configuration(json?.Configuration);
    if (json?.Features) {
      this.Features = json.Features.map(e => new JsonFeatureWithMetaInfo(e));
    }
    this.Summary = new SummaryResult(json?.Summary);
  }
}

export class Configuration implements IConfiguration {
  GeneratedOn: string;
  SutName: string;
  SutVersion: string;

  constructor(json: IConfiguration | null | undefined = undefined) {
    this.GeneratedOn = json?.GeneratedOn ? json.GeneratedOn : '';
    this.SutName = json?.SutName ? json.SutName : '';
    this.SutVersion = json?.SutVersion ? json.SutVersion : '';
  }
}

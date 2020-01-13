import { ISummaryResult, SummaryResult } from './summary-generator';
import { IJsonFeatureWithMetaInfo, JsonFeatureWithMetaInfo } from './json-feature-with-meta-info';

export interface IDocumentation {
  Features: IJsonFeatureWithMetaInfo[];
  Summary: ISummaryResult;
  Configuration: IConfiguration;
}

export interface IConfiguration {
  SutName: string;
  SutVersion: string;
  GeneratedOn: string;
}

export class Documentation implements IDocumentation {
  Configuration: Configuration;
  Features: JsonFeatureWithMetaInfo[];
  Summary: SummaryResult;

  constructor(json: IDocumentation | undefined = undefined) {
    this.Configuration = new Configuration(json?.Configuration);
    this.Features = json ? json.Features.map(e => new JsonFeatureWithMetaInfo(e)): [];
    this.Summary = new SummaryResult(json?.Summary);
  }
}

export class Configuration implements IConfiguration {
  GeneratedOn: string;
  SutName: string;
  SutVersion: string;

  constructor(json: IConfiguration | undefined = undefined) {
    this.GeneratedOn = json ? json.GeneratedOn : '';
    this.SutName = json ? json.SutName : '';
    this.SutVersion = json ? json.SutVersion : '';
  }
}

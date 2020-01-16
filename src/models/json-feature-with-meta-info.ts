import { IJsonFeature, JsonFeature } from './feature';
import { IJsonTestResult, JsonTestResult } from './json-test-result';

export interface IJsonFeatureWithMetaInfo {
  RelativeFolder?: string;
  Feature?: IJsonFeature | null;
  Result?: IJsonTestResult;
}

export class JsonFeatureWithMetaInfo implements IJsonFeatureWithMetaInfo {
  RelativeFolder: string;
  Feature: JsonFeature | null;
  Result: JsonTestResult;

  constructor(json: IJsonFeatureWithMetaInfo | null | undefined = undefined) {
    this.RelativeFolder = json?.RelativeFolder ? json.RelativeFolder : '';
    this.Feature = json?.Feature ? new JsonFeature(json.Feature) : null;
    this.Result = new JsonTestResult(json?.Result);
  }
}

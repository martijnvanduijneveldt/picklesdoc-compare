import { IJsonFeature, JsonFeature } from './feature';
import { IJsonTestResult, JsonTestResult } from './json-test-result';

export interface IJsonFeatureWithMetaInfo{
  RelativeFolder: string;
  Feature: IJsonFeature;
  Result: IJsonTestResult;
}

export class JsonFeatureWithMetaInfo {
  RelativeFolder: string;
  Feature: JsonFeature;
  Result: JsonTestResult;

  constructor(json:IJsonFeatureWithMetaInfo) {
    this.RelativeFolder = json.RelativeFolder;
    this.Feature = json.Feature;
    this.Result = json.Result;
  }
}
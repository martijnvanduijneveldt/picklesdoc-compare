import { IJsonExample, JsonExample } from './json-example';
import { JsonTestResult, IJsonTestResult } from './json-test-result';
import { JsonStep, IJsonStep } from './json-step';

export interface IJsonFeature {
  FeatureElements?: IJsonScenarioOutline[];
  Background?: JsonScenario | null;
  Name?: string;
  Description?: string;
  Tags?: string[];
  Result?: JsonTestResult;
}

export class JsonFeature {
  FeatureElements: JsonScenarioOutline[];
  Background: JsonScenario | null;
  Name: string;
  Description: string;
  Tags: string[];
  Result: JsonTestResult;

  constructor(json: IJsonFeature | null | undefined = undefined) {
    this.Name = json?.Name ? json.Name : '';
    this.Description = json?.Description ? json.Description : '';
    this.FeatureElements = json?.FeatureElements ? json.FeatureElements.map(e => new JsonScenarioOutline(e)) : [];
    this.Background = json?.Background ? new JsonScenario(json.Background) : null;
    this.Tags = json?.Tags ? json.Tags : [];
    this.Result = new JsonTestResult(json?.Result);
  }
}

export interface IJsonFeatureElement {
  Name?: string | null;
  Slug?: string | null;
  Description?: string;
  Steps?: IJsonStep[];
  Tags?: string[];
  Result?: IJsonTestResult | null;
  Feature?: JsonFeature | null;
}

export class JsonScenario implements IJsonFeatureElement {
  Name: string;
  Slug: string;
  Description: string;
  Steps: JsonStep[] | undefined;
  Tags: string[];
  Result: JsonTestResult | null;
  Feature: JsonFeature | null;

  constructor(json: IJsonFeatureElement | null | undefined = undefined) {
    this.Name = json?.Name ? json.Name : '';
    this.Slug = json?.Slug ? json.Slug : '';
    this.Description = json?.Description ? json.Description : '';
    this.Steps = json?.Steps ? json.Steps.map(e => new JsonStep(e)) : [];
    this.Tags = json?.Tags ? json.Tags : [];
    this.Result = json ? new JsonTestResult(json.Result) : new JsonTestResult(null);
    this.Feature = json ? new JsonFeature(json.Feature) : new JsonFeature(null);
  }
}

export interface IJsonScenarioOutline extends IJsonFeatureElement {
  Examples?: IJsonExample[] | null;
}

export class JsonScenarioOutline extends JsonScenario implements IJsonScenarioOutline {
  Examples: JsonExample[];

  constructor(json: IJsonScenarioOutline | null | undefined = undefined) {
    super(json);
    this.Examples = json?.Examples ? json.Examples.map(e => new JsonExample(e)) : [];
  }
}

import { JsonExample } from './json-example';
import { JsonTestResult, IJsonTestResult } from './json-test-result';
import { JsonStep, IJsonStep } from './json-step';

export interface IJsonFeature {
  FeatureElements: IJsonScenarioOutline[];
  Background: JsonScenario;
  Name: string;
  Description: string;
  Tags: string[];
  Result: JsonTestResult;
}

export class JsonFeature {
  FeatureElements: IJsonScenarioOutline[];
  Background: JsonScenario;
  Name: string;
  Description: string;
  Tags: string[];
  Result: JsonTestResult;

  constructor(json: IJsonFeature | null = null) {
    this.Name = json ? json.Name : '';
    this.Description = json ? json.Description : '';
    this.FeatureElements = json ? json.FeatureElements.map(e => new JsonScenarioOutline(e)) : [];
    this.Background = json ? new JsonScenario(json.Background) : new JsonScenario();
    this.Tags = json ? json.Tags : [];
    this.Result = json ? json.Result : new JsonTestResult();
  }
}

export interface IJsonFeatureElement {
  Name: string;
  Slug: string;
  Description: string;
  Steps: IJsonStep[];
  Tags: string[];
  Result: IJsonTestResult;
  Feature: JsonFeature;
}

export class JsonScenario implements IJsonFeatureElement {
  Name: string;
  Slug: string;
  Description: string;
  Steps: JsonStep[];
  Tags: string[];
  Result: JsonTestResult;
  Feature: JsonFeature;

  constructor(json: IJsonFeatureElement | null = null) {
    this.Name = json ? json.Name : '';
    this.Slug = json ? json.Slug : '';
    this.Description = json ? json.Description : '';
    this.Steps = json ? json.Steps.map(e => new JsonStep(e)) : [];
    this.Tags = json ? json.Tags : [];
    this.Result = json ? new JsonTestResult(json.Result) : new JsonTestResult(null);
    this.Feature = json ? new JsonFeature(json.Feature) : new JsonFeature(null);
  }
}

export interface IJsonScenarioOutline extends IJsonFeatureElement {
  Examples: JsonExample[];
}

export class JsonScenarioOutline extends JsonScenario implements IJsonScenarioOutline {
  Examples: JsonExample[];

  constructor(json: IJsonScenarioOutline) {
    super(json);
    this.Examples = json ? json.Examples.map(e => new JsonExample(e)) : [];
  }
}
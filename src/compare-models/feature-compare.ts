import { JsonTestResult, IJsonTestResult } from '../models/json-test-result';
import {
  IJsonFeature,
  IJsonFeatureElement,
  IJsonScenarioOutline,
} from '../models/feature';
import { DiffEle, DiffState, DiffString, DiffUtil } from '../util/diff.util';
import { Comparable } from '../helper-models/comparable';
import { JsDiffUtil } from '../util/jsdiff.util';
import { JsonExampleCompare } from './json-example-compare';
import { IJsonStepCompare, JsonStepCompare } from './json-step-compare';

export class JsonFeatureCompare implements DiffEle {
  FeatureElements: IJsonScenarioOutlineCompare[];
  Background: JsonScenarioCompare | null;
  Name: string;
  Description: string;
  Tags: DiffString[];
  Result: Comparable<JsonTestResult>;

  state: DiffState;

  constructor(newJson: IJsonFeature | undefined | null, oldJson: IJsonFeature | undefined | null) {
    this.state = DiffUtil.getDefaultState(newJson, oldJson);
    this.Name = JsDiffUtil.diffWords(newJson?.Name, oldJson?.Name);
    this.Description = JsDiffUtil.diffMarkdown(newJson?.Description, oldJson?.Description);
    this.FeatureElements = DiffUtil.arrayByKey(JsonScenarioOutlineCompare, newJson?.FeatureElements,
                                               oldJson?.FeatureElements, 'Slug');
    this.Background = newJson?.Background || oldJson?.Background ?
      new JsonScenarioCompare(newJson?.Background, oldJson?.Background) : null;
    this.Tags = DiffUtil.stringArrayCompare(newJson?.Tags, oldJson?.Tags);
    this.Result = new Comparable<JsonTestResult>(newJson?.Result, oldJson?.Result);
  }
}

export interface IJsonFeatureElementCompare {
  Name: string;
  Slug: string;
  Description: string;
  Steps: IJsonStepCompare[];
  Tags: string[];
  Result: Comparable<JsonTestResult>;
  Feature: JsonFeatureCompare;
}

export class JsonScenarioCompare implements DiffEle {
  Name: string;
  Slug: string;
  Description: string;
  Steps: JsonStepCompare[];
  Tags: string[];
  Result: Comparable<IJsonTestResult>;
  Feature: JsonFeatureCompare;

  state: DiffState;

  constructor(newJson: IJsonFeatureElement | undefined | null, oldJson: IJsonFeatureElement | undefined | null) {
    this.state = DiffUtil.getDefaultState(newJson, oldJson);
    this.Name = JsDiffUtil.diffWords(newJson?.Name, oldJson?.Name);
    this.Slug = oldJson && oldJson.Slug ? oldJson.Slug : newJson && newJson.Slug ? newJson.Slug : '';
    this.Description = JsDiffUtil.diffMarkdown(newJson?.Name, oldJson?.Name);
    this.Steps = DiffUtil.arrayByKey(JsonStepCompare, newJson?.Steps, oldJson?.Steps, 'Name');
    this.Tags = JsDiffUtil.diffArrayByIndex(oldJson?.Tags, newJson?.Tags);
    this.Result = new Comparable<IJsonTestResult>(oldJson?.Result, newJson?.Result);
    this.Feature = new JsonFeatureCompare(newJson?.Feature, oldJson?.Feature);
  }
}

export interface IJsonScenarioOutlineCompare extends IJsonFeatureElementCompare {
  Examples: JsonExampleCompare[];
}

export class JsonScenarioOutlineCompare extends JsonScenarioCompare implements IJsonScenarioOutlineCompare {
  Examples: JsonExampleCompare[];

  constructor(newJson: IJsonScenarioOutline | undefined, oldJson: IJsonScenarioOutline | undefined) {
    super(newJson, oldJson);
    this.Examples = DiffUtil.arrayByKey(JsonExampleCompare, newJson?.Examples, oldJson?.Examples, 'Name');
  }
}

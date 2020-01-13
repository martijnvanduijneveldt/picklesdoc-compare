import { IEquals } from '../helper-models/i-equals';

export interface IJsonTestResult extends IEquals<IJsonTestResult> {
  WasExecuted: boolean;
  WasSuccessful: boolean;
  WasProvided: boolean;
}

export class JsonTestResult implements IEquals<JsonTestResult> {

  WasExecuted: boolean;
  WasSuccessful: boolean;
  WasProvided: boolean;

  constructor(json: IJsonTestResult | null = null) {
    this.WasExecuted = json ? json.WasExecuted : false;
    this.WasSuccessful = json ? json.WasSuccessful : false;
    this.WasProvided = json ? json.WasProvided : false;
  }

  equals(other: JsonTestResult): boolean {
    return this.WasExecuted === other.WasExecuted
      && this.WasProvided === other.WasProvided
      && this.WasSuccessful === other.WasSuccessful;
  }

}

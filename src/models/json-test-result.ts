import { IEquals } from '../helper-models/i-equals';

export interface IJsonTestResult extends IEquals<IJsonTestResult> {
  WasExecuted?: boolean;
  WasSuccessful?: boolean;
  WasProvided?: boolean;
}

export class JsonTestResult implements IEquals<JsonTestResult> {
  WasExecuted: boolean;
  WasSuccessful: boolean;
  WasProvided: boolean;

  constructor(json: IJsonTestResult | null | undefined = undefined) {
    this.WasExecuted = !!(json && json.WasExecuted);
    this.WasSuccessful = !!(json && json.WasSuccessful);
    this.WasProvided = !!(json && json.WasProvided);
  }

  equals(other: JsonTestResult): boolean {
    return this.WasExecuted === other.WasExecuted
      && this.WasProvided === other.WasProvided
      && this.WasSuccessful === other.WasSuccessful;
  }

}

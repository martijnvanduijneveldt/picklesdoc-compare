export interface IJsonTestResult {
  WasExecuted: boolean;
  WasSuccessful: boolean;
  WasProvided: boolean;
}

export class JsonTestResult {
  WasExecuted: boolean;
  WasSuccessful: boolean;
  WasProvided: boolean;

  constructor(json: IJsonTestResult | null = null) {
    this.WasExecuted = json ? json.WasExecuted : false;
    this.WasSuccessful = json ? json.WasSuccessful : false;
    this.WasProvided = json ? json.WasProvided : false;
  }
}
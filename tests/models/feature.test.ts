import { it, describe, expect } from 'vitest';
import { JsonScenarioOutline } from '../../src/models/feature';

describe('FeatureCompare', () => {
  it('Should not throw', () => {
    expect(() => {
      new JsonScenarioOutline();
      new JsonScenarioOutline({ Examples: null });
      new JsonScenarioOutline({ Examples: undefined });
    }).not.toThrowError();
  });
});

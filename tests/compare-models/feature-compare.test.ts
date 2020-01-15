import { assert } from 'chai';
import { JsonScenario } from '../../src/models/feature';
import { JsonScenarioCompare } from '../../src/compare-models/feature-compare';

describe('FeatureCompare', () => {
  it('null feature name', () => {
    const json = {
      Name: null,
      Description: '',
      Steps: [],
      Tags: [],
      Slug: null,
    };
    const json2 = {
      Name: 'New name',
      Description: '',
      Steps: [],
      Tags: [],
      Slug: null,
    };

    const old1 = new JsonScenario(json);
    const new1 = new JsonScenario(json2);

    const res = new JsonScenarioCompare(new1, old1);
    assert.equal(res.Name, '<ins>New name</ins>');

  });
});

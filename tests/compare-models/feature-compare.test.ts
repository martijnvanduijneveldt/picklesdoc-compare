import { assert } from 'chai';
import { JsonFeature, JsonScenario } from '../../src/models/feature';
import { JsonFeatureCompare, JsonScenarioCompare } from '../../src/compare-models/feature-compare';
import { DiffState } from '../../src/util/diff.util';

describe('JsonFeatureCompare', () => {
  describe('Tags', () => {
    it('Check adding a tag', () => {
      const old1 = new JsonFeature({ Tags: [] });
      const new1 = new JsonFeature({ Tags: ['newTag'] });

      const res = new JsonFeatureCompare(new1, old1);
      assert.lengthOf(res.Tags, 1, 'Should have a length of 1');
      assert.equal(res.Tags[0].state, DiffState.Added);
      assert.equal(res.Tags[0].value, 'newTag');
    });
    it('Check removing tag', () => {
      const old1 = new JsonFeature({ Tags: ['oldTag'] });
      const new1 = new JsonFeature({ Tags: [] });

      const res = new JsonFeatureCompare(new1, old1);
      assert.lengthOf(res.Tags, 1, 'Should have a length of 1');
      assert.equal(res.Tags[0].state, DiffState.Removed);
      assert.equal(res.Tags[0].value, 'oldTag');
    });
  });
});

describe('JsonScenarioCompare', () => {
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
  describe('Tags', () => {
    it('Check adding a tag', () => {
      const old1 = new JsonScenario({ Tags: [] });
      const new1 = new JsonScenario({ Tags: ['newTag'] });

      const res = new JsonScenarioCompare(new1, old1);
      assert.lengthOf(res.Tags, 1, 'Should have a length of 1');
      assert.equal(res.Tags[0].state, DiffState.Added);
      assert.equal(res.Tags[0].value, 'newTag');
    });
    it('Check removing tag', () => {
      const old1 = new JsonScenario({ Tags: ['oldTag'] });
      const new1 = new JsonScenario({ Tags: [] });

      const res = new JsonScenarioCompare(new1, old1);
      assert.lengthOf(res.Tags, 1, 'Should have a length of 1');
      assert.equal(res.Tags[0].state, DiffState.Removed);
      assert.equal(res.Tags[0].value, 'oldTag');
    });
  });
});

import { assert } from 'chai';
import { JsonFeature, JsonScenario, JsonScenarioOutline } from '../../src/models/feature';
import { JsonFeatureCompare, JsonScenarioCompare } from '../../src/compare-models/feature-compare';
import { DiffState } from '../../src/util/diff.util';
import { JsonExample } from '../../src/models/json-example';

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
  describe('JsonFeatureExample', () => {
    it('Should detect new correctly', () => {
      const new1 = new JsonFeature({
        FeatureElements: [
          new JsonScenarioOutline({
            Examples: [
              new JsonExample({
                Name: 'test',
              }),
            ],
          }),
        ],
      });

      const res = new JsonFeatureCompare(new1, null);

      assert.lengthOf(res.FeatureElements, 1, 'Should have a length of 1');
      const feature = res.FeatureElements[0];
      assert.equal(feature.state, DiffState.Added);

      console.log(feature.Examples);
      assert.lengthOf(feature.Examples, 1, 'Should have 1 example');
      assert.equal(feature.Examples[0].Name, '<ins>test</ins>');
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

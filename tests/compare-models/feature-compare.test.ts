import { it, describe, expect } from 'vitest';
import { JsonFeature, JsonScenario, JsonScenarioOutline } from '../../src/models/feature';
import {
  JsonFeatureCompare,
  JsonScenarioCompare,
  JsonScenarioOutlineCompare,
} from '../../src/compare-models/feature-compare';
import { DiffState } from '../../src/util/diff.util';
import { JsonExampleCompare } from '../../src/compare-models/json-example-compare';
import { JsonExample } from '../../src/models/json-example';

describe('JsonFeatureCompare', () => {
  describe('Tags', () => {
    it('Check adding a tag', () => {
      const old1 = new JsonFeature({ Tags: [] });
      const new1 = new JsonFeature({ Tags: ['newTag'] });

      const res = new JsonFeatureCompare(new1, old1);
      expect(res.Tags).lengthOf( 1, 'Should have a length of 1');
      expect(res.Tags[0].state).equal( DiffState.Added);
      expect(res.Tags[0].value).equal( 'newTag');
    });
    it('Check removing tag', () => {
      const old1 = new JsonFeature({ Tags: ['oldTag'] });
      const new1 = new JsonFeature({ Tags: [] });

      const res = new JsonFeatureCompare(new1, old1);
      expect(res.Tags).lengthOf( 1, 'Should have a length of 1');
      expect(res.Tags[0].state).equal( DiffState.Removed);
      expect(res.Tags[0].value).equal( 'oldTag');
    });
  });
  describe('JsonFeatureExample', () => {
    it('Should detect new correctly', () => {
      const new1 = new JsonFeature(
        {
          FeatureElements: [
            new JsonScenarioOutline(
              {
                Examples: [
                  new JsonExample(
                    {
                      Name: 'test',
                    }),
                ],
              }),
          ],
        });

      const res = new JsonFeatureCompare(new1, null);

      expect(res.FeatureElements).lengthOf( 1, 'Should have a length of 1');
      const feature = res.FeatureElements[0];
      expect(feature.state, DiffState.Added);

      expect(feature.Examples).lengthOf( 1, 'Should have 1 example');
      expect(feature.Examples[0].Name, '<ins>test</ins>');
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
    expect(res.Name, '<ins>New name</ins>');
  });
  describe('Tags', () => {
    it('Check adding a tag', () => {
      const old1 = new JsonScenario({ Tags: [] });
      const new1 = new JsonScenario({ Tags: ['newTag'] });

      const res = new JsonScenarioCompare(new1, old1);
      expect(res.Tags).lengthOf( 1, 'Should have a length of 1');
      expect(res.Tags[0].state, DiffState.Added);
      expect(res.Tags[0].value, 'newTag');
    });
    it('Check removing tag', () => {
      const old1 = new JsonScenario({ Tags: ['oldTag'] });
      const new1 = new JsonScenario({ Tags: [] });

      const res = new JsonScenarioCompare(new1, old1);
      expect(res.Tags).lengthOf( 1, 'Should have a length of 1');
      expect(res.Tags[0].state, DiffState.Removed);
      expect(res.Tags[0].value, 'oldTag');
    });
  });
});

describe('JsonScenarioOutlineCompare', () => {
  describe('Examples', () => {
    it('Check adding an example', () => {
      const old1 = new JsonScenarioOutline({ Name: 'my scenario', Examples: [{ Name: 'bla' }] });
      const new1 = new JsonScenarioOutline({ Name: 'my scenario', Examples: [{ Name: 'bla' }, { Name: 'bla2' }] });

      const res = new JsonScenarioOutlineCompare(new1, old1);
      expect(res.Examples).lengthOf( 2, 'Should have a length of 2');
      expect(res.Examples[1].state, DiffState.Added);
      expect(res.Examples[1].Name, '<ins>bla2</ins>');
    });
    it('Check removing an example', () => {
      const old1 = new JsonScenarioOutline({ Name: 'my scenario', Examples: [{ Name: 'bla' }, { Name: 'bla2' }] });
      const new1 = new JsonScenarioOutline({ Name: 'my scenario', Examples: [{ Name: 'bla' }] });

      const res = new JsonScenarioOutlineCompare(new1, old1);
      expect(res.Examples).lengthOf( 2, 'Should have a length of 1');
      expect(res.Examples[1].state, DiffState.Removed);
      expect(res.Examples[1].Name, '<del>bla2</del>');
    });
  });
});

describe('JsonExampleCompare', () => {
  describe('Tags', () => {
    it('Check adding a tag', () => {
      const old1 = new JsonExample({ Tags: [] });
      const new1 = new JsonExample({ Tags: ['newTag'] });

      const res = new JsonExampleCompare(new1, old1);
      expect(res.Tags).lengthOf( 1, 'Should have a length of 1');
      expect(res.Tags[0].state, DiffState.Added);
      expect(res.Tags[0].value, 'newTag');
    });
    it('Check removing tag', () => {
      const old1 = new JsonExample({ Tags: ['oldTag'] });
      const new1 = new JsonExample({ Tags: [] });

      const res = new JsonExampleCompare(new1, old1);
      expect(res.Tags).lengthOf( 1, 'Should have a length of 1');
      expect(res.Tags[0].state, DiffState.Removed);
      expect(res.Tags[0].value, 'oldTag');
    });
  });
});

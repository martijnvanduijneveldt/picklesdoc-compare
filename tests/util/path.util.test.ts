import {assert} from 'chai';
import {PathUtil} from '../../src/util/path.util';

describe('PathUtil', () => {
  it('Features\\00BasicGherkin\\BasicGherkin.feature', () => {
    const str = 'Features\\00BasicGherkin\\BasicGherkin.feature';
    const expectedArr = ['Features', '00BasicGherkin', 'BasicGherkin.feature'];
    const res = PathUtil.getPath(str);
    assert.deepEqual(res, expectedArr);
  });
  it('Features/00BasicGherkin/BasicGherkin.feature', () => {
    const str = 'Features/00BasicGherkin/BasicGherkin.feature';
    const expectedArr = ['Features', '00BasicGherkin', 'BasicGherkin.feature'];
    const res = PathUtil.getPath(str);
    assert.deepEqual(res, expectedArr);
  });
});

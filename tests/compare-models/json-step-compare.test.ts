import { assert } from 'chai';
import { JsonStep } from '../../src/models/json-step';
import { JsonComment } from '../../src/models/comment';
import { JsonStepCompare } from '../../src/compare-models/json-step-compare';

describe('JsonStepCompare', () => {
  const singleCommentJson = {
    Text: '# CompareToSet will test only the properties that you define in the table.',
  };
  const singleComment = new JsonComment(singleCommentJson);
  const doubleCommentJson =
    {
      Text: '# CompareToSet does not test the order of the objects, only that one was found that matches',
    };
  const doubleComment = new JsonComment(doubleCommentJson);

  it('Add new step', () => {
    const before = new JsonStep({ StepComments: [singleComment] });
    const after = new JsonStep({ StepComments: [singleComment, doubleComment] });

    const res = new JsonStepCompare(after, before);
    assert.lengthOf(res.StepComments, 2);
  });
  it('Remove step', () => {
    const before = new JsonStep({ StepComments: [singleComment, doubleComment] });
    const after = new JsonStep({ StepComments: [singleComment] });

    const res = new JsonStepCompare(after, before);
    assert.lengthOf(res.StepComments, 2);
    assert.equal(res.StepComments[1].Text, `<del>${doubleComment.Text}</del>`);
  });
});

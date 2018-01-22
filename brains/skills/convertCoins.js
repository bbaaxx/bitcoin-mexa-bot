import R from 'ramda';

const confidenceTreshold = 0.901;
const requiredEntities = [
  {
    name: 'sourceAmount',
    confidenceTreshold: 0.9,
  },
  {
    name: 'sourceSymbol',
    confidenceTreshold: 0.9,
  },
  {
    name: 'targetSymbol',
    confidenceTreshold: 0.9,
  },
  {
    name: 'intent',
    confidenceTreshold: 0.9,
  },
];

const checkProvidedEntities = entities =>
  R.all(R.has(R.__, entities))(requiredEntities.map(ent => ent.name));

const confidenceTest = x =>
  x[0].confidence > confidenceTreshold ? 'pass' : 'fail';

const entitiesConfidence = entities =>
  R.invert(R.map(confidenceTest, entities));

function checkRequirements(entities) {
  return checkProvidedEntities(entities) && entitiesConfidence(entities);
}

export default {
  checkRequirements,
};

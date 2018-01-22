import R from 'ramda';

import convertCoins from './skills/convertCoins';
import getCoinValue from './skills/getCoinValue';

const skills = {
  convertCoins,
  getCoinValue,
};

export function doIKnowHowToDoThis(intentType, entities) {
  return (
    R.has(intentType)(skills) && skills[intentType].checkRequirements(entities)
  );
}

export default skills;

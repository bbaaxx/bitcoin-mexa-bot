import convertCoins from './convertCoins';
import getCoinValue from './getCoinValue';

const skills = {
  convertCoins,
  getCoinValue
};

const doIKnowHowToDoThis = intent => Object.keys(skills).find(intent);


export doIKnowHowToDoThis;

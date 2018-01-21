import getRcon from '../server/rcon';
import { doIKnowHowToDoThis } from './skills/skillManager';
let rcon;

try {
  rcon = getRcon();
} catch (e) {
  console.log('rcon instance is not available', e);
  rcon = console.log;
}

const nlpAssisted = message =>
  message.nlp &&
  message.nlp.entities &&
  Object.keys(message.nlp.entities).length > 0;

const nlpMessageToAction = message => {
  const { entities } = message.nlp;
  const { intent } = entities;

  // intent is an array but for now I am
  // limiting the use case to the first element.
  const assistedIntent = intent[0];
  // should check if we have a handler for that intent or use a
  // I-dont-have-a-handler-for-that handler
  console.log('do I?', doIKnowHowToDoThis(assistedIntent));

  return {
    type: assistedIntent.value,
    payload: message
  };
};

const staticMessageToAction = message => {};

export default message => {
  return nlpAssisted(message)
    ? nlpMessageToAction(message)
    : staticMessageToAction(message);
};

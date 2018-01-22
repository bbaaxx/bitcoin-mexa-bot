import { doIKnowHowToDoThis } from './skillsManager';
import { triggerStaticAction } from './staticActions';

const nlpAssisted = message =>
  message.nlp &&
  message.nlp.entities &&
  Object.keys(message.nlp.entities).length > 0;

export default function(data) {
  const { message } = data;
  let action = { type: 'unknown', payload: data };

  if (nlpAssisted(message)) {
    const { entities } = message.nlp;
    const { intent } = entities;

    // intent is an array but for now I am
    // limiting the use case to the first element.
    const userIntent = intent[0];
    const canHandleIntent = doIKnowHowToDoThis(userIntent.value, entities);
    console.log('Do I know how to do this? ', canHandleIntent);
    if (canHandleIntent) {
      action.type = userIntent.value;
    } else {
      // handle depending on reason
    }
  } else {
    triggerStaticAction(data);
  }

  return action;
}

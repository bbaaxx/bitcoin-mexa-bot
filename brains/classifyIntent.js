import getRcon from '../server/rcon';

let rcon;

try {
  rcon = getRcon();
} catch(e) {
  console.log('rcon instance is not available', e);
  rcon = console.log;
}

const nlpAssisted = message => message.nlp 
  && message.nlp.entities 
  && Object.keys(message.nlp.entities).length > 0;

const nlpMessageToAction = message => {
  const { entities } = message.nlp;
  const { intent } = entities;
  
  // intent is an array but for now I am only
  // going to use the first element.
  const assistedIntent = intent[0];
  return {
    type: assistedIntent.value,
    payload: 'not now!'
  }
};

const staticMessageToAction = message => {

};

export default message => {
  return nlpAssisted(message) 
    ? nlpMessageToAction(message)
    : staticMessageToAction(message);
};
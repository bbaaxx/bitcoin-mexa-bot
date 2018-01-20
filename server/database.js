import Camo from 'camo';

const connect = Camo.connect;
async function connectDb(uri) {
  return await connect(uri)
};
const dbUri = 'nedb://.nedb';
const database = connectDb(dbUri, {corruptAlertThreshold: 1});

export default database;
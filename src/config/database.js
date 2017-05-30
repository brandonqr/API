import mongoose from 'mongoose';

import constants from './constants';

mongoose.Promise = global.Promise;

try {
  mongoose.connect(constants.MONGO_URL)
} catch (e) {
  mongodb.createConnection(constants.MONGO_URL);
}

mongoose.connection
        .once('open', () => console.log('MongoDB Ruunning'))
        .on('error', e =>{
          throw e;
        });

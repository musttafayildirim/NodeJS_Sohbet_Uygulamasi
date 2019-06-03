const mongoose = require('mongoose');

module.exports = () => {
   mongoose.connect(process.env.DB_STRING, {
      useCreateIndex: true,
      useNewUrlParser: true
   });

   mongoose.connection.on('open', () => {
    // console.log('baglantı saglandı');
   });
   mongoose.connection.on('error', (err) =>{
       console.log('MongoDb: Error', err);
   });

   mongoose.Promise = global.Promise;
};
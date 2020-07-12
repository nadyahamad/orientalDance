const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) =>{
    MongoClient.connect(
        'mongodb+srv://nahamad:Y1mb4c4T4b0g0@cluster0.3pcv2.mongodb.net/<dbname>?retryWrites=true&w=majority'
    )
    .then(client => {
        console.log('Connected!');
        callback(client);
    })

    .catch(err => {
    console.log(err);
    });
};

module.exports = mongoConnect;
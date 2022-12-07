const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true })
    .then(connection => {
        global.connection = connection.db("Movida");
        console.log('Connected successfully');
    }).catch(error => console.log(error))


function findSerie() {
    return global.connection
        .collection('series')
        .find({})
        .toArray();
}
module.exports = { findSerie }
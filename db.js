const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true },
    (error, connection) => {

        if (error) {
            console.log(`Error to connect: ${error}`);
        }

        global.connection = connection.db("Movida");
        console.log('Connected successfully');
    });

function findSerie() {
    return global.connection
        .collection('series')
        .find({})
        .toArray();
}
module.exports = { findSerie }
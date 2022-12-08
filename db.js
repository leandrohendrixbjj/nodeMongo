const mongoClient = require('mongodb').MongoClient;

mongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true })
    .then(connection => {
        //global faz connection ser vista por toda app
        global.connection = connection.db("Movida");
        console.log('Connected successfully');
    }).catch(error => console.log(error))
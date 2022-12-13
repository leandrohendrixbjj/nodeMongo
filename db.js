const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

mongoClient.connect('mongodb://localhost:27017',
    { useUnifiedTopology: true })
    .then(connection => {
        //global faz connection ser vista por toda app
        global.connection = connection.db("Movida");
        console.log('Connected successfully');
    }).catch(error => console.log(error))

function findSerie() {
    return connection.collection('Customers')
        .find({})
        .toArray();
}

function insertCustomer(customer) {
    return connection.collection('Customers').insertOne(customer);
}

function updateCustomer(id, customer) {
    //Converte para objectId pq id vem como string no mongo só reconhece como object
    const objectId = new ObjectId(id);

    return global.collection
        .collection('Customers')
        .updateOne({ _id: objectId }, { $set: customer })
}

function deleteCustomer(id) {
    const objectId = new ObjectId(id);

    return global.collection
        .collection('Customers')
        .deleteOne({ _id: objectId })
}

module.exports = { findSerie, insertCustomer, updateCustomer, deleteCustomer }


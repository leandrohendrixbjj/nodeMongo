const global = require('../db.js');
const ObjectId = require('mongodb').ObjectId;

function findSerie() {
    return connection
        .collection('series')
        .find({})
        .toArray();
}

function insertCustomer(customer) {
    return global.collection
        .collection('series')
        .insertOne(customer);
}

function updateCustomer(id, customer) {
    //Converte para objectId pq id vem como string no mongo só reconhece como object
    const objectId = new ObjectId(id);

    return global.collection
        .collection('series')
        .updateOne({ _id: objectId }, { $set: customer })
}

function deleteCustomer(id) {
    const objectId = new ObjectId(id);

    return global.collection
        .collection('series')
        .deleteOne({ _id: objectId })
}

module.exports = {
    findSerie,
    insertCustomer,
    updateCustomer,
    deleteCustomer
}
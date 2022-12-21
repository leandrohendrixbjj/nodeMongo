const mongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;

function connectDb() {
    if (!global.connection) {
        mongoClient.connect(process.env.MONGODB_CONNECTION,
            { useUnifiedTopology: true })
            .then(connection => {
                //global faz connection ser vista por toda app
                global.connection = connection.db("Movida");
                console.log('Connected successfully');
            })
            .catch(error =>
                console.log(error),
                global.collection = null)
    }
}

function findSerie() {
    connectDb();
    return connection.collection('Customers')
        .find({})
        .toArray();
}

function insertCustomer(customer) {
    connectDb();
    return connection.collection('Customers').insertOne(customer);
}

function updateCustomer(id, customer) {
    connectDb();
    //Converte para objectId pq id vem como string no mongo só reconhece como object
    const objectId = new ObjectId(id);

    return connection.collection('Customers').updateOne(
        { _id: ObjectId(id) }, { $set: customer }
    );
}

function deleteCustomer(id) {
    connectDb();
    const objectId = new ObjectId(id);

    return connection.collection('Customers').deleteOne(
        { _id: ObjectId(id) }
    );
}

function findCustomer(id) {
    connectDb();
    const objectId = new ObjectId(id);
    return connection.collection('Customers').findOne({ _id: ObjectId(id) });
}

module.exports = {
    findSerie,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    findCustomer
}


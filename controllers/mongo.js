const { MongoClient, ObjectId } = require('mongodb')

// const URI = "mongodb+srv://USER:PASSWORD@HOST"
const uri = "mongodb+srv://saurmo-udem:9nVhp5fsbdKQRBLf@clusterudem.3l9e6.mongodb.net/?retryWrites=true&w=majority";
// HOST: clusterudem.3l9e6.mongodb.net
// USER: saurmo-udem
// PASSWORD: 9nVhp5fsbdKQRBLf
// DATABASE: SASHA
const mongoClient = new MongoClient(uri)
const db = mongoClient.db('sasha')
const getDocuments = async (collectionName) => {
    
    const collection = db.collection(collectionName)
    const result = await collection.find({}).toArray();
    return result
}

const getDocumentsWithFilter = async (collectionName, filter) => {
    
    
    const collection = db.collection(collectionName)
    const result = await collection.find(filter).toArray();
    return result
}


/**
 * Insert document with mongoDB
 * @param {*} dbName Database Name
 * @param {*} collectionName Collection Name
 * @param {*} data Data to insert
 * @returns Promise 
 */
const insertDocument = async (collectionName, data) => {
    
    const collection = db.collection(collectionName)
    const result = await collection.insertOne(data);
    console.log("entra")
    return result
}

const updateDocumentById = async (collectionName, { id, data }) => {
    
    const idMongo = new ObjectId(id)
    const collection = db.collection(collectionName)
    delete data._id
    const result = await collection.replaceOne({ _id: idMongo }, data);
    return result
}

const deleteDocumentById = async (collectionName, id) => {
    const idMongo = new ObjectId(id)
    const collection = db.collection(collectionName)
    const result = await collection.deleteOne({ _id: idMongo });
    return result
}

module.exports = { getDocuments, insertDocument, deleteDocumentById, updateDocumentById, getDocumentsWithFilter }
const { MongoClient, ObjectId } = require('mongodb')


const uri = "mongodb+srv://santi:nHTJCPk85pGEyw2R@cluster0.uqhznxt.mongodb.net/?retryWrites=true&w=majority";

const mongoClient = new MongoClient(uri)
const db = mongoClient.db('universidad')

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
    return result
} 

const updateDocumentById = async (collectionName, { id, data }) => {
    const collection = db.collection(collectionName)
    delete data._id
    const result = await collection.replaceOne({cedula: id }, data);
    return result
}

const deleteDocumentById = async (collectionName, id) => {
    const collection = db.collection(collectionName)
    const result = await collection.deleteMany({ cedula: id });
    return result
}

module.exports = { getDocuments, insertDocument, deleteDocumentById, updateDocumentById, getDocumentsWithFilter }
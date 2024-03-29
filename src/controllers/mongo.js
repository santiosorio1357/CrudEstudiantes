const { MongoClient, ObjectId } = require('mongodb')
const esquemaModelo = require('../models/estudiante');
const estudiante = require('../models/estudiante');

const uri = "mongodb+srv://santi:nHTJCPk85pGEyw2R@cluster0.uqhznxt.mongodb.net/?retryWrites=true&w=majority";

const mongoClient = new MongoClient(uri)
const db = mongoClient.db('universidad')

const getDocuments = async (collectionName) => {
    const result =  esquemaModelo.find({});
    return result
}

const getDocumentsWithFilter = async (collectionName, filter) => {

    const result =  esquemaModelo.find(filter);
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
    let estudiante = esquemaModelo(data)
    const result = await estudiante.save();
    return result
} 

const updateDocumentById = async (collectionName, { id, data }) => {
    let estudiante = esquemaModelo(data)
    const result = await estudiante.replaceOne({cedula: id }, data)
    return result
}

const deleteDocumentById = async (collectionName, id) => {
    
    const result = esquemaModelo.deleteMany({cedula: id });
    return result
}

module.exports = { getDocuments, insertDocument, deleteDocumentById, updateDocumentById, getDocumentsWithFilter }
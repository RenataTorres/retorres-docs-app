import { collectionDocuments } from "./dbConnect.js";

function findDocuments(name) {
    return collectionDocuments.findOne({name});
};

function getDocuments() {
    return collectionDocuments.find().toArray();
}

function addDocument(name) {
    return collectionDocuments.insertOne({
        name,
        text: ''
    });
}

function updateDocuments(name, text) {
    return collectionDocuments.updateOne({name}, {$set: { text }});
};

function deleteDocument(name) {
    return collectionDocuments.deleteOne({name})
}

export { findDocuments, updateDocuments, getDocuments, addDocument, deleteDocument };
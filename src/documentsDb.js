import { collectionDocuments } from "./dbConnect.js";

function findDocuments(name) {
    return collectionDocuments.findOne({name});
};

function updateDocuments(name, text) {
    return collectionDocuments.updateOne({name}, {$set: { text }});
};

export { findDocuments, updateDocuments };
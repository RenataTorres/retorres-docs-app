const connectionsDocuments = [];

function addConnection(connection) {
  connectionsDocuments.push(connection);
};

function getUsersDocument(documentName) {
  return connectionsDocuments
    .filter(connection => connection.documentName === documentName)
    .map(connection => connection.userName);
}

export { addConnection, getUsersDocument };

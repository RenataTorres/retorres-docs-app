const connectionsDocuments = [];

function findConnection(documentName, userName) {
  return connectionsDocuments.find(connection => {
    return connection.userName === userName && connection.documentName === documentName;
  });
}

function addConnection(connection) {
  connectionsDocuments.push(connection);
};

function getUsersDocument(documentName) {
  return connectionsDocuments
    .filter(connection => connection.documentName === documentName)
    .map(connection => connection.userName);
}

function removeConnection(documentName, userName) {
  const index = connectionsDocuments.findIndex(connection => {
    return connection.userName === userName && connection.documentName === documentName;
  });

  if(index !== -1){
    connectionsDocuments.splice(index, 1);
  }
  console.log(connectionsDocuments);
}

export { findConnection, addConnection, getUsersDocument, removeConnection };

import createHashAndSalPassword from "../utils/createHashAndSalPassword.js";
import { collectionUsers } from "./dbConnect.js";

function registerUser({ name, password }) {
  const { hashPassword, salPassword } = createHashAndSalPassword(password);
  return collectionUsers.insertOne({ name, hashPassword, salPassword });
}

function findUser(name) {
  return collectionUsers.findOne({name})
}
export { registerUser, findUser };

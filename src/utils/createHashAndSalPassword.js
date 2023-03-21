import { randomBytes, scryptSync } from 'crypto';

function createHashAndSalPassword(password){
  const salPassword = randomBytes(16).toString('hex');

  const hashPassword = scryptSync(password, salPassword, 64).toString('hex');

  return { salPassword, hashPassword };
}

export default createHashAndSalPassword;

import bcrypt from "bcryptjs";
import credentialModel from "../models/mongo/credential";
import { Credential } from "../models/credential";

export function verify(
  username: string,
  password: string
): Promise<String> {
  return new Promise<String>((resolve, reject) => {
    credentialModel
      .find({ username })
      .then((found) => {
        if (found && found.length === 1) return found[0];
        else reject("Invalid username or password");
      })
      .then((credsOnFile) => {
        if (credsOnFile)
          return bcrypt.compare(
            password,
            credsOnFile.hashedPassword
          );
        else reject("Invalid username or password");
      })
      .then((matched) => {
        if (matched) resolve(username);
        else reject("Invalid username or password");
      });
  });
}

export function checkExists(username: string) {
  return new Promise<boolean>((resolve, reject) => {
    credentialModel
      .find({ username })
      .then((found) => resolve(found && found.length > 0));
  });
}

export function create(username: string, password: string) {
  return new Promise<Credential>((resolve, reject) => {
    if (!username || !password) {
      reject("must provide username and password");
    }
    credentialModel
      .find({ username })
      .then((found: Credential[]) => {
        if (found.length) reject("username exists");
      })
      .then(() =>
        bcrypt
          .genSalt(10)
          .then((salt: string) => bcrypt.hash(password, salt))
          .then((hashedPassword: string) => {
            const creds = new credentialModel({
              username,
              hashedPassword
            });
            creds.save().then((created: Credential) => {
              if (created) resolve(created);
            });
          })
      );
  });
}

export default { checkExists, create, verify };
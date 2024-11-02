import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { Credential } from "../models/credential";

const credentialSchema = new Schema<Credential>(
  {
    username: {
      type: String,
      required: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: true
    },
    roles: [
      {
        $role: { type: String, required: true },
        groupid: String
      }
    ]
  },
  { collection: "user_credentials" }
);

const credentialModel = model<Credential>(
  "Credential",
  credentialSchema
);

function verify(
  username: string,
  password: string
): Promise<string> {
  return credentialModel
    .find({ username })
    .then((found) => {
      if (!found || found.length !== 1)
        throw "Invalid username or password";
      return found[0];
    })
    .then(
      (credsOnFile) =>
        new Promise<string>((resolve, reject) => {
          if (credsOnFile)
            bcrypt.compare(
              password,
              credsOnFile.hashedPassword,
              (_, result) => {
                if (!result)
                  reject("Invalid username or password");
                else resolve(credsOnFile.username);
              }
            );
        })
    );
}

function create(username: string, password: string) {
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

export default { create, verify };

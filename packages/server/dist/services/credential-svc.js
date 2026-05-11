import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
const credentialSchema = new Schema({
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
}, { collection: "user_credentials" });
const credentialModel = model("Credential", credentialSchema);
function verify(username, password) {
    return credentialModel
        .find({ username })
        .then((found) => {
        if (!found || found.length !== 1)
            throw "Invalid username or password";
        return found[0];
    })
        .then((credsOnFile) => bcrypt.compare(password, credsOnFile.hashedPassword)
        .then((result) => {
        if (!result)
            throw ("Invalid username or password");
        return credsOnFile.username;
    }));
}
function create(username, password) {
    return credentialModel
        .find({ username })
        .then((found) => {
        if (found.length)
            throw `Username exists: ${username}`;
    })
        .then(() => bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hashedPassword) => {
        const creds = new credentialModel({
            username,
            hashedPassword
        });
        return creds.save();
    }));
}
export default { create, verify };

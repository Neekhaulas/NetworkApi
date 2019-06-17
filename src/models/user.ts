import { Schema, model } from "mongoose";

const UserSchema: Schema = new Schema({
    name: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String },
    avatar: { type: String }
});

export default model('User', UserSchema);
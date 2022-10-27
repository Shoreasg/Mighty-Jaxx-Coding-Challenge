/* User model schema. Requirements: User need to submit email and password to authenticate */
import mongoose, { Schema } from "mongoose";


interface User{
    email: string;
    password: string;
}

const userSchema = new Schema<User>({
    email: {type: String, required: true},
    password: {type: String, required: true},
});


module.exports = mongoose.model<User>("User", userSchema);
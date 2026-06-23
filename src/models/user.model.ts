import {Schema, model} from "mongoose";
import {IUser} from "../interfaces/user.interface";

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    }
},
    {
        timestamps: true,
        versionKey: false,
    })
//user - название документа в бд, User - константа через которую будем управлять БД
export const User = model<IUser>("user", UserSchema);

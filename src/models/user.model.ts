import { model, Schema } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema(
    {
        email: { type: String, unique: true, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: RoleEnum,
            required: true,
            default: RoleEnum.USER,
        },
        name: { type: String, required: true },
        surname: { type: String, required: true },
        age: { type: Number, required: true },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false },
);

export const User = model<IUser>("user", userSchema);

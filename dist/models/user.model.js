import { model, Schema } from "mongoose";
import { RoleEnum } from "../enums/role.enum";
const userSchema = new Schema({
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
    isActive: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false });
export const User = model("user", userSchema);

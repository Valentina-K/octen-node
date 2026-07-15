import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

interface IUser extends IBase {
    email: string;
    password: string;
    role: RoleEnum;
    isDeleted: boolean;
    isVerified: boolean;
    _id: string;
    name: string;
    surname: string;
    age: number;
}
//add fields for updating
type IUserCreateDTO = Pick<
    IUser,
    "email" | "password" | "name" | "surname" | "age"
>;

type IUserUpdateDTO = Pick<IUser, "name" | "surname" | "age">;

export type { IUser, IUserCreateDTO, IUserUpdateDTO };

import { RoleEnum } from "../enums/role.enum";
import { IBase } from "./base.interface";

interface IToken extends IBase {
    _id: string;
    accessToken: string;
    refreshToken: string;
    _userId: string;
}

interface ITokenPayload {
    _userId: string;
    role: RoleEnum;
}

type ITokenPair = Pick<IToken, "accessToken" | "refreshToken">;
type IRefresh = Pick<IToken, "refreshToken">;
type ITokenModel = Pick<IToken, "accessToken" | "refreshToken" | "_userId">;

export { IRefresh, IToken, ITokenModel, ITokenPair, ITokenPayload };

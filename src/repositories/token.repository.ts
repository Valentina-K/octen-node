import { IToken } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
    public create(dto: any): Promise<IToken> {
        return Token.create(dto);
    }
    public findByParams(params: Partial<IToken>): Promise<IToken> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return Token.findOne(params);
    }
}

export const tokenRepository = new TokenRepository();

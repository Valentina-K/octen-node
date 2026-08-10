import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-code.enum";
import { ErrorsApi } from "../errors/errors.api";
import { IRefresh } from "../interfaces/token.interface";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
    public async checkAccessToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const authorizationHeader = req.headers.authorization;

            if (!authorizationHeader) {
                throw new ErrorsApi(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            //Bearer gksdjgksdjfk
            const accessToken = authorizationHeader.split(" ")[1];

            if (!accessToken) {
                throw new ErrorsApi(
                    "No token provided",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }

            const tokenPayload = tokenService.verifyToken(
                accessToken,
                "access",
            );
            const isTokenExists = await tokenService.isTokenExists(
                accessToken,
                "accessToken",
            );

            if (!isTokenExists) {
                throw new ErrorsApi(
                    "Invalid token",
                    StatusCodesEnum.UNAUTHORIZED,
                );
            }
            //чтобы сохранить что-либо в контексте одного запроса используется объект res.locals
            res.locals.tokenPayload = tokenPayload;
            res.locals.role = tokenPayload.role;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkRefreshToken(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {
        try {
            const { refreshToken } = req.body as IRefresh;

            if (!refreshToken) {
                throw new ErrorsApi(
                    "No refresh token provided",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            const tokenPayload = tokenService.verifyToken(
                refreshToken,
                "refresh",
            );
            const isTokenExists = await tokenService.isTokenExists(
                refreshToken,
                "refreshToken",
            );

            if (!isTokenExists) {
                throw new ErrorsApi("Invalid token", StatusCodesEnum.FORBIDDEN);
            }

            res.locals.tokenPayload = tokenPayload;

            next();
        } catch (e) {
            next(e);
        }
    }

    public async checkIsActive(
        req: Request,
        res: Response,
        next: NextFunction,
    ) {}
}

export const authMiddleware = new AuthMiddleware();

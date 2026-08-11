import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { RoleEnum } from "../enums/role.enum";
import { StatusCodesEnum } from "../enums/status-code.enum";
import { ErrorsApi } from "../errors/errors.api";
import { ITokenPayload } from "../interfaces/token.interface";

class ApiMiddleware {
    public isValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ErrorsApi(
                        `Invalidate [${key}: ${id}]`,
                        StatusCodesEnum.BED_REQUEST,
                    );
                }
                next();
            } catch (err) {
                next(err);
            }
        };
    }
    public validateBody(validator: ObjectSchema) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                req.body = await validator.validateAsync(req.body);
                next();
            } catch (e) {
                const er = e as ValidationError;
                next(
                    new ErrorsApi(
                        er.details[0].message,
                        StatusCodesEnum.BED_REQUEST,
                    ),
                );
            }
        };
    }
    public checkAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { role } = res.locals.tokenPayload as ITokenPayload;
            if (role !== RoleEnum.ADMIN) {
                throw new ErrorsApi(
                    "No has permissions",
                    StatusCodesEnum.FORBIDDEN,
                );
            }
            next();
        } catch (err) {
            next(err);
        }
    }
}

export const apiMiddleware = new ApiMiddleware();

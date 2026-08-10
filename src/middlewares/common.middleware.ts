import { NextFunction, Request, Response } from "express";
import { ObjectSchema, ValidationError } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { ErrorsApi } from "../errors/errors.api";

class ApiMiddleware {
    public isValidate(key: string) {
        return (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params[key];
                if (!isObjectIdOrHexString(id)) {
                    throw new ErrorsApi(`Invalidate [${key}: ${id}]`, 400);
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
                next(new ErrorsApi(er.details[0].message, 400));
            }
        };
    }
    public checkAdmin(req: Request, res: Response, next: NextFunction) {
        if (res.locals.role !== "admin") {
            return res.status(403).json({ error: "Forbidden" });
        }
        next();
    }
}

export const apiMiddleware = new ApiMiddleware();

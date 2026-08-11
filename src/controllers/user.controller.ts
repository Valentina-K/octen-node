import { NextFunction, Request, Response } from "express";

import { StatusCodesEnum } from "../enums/status-code.enum";
import { ErrorsApi } from "../errors/errors.api";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUserCreateDTO, IUserUpdateDTO } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const data = await userService.getAll();
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.body as IUserCreateDTO;
            const data = await userService.create(user);
            res.status(StatusCodesEnum.CREATED).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async getById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const data = await userService.getById(id as string);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async updateById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const user = req.body as IUserUpdateDTO;
            const data = await userService.updateById(id as string, user);
            res.status(StatusCodesEnum.OK).json(data);
        } catch (e) {
            next(e);
        }
    }

    public async deleteById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            await userService.deleteById(id as string);
            res.status(StatusCodesEnum.NO_CONTENT).end();
        } catch (e) {
            next(e);
        }
    }

    public async blockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { _userId: myId } = res.locals.tokenPayload as ITokenPayload;
            if (id === myId) {
                throw new ErrorsApi("Not permitted", StatusCodesEnum.FORBIDDEN);
            }
            const user = await userService.blockUser(id as string);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async unblockUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params;
            const { _userId: myId } = res.locals.tokenPayload as ITokenPayload;
            if (id === myId) {
                throw new ErrorsApi("Not permitted", StatusCodesEnum.FORBIDDEN);
            }
            const user = await userService.unblockUser(id as string);
            res.status(StatusCodesEnum.OK).json(user);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();

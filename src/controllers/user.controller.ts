import {Request, Response} from "express";
import {userService} from "../services/user.service";
import {IUserDTO} from "../interfaces/user.interface";
import {UserStatusCodes} from "../emums/status-codes-enums";

class UserController {
    public async getAll(req: Request, res: Response) {
        const data = await userService.getAll();
        res.status(UserStatusCodes.OK).json(data);
    }

    public async getById(req: Request, res: Response) {
        const {id} = req.params;
        const data = await userService.getById(id as string);
        res.status(UserStatusCodes.OK).json(data);
    }

    public async create(req: Request, res: Response) {
        const user = req.body as IUserDTO;
        const data = await userService.create(user);
        res.status(UserStatusCodes.CREATED).json(data);
    }

    public async update(req: Request, res: Response) {
        const {id} = req.params;
        const user = req.body as IUserDTO;
        const data = await userService.update(id as string, user);
        res.status(UserStatusCodes.OK).json(data);
    }

    public async delete(req: Request, res: Response) {
        const {id} = req.params;
        await userService.delete(id as string);
        res.status(UserStatusCodes.NO_CONTENT).end();
    }
}

export const userController = new UserController();
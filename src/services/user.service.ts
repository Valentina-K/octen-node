import { StatusCodesEnum } from "../enums/status-code.enum";
import { ErrorsApi } from "../errors/errors.api";
import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }

    public create(user: IUserCreateDTO): Promise<IUser> {
        return userRepository.create(user);
    }

    public async getById(userId: string): Promise<IUser> {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ErrorsApi("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }
    public async updateById(
        userId: string,
        user: IUserUpdateDTO,
    ): Promise<IUser> {
        const data = await userRepository.getById(userId);

        if (!data) {
            throw new ErrorsApi("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return (await userRepository.updateById(userId, user)) as IUser;
    }
    public async setActive(userId: string, isActive: boolean): Promise<IUser> {
        const data = await userRepository.getById(userId);

        if (!data) {
            throw new ErrorsApi("User not found", StatusCodesEnum.NOT_FOUND);
        }

        return (await userRepository.setActiveUser(userId, isActive)) as IUser;
    }
    public async deleteById(userId: string): Promise<void> {
        const data = await userRepository.getById(userId);

        if (!data) {
            throw new ErrorsApi("User not found", StatusCodesEnum.NOT_FOUND);
        }

        await userRepository.deleteById(userId);
    }
    public async isEmailUnique(email: string): Promise<void> {
        const user = await userRepository.getByEmail(email);

        if (user) {
            throw new ErrorsApi(
                "User is already exists",
                StatusCodesEnum.BED_REQUEST,
            );
        }
    }
}

export const userService = new UserService();

import { IUser, IUserDTO } from "../interfaces/user.interface";
import { userRepository } from "../repositiries/user.repository";

class UserService {
    public getAll(): Promise<IUser[]> {
        return userRepository.getAll();
    }

    public create(user: IUserDTO): Promise<IUser> {
        return userRepository.create(user);
    }

    public getById(userId: string): Promise<IUserDTO | null> {
        return userRepository.getById(userId);
    }
    public updateById(userId: string, user: IUserDTO): Promise<IUser | null> {
        return userRepository.updateById(userId, user);
    }
    public deleteById(userId: string): Promise<IUser | null> {
        return userRepository.deleteById(userId);
    }
}

export const userService = new UserService();

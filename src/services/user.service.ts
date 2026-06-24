import {IUser, IUserDTO} from '../interfaces/user.interface'
import {userRepository} from "../repositories/user.repository";
class UserService {
    public getAll():Promise<IUser[]>{
       return userRepository.getAll();
    }
    public create(user: IUserDTO): Promise<IUser>{
        return userRepository.create(user);
    }
    public getById(userId: string):Promise<IUser|null>{
        return userRepository.getById(userId);
    }
    public update(userId: string, user:IUserDTO):Promise<IUser|null>{
        return userRepository.update(userId, user);
    }
    public delete(userId: string): Promise<IUser|null>{
        return userRepository.delete(userId);
    }
}

export const userService = new UserService();
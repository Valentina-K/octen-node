import {IUser, IUserDTO} from "../interfaces/user.interface";
import {User} from "../models/user.model";

class UserRepository {
    public getAll():Promise<IUser[]>{
        return User.find();
    }
    public getById(userId:string): Promise<IUser|null>{
        return User.findById(userId);
    }
    public create(user:IUserDTO):Promise<IUser>{
        return User.create(user);
    }

}
export const userRepository = new UserRepository();
import {IUser, IUserDTO} from "../interfaces/user.interface";
import {User} from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }

    public getById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }

    public create(user: IUserDTO): Promise<IUser> {
        return User.create(user);
    }

    public update(userId: string, user: IUserDTO): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, user, {returnDocument: "after"});
    }

    public delete(userId: string): Promise<IUser | null> {
        return User.findByIdAndDelete(userId);
    }

}

export const userRepository = new UserRepository();
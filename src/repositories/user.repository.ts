import {
    IUser,
    IUserCreateDTO,
    IUserUpdateDTO,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
    public getAll(): Promise<IUser[]> {
        return User.find();
    }
    public create(user: IUserCreateDTO): Promise<IUser> {
        return User.create(user);
    }
    public getById(userId: string): Promise<IUser | null> {
        return User.findById(userId);
    }
    public updateById(
        userId: string,
        user: IUserUpdateDTO,
    ): Promise<IUser | null> {
        return User.findByIdAndUpdate(userId, user, {
            returnDocument: "after",
        });
    }
    public setActiveUser(
        userId: string,
        isActive: boolean,
    ): Promise<IUser | null> {
        return User.findByIdAndUpdate(
            userId,
            { isActive },
            { returnDocument: "after" },
        );
    }
    public deleteById(userId: string): Promise<IUser | null> {
        return User.findByIdAndDelete(userId);
    }
    public getByEmail(email: string): Promise<IUser> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return User.findOne({ email });
    }
}

export const userRepository = new UserRepository();

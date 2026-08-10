import { StatusCodesEnum } from "../enums/status-code.enum";
import { ErrorsApi } from "../errors/errors.api";
import { userRepository } from "../repositories/user.repository";
class UserService {
    getAll() {
        return userRepository.getAll();
    }
    create(user) {
        return userRepository.create(user);
    }
    async getById(userId) {
        const user = await userRepository.getById(userId);
        if (!user) {
            throw new ErrorsApi("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return user;
    }
    async updateById(userId, user) {
        const data = await userRepository.getById(userId);
        if (!data) {
            throw new ErrorsApi("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return (await userRepository.updateById(userId, user));
    }
    async setActive(userId, isActive) {
        const data = await userRepository.getById(userId);
        if (!data) {
            throw new ErrorsApi("User not found", StatusCodesEnum.NOT_FOUND);
        }
        return (await userRepository.setActiveUser(userId, isActive));
    }
    async deleteById(userId) {
        const data = await userRepository.getById(userId);
        if (!data) {
            throw new ErrorsApi("User not found", StatusCodesEnum.NOT_FOUND);
        }
        await userRepository.deleteById(userId);
    }
    async isEmailUnique(email) {
        const user = await userRepository.getByEmail(email);
        if (user) {
            throw new ErrorsApi("User is already exists", StatusCodesEnum.BED_REQUEST);
        }
    }
}
export const userService = new UserService();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = void 0;
const user_repository_1 = require("../repositories/user.repository");
class UserService {
    getAll() {
        return user_repository_1.userRepository.getAll();
    }
    create(user) {
        return user_repository_1.userRepository.create(user);
    }
    getById(userId) {
        return user_repository_1.userRepository.getById(userId);
    }
    update(userId, user) {
        return user_repository_1.userRepository.update(userId, user);
    }
    delete(userId) {
        return user_repository_1.userRepository.delete(userId);
    }
}
exports.userService = new UserService();

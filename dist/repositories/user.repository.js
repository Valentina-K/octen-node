"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const user_model_1 = require("../models/user.model");
class UserRepository {
    getAll() {
        return user_model_1.User.find();
    }
    getById(userId) {
        return user_model_1.User.findById(userId);
    }
    create(user) {
        return user_model_1.User.create(user);
    }
    update(userId, user) {
        return user_model_1.User.findByIdAndUpdate(userId, user, { returnDocument: "after" });
    }
    delete(userId) {
        return user_model_1.User.findByIdAndDelete(userId);
    }
}
exports.userRepository = new UserRepository();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const user_service_1 = require("../services/user.service");
const status_codes_enums_1 = require("../emums/status-codes-enums");
class UserController {
    async getAll(req, res) {
        const data = await user_service_1.userService.getAll();
        res.status(status_codes_enums_1.UserStatusCodes.OK).json(data);
    }
    async getById(req, res) {
        const { id } = req.params;
        const data = await user_service_1.userService.getById(id);
        res.status(status_codes_enums_1.UserStatusCodes.OK).json(data);
    }
    async create(req, res) {
        const user = req.body;
        const data = await user_service_1.userService.create(user);
        res.status(status_codes_enums_1.UserStatusCodes.CREATED).json(data);
    }
    async update(req, res) {
        const { id } = req.params;
        const user = req.body;
        const data = await user_service_1.userService.update(id, user);
        res.status(status_codes_enums_1.UserStatusCodes.OK).json(data);
    }
    async delete(req, res) {
        const { id } = req.params;
        await user_service_1.userService.delete(id);
        res.status(status_codes_enums_1.UserStatusCodes.NO_CONTENT).end();
    }
}
exports.userController = new UserController();

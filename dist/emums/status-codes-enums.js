"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatusCodes = void 0;
var UserStatusCodes;
(function (UserStatusCodes) {
    UserStatusCodes[UserStatusCodes["OK"] = 200] = "OK";
    UserStatusCodes[UserStatusCodes["CREATED"] = 201] = "CREATED";
    UserStatusCodes[UserStatusCodes["NO_CONTENT"] = 204] = "NO_CONTENT";
    UserStatusCodes[UserStatusCodes["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    UserStatusCodes[UserStatusCodes["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    UserStatusCodes[UserStatusCodes["FORBIDDEN"] = 403] = "FORBIDDEN";
    UserStatusCodes[UserStatusCodes["NOT_FOUND"] = 404] = "NOT_FOUND";
})(UserStatusCodes || (exports.UserStatusCodes = UserStatusCodes = {}));

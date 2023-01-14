"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const auth_middleware_1 = require("../../../lib/middlewares/auth.middleware");
const validation_middleware_1 = tslib_1.__importDefault(require("../../../lib/middlewares/validation.middleware"));
const auth_controller_1 = tslib_1.__importDefault(require("../controllers/auth.controller"));
const users_dto_1 = require("../dtos/users.dto");
class AuthRoute {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.authController = new auth_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}signup`, (0, validation_middleware_1.default)(users_dto_1.CreateUserDto, 'body'), this.authController.signUp);
        this.router.post(`${this.path}login`, (0, validation_middleware_1.default)(users_dto_1.CreateUserDto, 'body'), this.authController.logIn);
        this.router.post(`${this.path}logout`, auth_middleware_1.authMiddleware, this.authController.logOut);
    }
}
exports.default = AuthRoute;
//# sourceMappingURL=auth.route.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleAuthorization = exports.AdminAuthorization = exports.authMiddleware = void 0;
const tslib_1 = require("tslib");
const httpErrors_1 = require("./../../utils/httpErrors");
const jsonwebtoken_1 = require("jsonwebtoken");
const commonErrors_1 = tslib_1.__importDefault(require("../data/commonErrors"));
const config_1 = require("../../config");
const users_model_1 = tslib_1.__importDefault(require("../../modules/user/models/users.model"));
const authMiddleware = async (req, res, next) => {
    try {
        const Authorization = req.cookies['Authorization'] || (req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null);
        if (Authorization) {
            const secretKey = config_1.SECRET_KEY;
            const verificationResponse = (await (0, jsonwebtoken_1.verify)(Authorization, secretKey));
            const userId = verificationResponse._id;
            const findUser = await users_model_1.default.findById(userId);
            if (findUser) {
                req.user = findUser;
                next();
            }
            else {
                const error = commonErrors_1.default.INVALID_TOKEN;
                error.message = 'Invalid Token';
                error.description = "The token you provided doesn't match any user";
                next(new httpErrors_1.HTTP401Error(error));
            }
        }
        else {
            const error = commonErrors_1.default.TOKEN_MISSING;
            next(new httpErrors_1.HTTP400Error(error));
        }
    }
    catch (e) {
        const error = commonErrors_1.default.INVALID_TOKEN;
        error.message = 'Invalid Token';
        error.description = e.message;
        next(new httpErrors_1.HTTP401Error(error));
    }
};
exports.authMiddleware = authMiddleware;
const AdminAuthorization = async (req, res, next) => {
    if (req.role === 'admin') {
        next();
    }
    else {
        const error = commonErrors_1.default.INVALID_ROLE;
        error.message = 'Incorrect Role for Request. Your Role : ' + req.role;
        next(new httpErrors_1.HTTP401Error(error));
    }
};
exports.AdminAuthorization = AdminAuthorization;
const RoleAuthorization = (role) => async (req, res, next) => {
    if (req.role === 'admin' || req.role === role) {
        next();
    }
    else {
        const error = commonErrors_1.default.INVALID_ROLE;
        error.message = 'Incorrect Role for Request. Your Role : ' + req.role;
        next(new httpErrors_1.HTTP401Error(error));
    }
};
exports.RoleAuthorization = RoleAuthorization;
//# sourceMappingURL=auth.middleware.js.map
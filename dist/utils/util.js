"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyRoutes = exports.isEmpty = void 0;
/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
const isEmpty = (value) => {
    if (value === null) {
        return true;
    }
    else if (typeof value !== 'number' && value === '') {
        return true;
    }
    else if (typeof value === 'undefined' || value === undefined) {
        return true;
    }
    else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
        return true;
    }
    else {
        return false;
    }
};
exports.isEmpty = isEmpty;
const applyRoutes = (routes, router, Authorization, RoleAuthorization, AdminAuthorization) => {
    for (const route of routes) {
        const { method, path, escapeAuth, handlers, adminOnly, role } = route;
        if (escapeAuth) {
            router[method](path, handlers);
        }
        else if (role) {
            router[method](path, [Authorization, RoleAuthorization(role), ...handlers]);
        }
        else if (adminOnly) {
            router[method](path, [Authorization, AdminAuthorization, ...handlers]);
        }
        else {
            router[method](path, [Authorization, ...handlers]);
        }
    }
    return router;
};
exports.applyRoutes = applyRoutes;
//# sourceMappingURL=util.js.map
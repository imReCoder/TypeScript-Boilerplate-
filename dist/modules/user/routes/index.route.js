"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const EHttpMethods_1 = require("./../../../lib/enums/EHttpMethods");
const express_1 = require("express");
const index_controller_1 = tslib_1.__importDefault(require("../controllers/index.controller"));
class IndexRoute {
    constructor() {
        this.path = '/';
        this.router = (0, express_1.Router)();
        this.indexController = new index_controller_1.default();
        this.routes = [
            {
                path: '/',
                method: EHttpMethods_1.EHttpMethods.GET,
                handlers: [this.indexController.index],
            },
        ];
        // this.router.use();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.indexController.index);
    }
}
exports.default = IndexRoute;
//# sourceMappingURL=index.route.js.map
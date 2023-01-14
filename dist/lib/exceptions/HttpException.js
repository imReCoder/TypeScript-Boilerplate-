"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(statusCode, e) {
        super(e);
        this.status = statusCode;
        // this.code = e.code;
        // this.name = e.name;
        // this.description = e.description;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=HttpException.js.map
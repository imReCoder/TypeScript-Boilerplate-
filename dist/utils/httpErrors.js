"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP409Error = exports.HTTP404Error = exports.HTTP403Error = exports.HTTP401Error = exports.HTTP200Error = exports.HTTP400Error = exports.HTTPClientError = void 0;
class HTTPClientError extends Error {
    constructor(e) {
        if (e.message instanceof Object) {
            super(JSON.stringify(e.message));
        }
        else {
            super(e.message);
        }
        this.name = this.constructor.name;
        this.description = e.description;
        this.code = e.code;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.HTTPClientError = HTTPClientError;
//Bad Request response status code indicates that the server cannot or will not process the request due to something
// that is perceived to be a client error (for example, malformed request syntax, invalid request message framing,
// or deceptive request routing)
class HTTP400Error extends HTTPClientError {
    constructor(e) {
        super(e);
        this.statusCode = 400;
    }
}
exports.HTTP400Error = HTTP400Error;
// success status response code indicates that the request has succeeded.
class HTTP200Error extends HTTPClientError {
    constructor(e) {
        super(e);
        this.statusCode = 200;
    }
}
exports.HTTP200Error = HTTP200Error;
//Unauthorized response status code indicates that the client request has not been completed
//because it lacks valid authentication credentials for the requested resource
class HTTP401Error extends HTTPClientError {
    constructor(e) {
        super(e);
        this.statusCode = 401;
    }
}
exports.HTTP401Error = HTTP401Error;
// The HTTP 403 Forbidden response status code indicates that the server understands the request
// but refuses to authorize it
class HTTP403Error extends HTTPClientError {
    constructor(e) {
        super(e);
        this.statusCode = 403;
    }
}
exports.HTTP403Error = HTTP403Error;
// not found
class HTTP404Error extends HTTPClientError {
    constructor(e) {
        super(e);
        this.statusCode = 404;
    }
}
exports.HTTP404Error = HTTP404Error;
// The HTTP 409 status code (Conflict) indicates that the request could not be processed because of conflict in the request,
// such as the requested resource is not in the expected state, or the result of processing the request would create a
//conflict within the resource.
// tslint:disable-next-line: max-classes-per-file
class HTTP409Error extends HTTPClientError {
    constructor(e) {
        super(e);
        this.statusCode = 409;
    }
}
exports.HTTP409Error = HTTP409Error;
//# sourceMappingURL=httpErrors.js.map
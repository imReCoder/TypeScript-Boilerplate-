import ISpotError from '../lib/interfaces/ISpotError';
export declare abstract class HTTPClientError extends Error {
    readonly statusCode: number;
    readonly name: string;
    readonly description?: string;
    readonly code: string;
    constructor(e: ISpotError);
}
export declare class HTTP400Error extends HTTPClientError {
    readonly statusCode = 400;
    constructor(e: ISpotError);
}
export declare class HTTP200Error extends HTTPClientError {
    readonly statusCode = 200;
    constructor(e: ISpotError);
}
export declare class HTTP401Error extends HTTPClientError {
    readonly statusCode = 401;
    constructor(e: ISpotError);
}
export declare class HTTP403Error extends HTTPClientError {
    readonly statusCode = 403;
    constructor(e: ISpotError);
}
export declare class HTTP404Error extends HTTPClientError {
    readonly statusCode = 404;
    constructor(e: ISpotError);
}
export declare class HTTP409Error extends HTTPClientError {
    readonly statusCode = 409;
    constructor(e: ISpotError);
}

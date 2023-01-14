export declare class HttpException extends Error {
    status: number;
    code: string;
    name: string;
    description: string;
    constructor(statusCode: any, e: string);
}

import { Request, Response } from 'express';
import { IErrorResponse } from '../interfaces/common.interface';
import ISpotError from '../interfaces/ISpotError';
import { HTTP400Error, HTTP401Error, HTTP403Error, HTTP404Error, HTTP409Error } from '../utils/httpErrors';

class ResponseHandler implements IErrorResponse {
  status = 1;
  statusCode = 200;
  error?: string;
  message = 'Success';
  description?: string;
  payload?: any;
  req?: Request;
  res?: Response;

  public setData(message: string, payload?: any, description?: string) {
    this.message = message || 'successful';
    this.description = description || undefined;
    this.payload = payload || undefined;
    this.error = undefined;
  }

  public setErrorData(error: string, message: string, description?: string) {
    this.message = message;
    this.description = description;
    this.error = error;
  }

  // Call this method when creating any data into database
  // Assign custom messages and descriptions.

  reqRes(req: Request, res: Response) {
    this.req = req;
    this.res = res;
    return this;
  }

  onCreate(message: string, payload?: any, description?: string) {
    this.statusCode = 201;
    this.status = 1;
    this.setData(message, payload, description);
    return this;
  }

  onFetch(message: string, payload?: any, description?: string) {
    this.statusCode = 200;
    this.status = 1;
    this.setData(message, payload, description);
    return this;
  }

  onWrite(payload?: any) {
    this.statusCode = 200;
    this.status = 1;
    this.payload = payload;
    return this;
  }

  onClientError(statusCode: number, error: string, message: string, description?: string) {
    this.statusCode = statusCode || 400;
    this.status = 0;
    this.setErrorData(error, message, description);
    this.payload = undefined;
    return this;
  }

  onServerError(error: string, message: string, description?: string) {
    this.statusCode = 500;
    this.status = 0;
    this.setErrorData(error, message, description);
    this.payload = undefined;
    return this;
  }

  /**
   * Send response to the client. This will be unique for all response. and
   * it can make things very easy for us. For debugging, logging, future
   * changes and etc. Please feel free to enhance the way.
   */

  send(): void {
    if (!this.req || !this.res) {
      throw new Error('please set req Res function to get start');
    }
    const response: IErrorResponse = {
      status: this.status,
      error: this.error,
      statusCode: this.statusCode,
      message: this.message,
      description: this.description,
      payload: this.payload,
    };
    // console.log("Sending Response");
    // console.log(this.payload);
    this.res.status(this.statusCode).json(response);
  }

  sendError(e: ISpotError) {
    if (e instanceof HTTP400Error) {
      return new HTTP400Error(e);
    }
    if (e instanceof HTTP401Error) {
      return new HTTP401Error(e);
    }
    if (e instanceof HTTP403Error) {
      return new HTTP403Error(e);
    }
    if (e instanceof HTTP404Error) {
      return new HTTP404Error(e);
    }
    if (e instanceof HTTP409Error) {
      return new HTTP409Error(e);
    }
    return e;
  }

  end(): void {
    if (!this.req || !this.res) {
      throw new Error('please set req Res function to get start');
    }
    this.res.writeHead(this.statusCode, { 'Content-Type': 'text/html' });
    this.res.write(this.payload);
    this.res.end();
  }
}

export default ResponseHandler;

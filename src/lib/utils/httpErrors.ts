import ISpotError from '../interfaces/ISpotError';

export abstract class HTTPClientError extends Error {
  readonly statusCode!: number;
  readonly name!: string;
  readonly description?: string;
  readonly code: string;

  constructor(e: ISpotError) {
    if (e.message instanceof Object) {
      super(JSON.stringify(e.message));
    } else {
      super(e.message);
    }
    this.name = this.constructor.name;
    this.description = e.description;
    this.code = e.code;
    Error.captureStackTrace(this, this.constructor);
  }
}

//Bad Request response status code indicates that the server cannot or will not process the request due to something
// that is perceived to be a client error (for example, malformed request syntax, invalid request message framing,
// or deceptive request routing)
export class HTTP400Error extends HTTPClientError {
  readonly statusCode = 400;

  constructor(e: ISpotError) {
    super(e);
  }
}

// success status response code indicates that the request has succeeded.
export class HTTP200Error extends HTTPClientError {
  readonly statusCode = 200;

  constructor(e: ISpotError) {
    super(e);
  }
}

//Unauthorized response status code indicates that the client request has not been completed
//because it lacks valid authentication credentials for the requested resource
export class HTTP401Error extends HTTPClientError {
  readonly statusCode = 401;

  constructor(e: ISpotError) {
    super(e);
  }
}

// The HTTP 403 Forbidden response status code indicates that the server understands the request
// but refuses to authorize it
export class HTTP403Error extends HTTPClientError {
  readonly statusCode = 403;

  constructor(e: ISpotError) {
    super(e);
  }
}

// not found
export class HTTP404Error extends HTTPClientError {
  readonly statusCode = 404;

  constructor(e: ISpotError) {
    super(e);
  }
}

// The HTTP 409 status code (Conflict) indicates that the request could not be processed because of conflict in the request,
// such as the requested resource is not in the expected state, or the result of processing the request would create a
//conflict within the resource.
// tslint:disable-next-line: max-classes-per-file
export class HTTP409Error extends HTTPClientError {
  readonly statusCode = 409;

  constructor(e: ISpotError) {
    super(e);
  }
}

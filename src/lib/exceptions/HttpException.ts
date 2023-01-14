export class HttpException extends Error {
  public status: number;
  public code: string;
  public name: string;
  public description: string;
  constructor(statusCode, e: string) {
    super(e);
    this.status = statusCode;
    // this.code = e.code;
    // this.name = e.name;
    // this.description = e.description;
  }
}

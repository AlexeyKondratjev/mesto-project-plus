import { HttpResponseStatusCodes } from "../utils/enums";



export class BadRequestError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpResponseStatusCodes.BAD_REQUEST;
  }
}

export class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpResponseStatusCodes.NOT_FOUND;
  }
}

export class InternalServerError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = HttpResponseStatusCodes.INTERNAL_SERVER_ERROR;
  }
}
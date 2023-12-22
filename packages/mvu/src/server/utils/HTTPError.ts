export class HTTPError extends Error {
  statusCode: number = 500;

  constructor(message: string, status: number = 500) {
    super(`HTTP Error (${status}): ${message}`);
    this.statusCode = status;
  }
}

export class BadRequestError extends HTTPError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends HTTPError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class ConflictError extends HTTPError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class InternalError extends HTTPError {
  constructor(message: string) {
    super(message, 500);
  }
}

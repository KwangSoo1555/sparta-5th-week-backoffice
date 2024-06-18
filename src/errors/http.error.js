import { HTTP_STATUS } from "../constants/http-status.constant.js";

export class CustomHttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}
// JS의 Error 클래스를 가져와 커스텀 Error
class BadRequest extends CustomHttpError {
  constructor(message = BadRequest.name) {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

class Unauthorized extends CustomHttpError {
  constructor(message = Unauthorized.name) {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

class Forbidden extends CustomHttpError {
  constructor(message = Forbidden.name) {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

class NotFound extends CustomHttpError {
  constructor(message = NotFound.name) {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}

class Conflict extends CustomHttpError {
  constructor(message = Conflict.name) {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

class InternalServerError extends CustomHttpError {
  constructor(message = InternalServerError.name) {
    super(message, HTTP_STATUS.INTERNAL_SERVER_ERROR);
  }
}

export const HttpError = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  InternalServerError,
};

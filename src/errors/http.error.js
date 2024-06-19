import { HTTP_STATUS } from "../constants/http-status.constant.js";

// JS의 Error 클래스를 가져와 커스텀 Error
export class CustomHttpError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

// 사용자가 잘못 했을 때 (예: 입력 값을 빠뜨렸을 때)
class BadRequest extends CustomHttpError {
  constructor(message = BadRequest.name) {
    super(message, HTTP_STATUS.BAD_REQUEST);
  }
}

// 인증 실패 unauthenciated (예: 비밀번호가 틀렸을 때)
class Unauthorized extends CustomHttpError {
  constructor(message = Unauthorized.name) {
    super(message, HTTP_STATUS.UNAUTHORIZED);
  }
}

// 인가 실패 unauthorized (예: 접근 권한이 없을 때)
class Forbidden extends CustomHttpError {
  constructor(message = Forbidden.name) {
    super(message, HTTP_STATUS.FORBIDDEN);
  }
}

// 데이터가 없는 경우
class NotFound extends CustomHttpError {
  constructor(message = NotFound.name) {
    super(message, HTTP_STATUS.NOT_FOUND);
  }
}

// 충돌이 발생했을 때 (예: 이메일 중복)
class Conflict extends CustomHttpError {
  constructor(message = Conflict.name) {
    super(message, HTTP_STATUS.CONFLICT);
  }
}

// 예상치 못한 에러가 발생했을 때
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

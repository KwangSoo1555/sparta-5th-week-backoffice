import { AUTH_CONSTANT } from "./auth.constant.js";

export const MESSAGES = {
  AUTH: {
    COMMON: {
      NAME: {
        REQURIED: "이름을 입력해 주세요.",
      },
      EMAIL: {
        BASE: "이메일은 문자열입니다.",
        REQUIRED: "이메일을 입력해 주세요.",
        INVALID_FORMAT: "이메일 형식이 올바르지 않습니다.",
        DUPLICATED: "이미 가입 된 사용자입니다.",
      },
      PASSWORD: {
        REQURIED: "비밀번호를 입력해 주세요.",
        MIN_LENGTH: `비밀번호는 ${AUTH_CONSTANT.PASSWORD_MIN_LENGTH}자리 이상이어야 합니다.`,
      },
      PASSWORD_CONFIRM: {
        REQURIED: "비밀번호 확인을 입력해 주세요.",
        NOT_MACHTED_WITH_PASSWORD: "입력 한 두 비밀번호가 일치하지 않습니다.",
      },
      PHONE: {
        BASE: "전화 번호는 문자열입니다.",
        REQURIED: "전화 번호를 입력해 주세요.",
        INVALID_FORMAT: "전화 번호 형식이 올바르지 않습니다.",
      },
      ADDRESS: {
        BASE: "주소는 문자열입니다.",
        REQURIED: "주소를 입력해 주세요.",
        INVALID_FORMAT: "주소 형식이 올바르지 않습니다.",
      },
      UNAUTHORIZED: "인증 정보가 유효하지 않습니다.",
      JWT: {
        NO_TOKEN: "인증 정보가 없습니다.",
        NOT_SUPPORTED_TYPE: "지원하지 않는 인증 방식입니다.",
        EXPIRED: "인증 정보가 만료되었습니다.",
        NO_USER: "인증 정보와 일치하는 사용자가 없습니다.",
        INVALID: "인증 정보가 유효하지 않습니다.",
      },
    },
    SIGN_UP: {
      EMAIL: {
        DUPLICATED: "이메일이나 별명이 이미 존재합니다.",
        FAIL: "메일 전송에 실패했습니다.",
        SUCCEED: "메일 전송에 성공했습니다.",
      },
      VERIFICATION_CODE: {
        BASE: "이메일 인증 코드는 정수입니다.",
        REQUIRED: "이메일 인증 코드를 입력해 주세요.",
        INCONSISTENT: "발송된 인증 코드와 다릅니다.",
        EXPIRED: "메일 인증이 만료되었습니다.",
        SUCCEED: "메일 인증이 완료되었습니다.",
      },
      SUCCEED: "회원가입에 성공했습니다.",
    },
    SIGN_IN: {
      SUCCEED: "로그인에 성공했습니다.",
    },
    SIGN_OUT: {
      SUCCEED: "로그 아웃에 성공했습니다.",
    },
  },
  USERS: {
    READ_ME: {
      SUCCEED: "내 정보 조회에 성공했습니다.",
    },
  },
  STORES: {
    COMMON: {
      STOREID: {
        REQURIED: "아이디를 입력해 주세요.",
      },
      NAME: {
        REQURIED: "이름을 입력해 주세요.",
      },
      CATEGORY: {
        REQURIED: "카테고리를 설정해 주세요.",
      },
      ADDRESS: {
        REQURIED: "주소를 확인해 주세요.",
      },
      PHONE: {
        REQURIED: "전화번호를 입력해 주세요.",
      },
      CONTENT: {
        REQURIED: "소개글을 입력해 주세요.",
      },
      NOT_FOUND: "가게가 존재하지 않습니다.",
      CREATE: {
        SUCCEED: "가게 생성에 성공했습니다.",
      },
      READ_DETAIL: {
        SUCCEED: "가게 상세정보 조회에 성공했습니다.",
      },
      UPDATE: {
        SUCCEED: "가게 정보 수정에 성공했습니다.",
        NO_BODY_DATA: "수정 할 정보를 입력해 주세요.",
      },
      DELETE: {
        SUCCEED: "가게 정보 삭제에 성공했습니다.",
      },
    },
  },
  MENUS: {
    COMMON: {
      NAME: {
        REQUIRED: "이름을 입력해 주세요.",
      },
      PRICE: {
        REQUIRED: "자기소개를 입력해 주세요.",
      },
      POPULALITY: {
        REQUIRED: "인기을 입력해 주세요.",
      },
      NOT_FOUND: "메뉴가 존재하지 않습니다.",
    },
    CREATE: {
      SUCCEED: "메뉴 생성에 성공했습니다.",
      FAILED: "메뉴 생성에 실패했습니다.",
    },
    READ_LIST: {
      SUCCEED: "메뉴 목록 조회에 성공했습니다.",
    },
    READ_DETAIL: {
      SUCCEED: "메뉴 상세 조회에 성공했습니다.",
    },
    UPDATE: {
      SUCCEED: "메뉴 수정에 성공했습니다.",
      NO_BODY_DATA: "수정 할 정보를 입력해 주세요.",
    },
    DELETE: {
      SUCCEED: "메뉴 삭제에 성공했습니다.",
    },
  },
  REVIEWS: {
    COMMON: {
      RATING: {
        REQUIRED: "별점을 입력해 주세요.",
      },
      CONTENT: {
        REQUIRED: "리뷰 내용를 입력해 주세요.",
        MIN_LENGTH: `리뷰 내용은 ${AUTH_CONSTANT.PASSWORD_MIN_LENGTH}자 이상 작성해야 합니다.`,
      },
      IMGURL: {
        REQUIRED: "이미지URL을 입력해 주세요.",
      },
      NOT_FOUND: "리뷰가 존재하지 않습니다.",
    },
    CREATE: {
      SUCCEED: "리뷰 생성에 성공했습니다.",
    },
    READ_LIST: {
      SUCCEED: "리뷰 목록 조회에 성공했습니다.",
    },
    READ_DETAIL: {
      SUCCEED: "리뷰 상세 조회에 성공했습니다.",
    },
    UPDATE: {
      SUCCEED: "리뷰 수정에 성공했습니다.",
      NO_BODY_DATA: "수정 할 정보를 입력해 주세요.",
    },
    DELETE: {
      SUCCEED: "리뷰 삭제에 성공했습니다.",
    },
  },
  SEARCH: {
    COMMON: {
      NOT_FOUND: "메뉴가 존재하지 않습니다.",
    },
  },
  ORDERS: {
    COMMON: {
      NAME: {
        REQUIRED: "이름을 입력해 주세요.",
      },
      PRICE: {
        REQUIRED: "자기소개를 입력해 주세요.",
      },
      POPULALITY: {
        REQUIRED: "인기을 입력해 주세요.",
      },
      NOT_FOUND: "이력서가 존재하지 않습니다.",
    },
    CREATE: {
      SUCCEED: "주문에 성공했습니다.",
    },
    READ_LIST: {
      SUCCEED: "주문 기록 조회에 성공했습니다.",
    },
    READ_DETAIL: {
      SUCCEED: "주문 상세 조회에 성공했습니다.",
    },
    UPDATE: {
      SUCCEED: "주문 수정에 성공했습니다.",
      NO_BODY_DATA: "수정 할 정보를 입력해 주세요.",
    },
    DELETE: {
      SUCCEED: "메뉴 삭제에 성공했습니다.",
    },
  },
  DIBS: {
    CREATE: {
      SUCCEED: "찜하였습니다.",
    },
    DELETE: {
      SUCCEED: "찜을 취소하였습니다.",
    },
  },
};

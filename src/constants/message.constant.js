import { MIN_PASSWORD_LENGTH } from "./auth.constant.js";
import { MIN_RESUME_LENGTH } from "./resume.constant.js";

export const MESSAGES = {
  AUTH: {
    COMMON: {
      EMAIL: {
        REQUIRED: "이메일을 입력해 주세요.",
        INVALID_FORMAT: "이메일 형식이 올바르지 않습니다.",
        DUPLICATED: "이미 가입 된 사용자입니다.",
      },
      PASSWORD: {
        REQURIED: "비밀번호를 입력해 주세요.",
        MIN_LENGTH: `비밀번호는 ${MIN_PASSWORD_LENGTH}자리 이상이어야 합니다.`,
      },
      PASSWORD_CONFIRM: {
        REQURIED: "비밀번호 확인을 입력해 주세요.",
        NOT_MACHTED_WITH_PASSWORD: "입력 한 두 비밀번호가 일치하지 않습니다.",
      },
      NAME: {
        REQURIED: "이름을 입력해 주세요.",
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
        DUPLICATED: '이메일이나 별명이 이미 존재합니다.',
        FAIL: '메일 전송에 실패했습니다.',
        SUCCEED: '메일 전송에 성공했습니다.'
      },
      VERIFICATION_CODE: {
        BASE: '이메일 인증 코드는 정수입니다.',
        REQUIRED: '이메일 인증 코드를 입력해 주세요.',
        INCONSISTENT: '발송된 인증 코드와 다릅니다.',
        EXPIRED: '메일 인증이 만료되었습니다.', 
        SUCCEED: '메일 인증이 완료되었습니다.',
      },
      SUCCEED: "회원가입에 성공했습니다.",
    },
    SIGN_IN: {
      SUCCEED: "로그인에 성공했습니다.",
    },
  },
  USERS: {
    READ_ME: {
      SUCCEED: "내 정보 조회에 성공했습니다.",
    },
  },
  RESUMES: {
    COMMON: {
      TITLE: {
        REQUIRED: "제목을 입력해 주세요.",
      },
      CONTENT: {
        REQUIRED: "자기소개를 입력해 주세요.",
        MIN_LENGTH: `자기소개는 ${MIN_RESUME_LENGTH}자 이상 작성해야 합니다.`,
      },
      NOT_FOUND: "이력서가 존재하지 않습니다.",
    },
    CREATE: {
      SUCCEED: "이력서 생성에 성공했습니다.",
    },
    READ_LIST: {
      SUCCEED: "이력서 목록 조회에 성공했습니다.",
    },
    READ_DETAIL: {
      SUCCEED: "이력서 상세 조회에 성공했습니다.",
    },
    UPDATE: {
      SUCCEED: "이력서 수정에 성공했습니다.",
      NO_BODY_DATA: "수정 할 정보를 입력해 주세요.",
    },
    DELETE: {
      SUCCEED: "이력서 삭제에 성공했습니다.",
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
      UPDATE: {
        SUCCEED: "정보 수정에 성공했습니다.",
        NO_BODY_DATA: "수정 할 정보를 입력해 주세요.",
      },
      DELETE: {
        SUCCEED: "정보 삭제에 성공했습니다.",
      },
    }
  }
};

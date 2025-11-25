import { Language } from "./types";

export const messages = {
  required: {
    ko: "필수 입력 항목입니다",
    en: "This field is required",
  },
  email: {
    ko: "올바른 이메일 형식이 아닙니다",
    en: "Invalid email format",
  },
  phone: {
    ko: "올바른 전화번호 형식이 아닙니다",
    en: "Invalid phone number format",
  },
  password: {
    ko: "비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다",
    en: "Password must be at least 8 characters with letters, numbers, and special characters",
  },
  minLength: {
    ko: (min: number) => `최소 ${min}자 이상 입력해주세요`,
    en: (min: number) => `Please enter at least ${min} characters`,
  },
  maxLength: {
    ko: (max: number) => `최대 ${max}자까지 입력 가능합니다`,
    en: (max: number) => `Maximum ${max} characters allowed`,
  },
  number: {
    ko: "숫자만 입력 가능합니다",
    en: "Only numbers are allowed",
  },
  alphanumeric: {
    ko: "영문과 숫자만 입력 가능합니다",
    en: "Only alphanumeric characters are allowed",
  },
  url: {
    ko: "올바른 URL 형식이 아닙니다",
    en: "Invalid URL format",
  },
  koreanOnly: {
    ko: "한글만 입력 가능합니다",
    en: "Only Korean characters are allowed",
  },
  englishOnly: {
    ko: "영문만 입력 가능합니다",
    en: "Only English characters are allowed",
  },
  creditCard: {
    ko: "올바른 신용카드 번호가 아닙니다",
    en: "Invalid credit card number",
  },
  date: {
    ko: "올바른 날짜 형식이 아닙니다 (YYYY-MM-DD)",
    en: "Invalid date format (YYYY-MM-DD)",
  },
};

export function getMessage(
  key: keyof typeof messages,
  language: Language = "ko",
  ...args: number[]
): string {
  const message = messages[key];
  if (typeof message === "object" && "ko" in message && "en" in message) {
    const text = message[language];
    if (typeof text === "function") {
      return text(...args);
    }
    return text;
  }
  return "";
}

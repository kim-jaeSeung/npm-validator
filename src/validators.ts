import type { ValidationResult, Language } from "./types";
import { getMessage } from "./messages";

/**
 * 필수 입력 검증
 */
export const required = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const isValid = value.trim().length > 0;
  return {
    isValid,
    error: isValid ? undefined : getMessage("required", language),
  };
};

/**
 * 이메일 형식 검증
 */
export const email = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValid = emailRegex.test(value);
  return {
    isValid,
    error: isValid ? undefined : getMessage("email", language),
  };
};

/**
 * 전화번호 형식 검증 (한국 형식)
 */
export const phone = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const phoneRegex = /^(01[0-9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const isValid = phoneRegex.test(value.replace(/\s/g, ""));
  return {
    isValid,
    error: isValid ? undefined : getMessage("phone", language),
  };
};

/**
 * 비밀번호 강도 검증
 * 최소 8자, 영문, 숫자, 특수문자 포함
 */
export const password = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const hasMinLength = value.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(value);
  const hasNumber = /[0-9]/.test(value);
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(value);

  const isValid = hasMinLength && hasLetter && hasNumber && hasSpecial;
  return {
    isValid,
    error: isValid ? undefined : getMessage("password", language),
  };
};

/**
 * 최소 길이 검증
 */
export const minLength = (min: number, language: Language = "ko") => {
  return (value: string): ValidationResult => {
    const isValid = value.length >= min;
    return {
      isValid,
      error: isValid ? undefined : getMessage("minLength", language, min),
    };
  };
};

/**
 * 최대 길이 검증
 */
export const maxLength = (max: number, language: Language = "ko") => {
  return (value: string): ValidationResult => {
    const isValid = value.length <= max;
    return {
      isValid,
      error: isValid ? undefined : getMessage("maxLength", language, max),
    };
  };
};

/**
 * 숫자만 허용
 */
export const number = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const isValid = /^\d+$/.test(value);
  return {
    isValid,
    error: isValid ? undefined : getMessage("number", language),
  };
};

/**
 * 영문+숫자만 허용
 */
export const alphanumeric = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const isValid = /^[a-zA-Z0-9]+$/.test(value);
  return {
    isValid,
    error: isValid ? undefined : getMessage("alphanumeric", language),
  };
};

/**
 * URL 형식 검증
 */
export const url = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  try {
    new URL(value);
    return { isValid: true };
  } catch {
    return {
      isValid: false,
      error: getMessage("url", language),
    };
  }
};

/**
 * 한글만 허용
 */
export const koreanOnly = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const isValid = /^[ㄱ-ㅎ가-힣\s]+$/.test(value);
  return {
    isValid,
    error: isValid ? undefined : getMessage("koreanOnly", language),
  };
};

/**
 * 영문만 허용
 */
export const englishOnly = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const isValid = /^[a-zA-Z\s]+$/.test(value);
  return {
    isValid,
    error: isValid ? undefined : getMessage("englishOnly", language),
  };
};

/**
 * 신용카드 번호 검증 (Luhn 알고리즘)
 */
export const creditCard = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const cleanValue = value.replace(/\s|-/g, "");

  if (!/^\d+$/.test(cleanValue)) {
    return {
      isValid: false,
      error: getMessage("creditCard", language),
    };
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleanValue.length - 1; i >= 0; i--) {
    let digit = parseInt(cleanValue[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  const isValid = sum % 10 === 0;
  return {
    isValid,
    error: isValid ? undefined : getMessage("creditCard", language),
  };
};

/**
 * 날짜 형식 검증 (YYYY-MM-DD)
 */
export const date = (
  value: string,
  language: Language = "ko"
): ValidationResult => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateRegex.test(value)) {
    return {
      isValid: false,
      error: getMessage("date", language),
    };
  }

  const dateObj = new Date(value);
  const isValid = dateObj instanceof Date && !isNaN(dateObj.getTime());

  return {
    isValid,
    error: isValid ? undefined : getMessage("date", language),
  };
};

/**
 * 커스텀 패턴 검증
 */
export const pattern = (regex: RegExp, errorMessage: string) => {
  return (value: string): ValidationResult => {
    const isValid = regex.test(value);
    return {
      isValid,
      error: isValid ? undefined : errorMessage,
    };
  };
};

import { ValidationResult, Language } from "./types";

/**
 * 바닐라 JS를 위한 Validator 클래스
 */
export class Validator {
  private language: Language;
  private rules: Array<(value: string) => ValidationResult> = [];

  constructor(language: Language = "ko") {
    this.language = language;
  }

  /**
   * 언어 설정
   */
  setLanguage(language: Language): this {
    this.language = language;
    return this;
  }

  /**
   * 검증 규칙 추가
   */
  addRule(rule: (value: string) => ValidationResult): this {
    this.rules.push(rule);
    return this;
  }

  /**
   * 검증 실행
   */
  validate(value: string): ValidationResult {
    for (const rule of this.rules) {
      const result = rule(value);
      if (!result.isValid) {
        return result;
      }
    }
    return { isValid: true };
  }

  /**
   * 검증 규칙 초기화
   */
  reset(): this {
    this.rules = [];
    return this;
  }

  /**
   * 현재 언어 가져오기
   */
  getLanguage(): Language {
    return this.language;
  }
}

/**
 * 간단한 검증을 위한 헬퍼 함수
 */
export const validate = (
  value: string,
  rules: Array<(value: string) => ValidationResult>
): ValidationResult => {
  for (const rule of rules) {
    const result = rule(value);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
};

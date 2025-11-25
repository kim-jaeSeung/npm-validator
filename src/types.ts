// 타입 정의
export type Language = "ko" | "en";

export interface ValidationRule {
  validate: (value: string) => boolean;
  message: string | { ko: string; en: string };
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface ValidatorOptions {
  language?: Language;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

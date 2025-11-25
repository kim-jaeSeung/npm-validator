import { useState, useCallback, ChangeEvent } from "react";
import type { ValidationResult, ValidatorOptions, Language } from "./types";

// useValidator Hook
export const useValidator = (
  rules: Array<(value: string) => ValidationResult>,
  options?: ValidatorOptions
) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [isValid, setIsValid] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const validate = useCallback(
    (valueToValidate?: string): ValidationResult => {
      const val = valueToValidate !== undefined ? valueToValidate : value;
      setIsDirty(true);

      for (const rule of rules) {
        const result = rule(val);
        if (!result.isValid) {
          setError(result.error);
          setIsValid(false);
          return result;
        }
      }

      setError(undefined);
      setIsValid(true);
      return { isValid: true };
    },
    [value, rules]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (options?.validateOnChange) {
        validate(newValue);
      }
    },
    [options?.validateOnChange, validate]
  );

  const handleBlur = useCallback(() => {
    setIsTouched(true);
    if (options?.validateOnBlur) {
      validate();
    }
  }, [options?.validateOnBlur, validate]);

  const reset = useCallback(() => {
    setValue("");
    setError(undefined);
    setIsValid(false);
    setIsDirty(false);
    setIsTouched(false);
  }, []);

  return {
    value,
    error,
    isValid,
    isDirty,
    isTouched,
    setValue,
    validate,
    reset,
    handleChange,
    handleBlur,
  };
};

// useForm Hook
interface FieldConfig {
  rules: Array<(value: string) => ValidationResult>;
  initialValue?: string;
}

interface FormConfig {
  [key: string]: FieldConfig;
}

interface FieldState {
  value: string;
  error: string | undefined;
  isValid: boolean;
  isDirty: boolean;
  isTouched: boolean;
}

interface UseFormOptions {
  language?: Language;
  validateOnChange?: boolean;
  validateOnBlur?: boolean;
}

export const useForm = (config: FormConfig, options?: UseFormOptions) => {
  const initialFields: { [key: string]: FieldState } = {};
  Object.keys(config).forEach((key) => {
    initialFields[key] = {
      value: config[key].initialValue || "",
      error: undefined,
      isValid: false,
      isDirty: false,
      isTouched: false,
    };
  });

  const [fields, setFields] = useState(initialFields);

  const setValue = useCallback((name: string, value: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        isDirty: true,
      },
    }));
  }, []);

  const setError = useCallback((name: string, error: string) => {
    setFields((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        error,
        isValid: false,
      },
    }));
  }, []);

  const validate = useCallback(
    (name: string): boolean => {
      const field = fields[name];
      const rules = config[name].rules;

      for (const rule of rules) {
        const result = rule(field.value);
        if (!result.isValid) {
          setFields((prev) => ({
            ...prev,
            [name]: {
              ...prev[name],
              error: result.error,
              isValid: false,
            },
          }));
          return false;
        }
      }

      setFields((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          error: undefined,
          isValid: true,
        },
      }));
      return true;
    },
    [fields, config]
  );

  const validateAll = useCallback((): boolean => {
    let allValid = true;
    Object.keys(config).forEach((name) => {
      if (!validate(name)) {
        allValid = false;
      }
    });
    return allValid;
  }, [config, validate]);

  const reset = useCallback(
    (name?: string) => {
      if (name) {
        setFields((prev) => ({
          ...prev,
          [name]: {
            value: config[name].initialValue || "",
            error: undefined,
            isValid: false,
            isDirty: false,
            isTouched: false,
          },
        }));
      }
    },
    [config]
  );

  const resetAll = useCallback(() => {
    setFields(initialFields);
  }, [initialFields]);

  const handleChange = useCallback(
    (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(name, newValue);

      if (options?.validateOnChange) {
        validate(name);
      }
    },
    [setValue, validate, options?.validateOnChange]
  );

  const handleBlur = useCallback(
    (name: string) => () => {
      setFields((prev) => ({
        ...prev,
        [name]: {
          ...prev[name],
          isTouched: true,
        },
      }));

      if (options?.validateOnBlur) {
        validate(name);
      }
    },
    [validate, options?.validateOnBlur]
  );

  const isValid = Object.values(fields).every((field) => field.isValid);

  return {
    fields,
    isValid,
    setValue,
    setError,
    validate,
    validateAll,
    reset,
    resetAll,
    handleChange,
    handleBlur,
  };
};

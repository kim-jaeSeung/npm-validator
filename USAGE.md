# kr-js-input-validator 사용 가이드

JavaScript, TypeScript, React, Next.js에서 사용하는 입력값 검증 라이브러리입니다.

## 설치

```bash
npm install kr-js-input-validator
```

로컬 테스트:

```bash
npm link kr-js-input-validator
```

## 사용 방법

### 1. 바닐라 JavaScript

```html
<script src="node_modules/kr-js-input-validator/dist/index.js"></script>

<input id="email-input" />
<span id="email-error"></span>

<script>
  const emailInput = document.getElementById("email-input");
  const emailError = document.getElementById("email-error");

  emailInput.addEventListener("blur", () => {
    const result = InputValidator.email(emailInput.value, "ko");
    if (!result.isValid) {
      emailError.textContent = result.error;
    }
  });
</script>
```

### 2. Node.js

```javascript
const { email, phone, required, Validator } = require("kr-js-input-validator");

const emailResult = email("test@email.com", "ko");
console.log(emailResult);

const validator = new Validator("ko");
validator.addRule(required).addRule(email);

const result = validator.validate("test@example.com");
```

### 3. TypeScript

```typescript
import {
  email,
  required,
  minLength,
  Validator,
  type ValidationResult,
} from "kr-js-input-validator";

const result: ValidationResult = email("test@email.com");

import { validate } from "kr-js-input-validator";

const username = "hello";
const validationResult = validate(username, [required, minLength(3, "ko")]);
```

### 4. React Hook

```jsx
import { useValidator, email, required } from "kr-js-input-validator";

function EmailForm() {
  const emailField = useValidator([required, email], {
    language: "ko",
    validateOnChange: true,
  });

  return (
    <form>
      <input
        value={emailField.value}
        onChange={emailField.handleChange}
        onBlur={emailField.handleBlur}
      />
      {emailField.error && <div>{emailField.error}</div>}
    </form>
  );
}
```

### 5. useForm (여러 Input)

```jsx
import { useForm, required, email, password } from "kr-js-input-validator";

function SignupForm() {
  const form = useForm(
    {
      email: { rules: [required, email] },
      password: { rules: [required, password] },
    },
    { language: "ko", validateOnBlur: true }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.validateAll()) {
      // submit
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.fields.email.value}
        onChange={form.handleChange("email")}
        onBlur={form.handleBlur("email")}
      />
      {form.fields.email.error && <span>{form.fields.email.error}</span>}

      <input
        type="password"
        value={form.fields.password.value}
        onChange={form.handleChange("password")}
        onBlur={form.handleBlur("password")}
      />
      {form.fields.password.error && <span>{form.fields.password.error}</span>}

      <button disabled={!form.isValid}>가입</button>
    </form>
  );
}
```

### 6. Next.js

```jsx
"use client";

import { useForm, required, email, password } from "kr-js-input-validator";

export default function SignupPage() {
  const form = useForm(
    {
      email: { rules: [required, email] },
      password: { rules: [required, password] },
    },
    { language: "ko" }
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.validateAll()) {
      await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.fields.email.value,
          password: form.fields.password.value,
        }),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.fields.email.value}
        onChange={form.handleChange("email")}
        onBlur={form.handleBlur("email")}
      />
      {form.fields.email.error && <div>{form.fields.email.error}</div>}

      <input
        type="password"
        value={form.fields.password.value}
        onChange={form.handleChange("password")}
        onBlur={form.handleBlur("password")}
      />
      {form.fields.password.error && <div>{form.fields.password.error}</div>}

      <button disabled={!form.isValid}>가입</button>
    </form>
  );
}
```

## 커스텀 검증

```javascript
import { pattern } from "kr-js-input-validator";

const customCode = pattern(/^[A-Z]{3}\d{3}$/, "형식: ABC123");

const result = customCode("ABC123");
```

## 다국어

```javascript
email("invalid", "ko"); // "올바른 이메일 형식이 아닙니다"
email("invalid", "en"); // "Invalid email format"
```

## 더 보기

[README.md](./README.md)

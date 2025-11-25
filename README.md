# kr-js-input-validator

React와 바닐라 JavaScript에서 사용하는 input 검증 라이브러리입니다.

## 특징

- React, 바닐라 JS 지원
- 한글/영어 에러 메시지
- TypeScript 지원
- React Hooks (useValidator, useForm)
- 커스텀 검증 규칙

## 설치

```bash
npm install kr-js-input-validator
```

## 지원 검증

- `required` - 필수 입력
- `email` - 이메일
- `phone` - 전화번호 (한국)
- `password` - 비밀번호 (8자 이상, 영문/숫자/특수문자)
- `minLength` / `maxLength` - 길이 제한
- `number` - 숫자
- `alphanumeric` - 영문+숫자
- `url` - URL
- `koreanOnly` / `englishOnly` - 언어 제한
- `creditCard` - 신용카드 (Luhn)
- `date` - 날짜 (YYYY-MM-DD)
- `pattern` - 정규식

## 사용 방법

### 1. 바닐라 JavaScript

```javascript
import { Validator, email, required } from "kr-js-input-validator";

// Validator 클래스
const validator = new Validator("ko");
validator.addRule(required).addRule(email);

const result = validator.validate("test@example.com");
console.log(result.isValid);

// 직접 호출
const emailResult = email("test@example.com", "ko");
if (!emailResult.isValid) {
  console.log(emailResult.error);
}

// validate 헬퍼
import { validate, minLength } from "kr-js-input-validator";

const result = validate("hello", [required, minLength(3, "ko")]);
```

### 2. React Hook

```jsx
import { useValidator, required, email } from "kr-js-input-validator";

function LoginForm() {
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
      {emailField.error && <span>{emailField.error}</span>}
      <button disabled={!emailField.isValid}>로그인</button>
    </form>
  );
}
```

### 3. useForm (여러 Input)

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

### 4. 커스텀 검증

```javascript
import { pattern } from "kr-js-input-validator";

const customPattern = pattern(/^[A-Z]{3}\d{3}$/, "형식: ABC123");

const result = customPattern("ABC123");
```

### 5. 다국어

```javascript
email("invalid", "ko"); // "올바른 이메일 형식이 아닙니다"
email("invalid", "en"); // "Invalid email format"
```

## 예제

```javascript
// 전화번호
phone("010-1234-5678", "ko");

// 비밀번호
password("MyP@ssw0rd", "ko");

// 신용카드
creditCard("4532-1488-0343-6467", "ko");

// 길이
minLength(5, "ko")("hello");
maxLength(20, "ko")("short");
```

## 라이센스

MIT

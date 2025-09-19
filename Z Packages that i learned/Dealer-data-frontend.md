# All Rounder Validator using YUP

- 

```js

const * as yup from "yup";

const registerSchema = yup.object().shape({
  username: yup
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .required("Username is required"),

  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),

  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),

  age: yup
    .number()
    .min(18, "Age must be at least 18")
    .max(100, "Age must be below 100")
    .required("Age is required"),

  termsAccepted: yup.boolean().oneOf([true], "You must accept the terms"),

  dob: yup.date().required("Date of Birth is required"),

  skills: yup.array().of(yup.string()).min(1, "At least one skill is required"),

  address: yup.object({
    city: yup.string().required("City is required"),
    zip: yup
      .string()
      .matches(/^\d{6}$/, "Invalid Indian ZIP code")
      .required("ZIP code is required"),
  }),

  role: yup
    .string()
    .oneOf(["user", "admin", "manager"], "Invalid role")
    .required("Role is required"),
});
```

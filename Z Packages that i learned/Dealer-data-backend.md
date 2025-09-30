# All Rounder Validator using express-validator

- `express-validator` is one of the most used packages in Express.js to validate incoming request data.

```js
// Validator.js
const { body } = require("express-validator");

const allRounderValidator = [
  // 1. STRING validations
  body("username")
    .isString()
    .withMessage("Username must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Username must be 3-20 characters"),

  // 2. EMAIL
  body("email").isEmail().withMessage("Invalid email address"),

  // 3. PASSWORD
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[0-9]/)
    .withMessage("Password must contain at least one number")
    .matches(/[@$!%*?&]/)
    .withMessage("Password must contain at least one special character"),

  // 4. NUMBER (AGE)
  body("age")
    .isInt({ min: 18, max: 100 })
    .withMessage("Age must be between 18 and 100"),

  // 5. BOOLEAN
  body("termsAccepted").isBoolean().withMessage("Terms must be true/false"),

  // 6. DATE
  body("dob").isDate().withMessage("Date of Birth must be a valid date"),

  // 7. ARRAY
  body("skills")
    .isArray({ min: 1 })
    .withMessage("Skills must be an array with at least 1 skill"),

  // 8. NESTED OBJECT
  body("address").isObject().withMessage("Address must be an object"),
  body("address.city").isString().withMessage("City must be a string"),
  body("address.zip").isPostalCode("IN").withMessage("Invalid Indian ZIP code"),

  // 9. ENUM / FIXED VALUES
  body("role")
    .isIn(["user", "admin", "manager"])
    .withMessage("Role must be one of: user, admin, manager"),
];
```

- Then you can check using middleware like bellow

```js
// validateMiddleware.js
const { validationResult } = require("express-validator");

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    logger.warn("Request validation failed:", { errors: errors.array() });
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  next();
};
```

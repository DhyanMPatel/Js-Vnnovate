# JWT Basics (Beginner -> Solid Fundamentals)

## What is JWT?

- A JWT is secure way to send information between a client and a server.
- Mainly use of JWT is in **Web application** & *APIs* to `verify users` & `prevent unAuthorized access`.

## What problem does JWT solve?

When you build an API, the server must answer this question for every request:

- **Is this user authenticated?** (Who are you?)
- **Is this user authorized?** (Are you allowed to do this?)

There are 2 common ways to keep a user logged in:

- **Session-based auth** (server stores session state)
- **Token-based auth** (client holds a token; server verifies it)

JWT is most commonly used as a **token format** for token-based authentication.

## JWT in one line

A JWT is a **compact string** that contains:

- **Claims** (user info / metadata)
- **A signature** made using a secret/private key

So that the server can later verify:

- **The token was issued by me**
- **The token was not changed**

## IMPORTANT: JWT is not encryption

JWT is usually **signed** (JWS), not **encrypted**.

- **Signed** means: anyone can read the payload, but they can’t change it without breaking the signature.
- **Encrypted** means: payload is hidden.

So:

- Never put secrets in JWT payload (passwords, OTPs, API keys).
- Put only what you’re okay with a client seeing.

## Where JWT is used

- **Authentication** in REST APIs / microservices
- **Authorization** (roles/scopes)
- **Single Sign-On** (SSO) style flows (often via OAuth/OIDC, which may use JWT)

## JWT format

![Structure of JWT](./images/Structure_of_JWT.png)

JWT looks like:

```
xxxxx.yyyyy.zzzzz
```

- `header.payload.signature`

Each part is **Base64URL** encoded.

## What is inside JWT?

### 1) Header

Contains **metadata** about how the JWT is signed.

Example header (JSON):

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

- `alg` tells verifier which algorithm was used (e.g., HS256, RS256).
- `typ` Token type, always "JWT".

#### Base64Url Encoded Header

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

### 2) Payload

Contains the information about claims (User).

Example payload:

```json
{
  "sub": "user_123",
  "role": "admin",
  "iat": 1734500000,
  "exp": 1734500900,
  "iss": "your-app",
  "aud": "your-users"
}
```

Common **registered claims**:

- `sub` (Subject): Represents the user or entity the token is about.
- `iat` (Issued At): Timestamp when the token was created.
- `exp` (Expiry): The time the token expires.
- `iss` (Issuer): The entity that issued the token.
- `aud` (Audience): The entity the token is intended for.
- `nbf` (Not Before): The time specifies when the token can be used.
- `jti` (JWT ID): A unique identifier for the token.

#### Base64Url Encoded Payload

```
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA4MzQ1MTIzLCJleHAiOjE3MDgzNTUxMjN9
```

### 3) Signature

Signature is computed using:

- `base64UrlEncode(header) + "." + base64UrlEncode(payload)`
- plus a secret key (HS*) or private key (RS*/ES\*)

```javascript
HMACSHA256(
    base64UrlEncode(header) + "." + base64UrlEncode(payload),
    secret
)
```

This signature is what prevents tampering.

#### Example of signature :

```
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

### Finally JWT

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA4MzQ1MTIzLCJleHAiOjE3MDgzNTUxMjN9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```

![How JWT Token works](./images/How_JWT_token_works.png)

## Access token vs Refresh token

### Access token

- **Short-lived** (e.g. 5-15 minutes)
- Used on every API request
- Usually sent in:
  - `Authorization: Bearer <accessToken>`

### Refresh token

- **Long-lived** (e.g. days/weeks)
- Used only to get a new access token
- Should be stored more safely (often **httpOnly cookie** in browsers)

## Stateless vs stateful (interview important)

JWT is often called **stateless**, because:

- The server doesn’t need to store per-user session info.

But real systems often become **partly stateful**, because you still need:

- Refresh token storage/rotation
- Logout / token revocation strategy
- Key rotation
- Risk detection

## Why JWT is popular

- **Fast verification** (no DB hit needed for each request)
- **Scales well** across servers (no shared session store required)
- Works nicely for **microservices**

## Where beginners get confused

- **JWT != login system**. JWT is just a token format.
- **JWT payload is readable**.
- JWT helps verify user identity, but doesn’t automatically solve:
  - logout
  - revocation
  - session invalidation

## When NOT to use JWT

- If you need instant logout/invalidation without refresh-token design
- If you already have strong session infrastructure (Redis sessions)
- If you are building a traditional server-rendered website and sessions are simpler

# FAANG Interview Notes: JWT Authentication

## Core definitions (say these confidently)

### Authentication

- Proving who the user is.

### Authorization

- Checking what the user can do.

### JWT

- A compact token format containing claims and a signature.
- Used commonly for stateless API auth.

## Must-know interview questions

### 1) JWT vs Sessions

Explain trade-offs:

- Sessions:

  - server stores state (Redis/DB)
  - easy logout/invalidate
  - scaling requires shared session store

- JWT:
  - server can verify without DB
  - scales well across microservices
  - logout/revocation requires extra design (refresh token store/blacklist)

### 2) Why JWT payload is not secure

Because it’s Base64URL encoded, not encrypted.

### 3) What is inside JWT?

- Header
- Payload (claims)
- Signature

### 4) HS256 vs RS256

- HS256: shared secret for sign+verify
- RS256: private key signs, public key verifies

When to prefer RS256:

- many services verify tokens (public key distribution)

### 5) How do you handle logout?

Good answer:

- short-lived access token
- refresh token stored server-side (hashed)
- revoke refresh token on logout
- optional access token blacklist if instant logout is required

### 6) How do you handle refresh tokens safely?

Good answer:

- store refresh token in httpOnly cookie
- store hashed refresh token server-side
- rotate refresh token on every refresh
- detect reuse (token replay) and revoke session

### 7) Where do you store tokens?

Browser best practice:

- access token in memory
- refresh token in httpOnly cookie

Mobile best practice:

- store tokens in secure storage (Keychain/Keystore)

### 8) What claims do you validate?

- `exp`
- `iss`
- `aud`
- allowlisted `alg`
- optionally `nbf`

### 9) What about key rotation?

- include `kid`
- verify using key corresponding to `kid`
- keep old keys until old tokens expire

## “Explain the flow” answer template

### Login

- User sends credentials
- Server verifies credentials
- Server issues access token (short) + refresh token (long)
- Refresh token stored in httpOnly cookie (browser)

### API call

- Client sends access token in `Authorization: Bearer`
- Server verifies signature + claims
- Server authorizes based on role/scopes

### Refresh

- Client hits refresh endpoint when access token expires
- Server validates refresh token against DB (hashed)
- Server rotates refresh token and returns new access token

## Red flags (what interviewers don’t like)

- “JWT is encrypted so it’s secure”
- “Store JWT in localStorage” (without talking about XSS)
- No refresh token strategy
- Long-lived access tokens
- Not validating issuer/audience

# JWT Security Checklist + Pitfalls (FAANG Notes)

## Golden rules

- **JWT payload is readable** (Base64URL)
- **Do not store secrets in JWT**
- Use **short-lived access tokens**
- Use **refresh tokens with rotation**
- Enforce **algorithm allowlist**
- Validate `iss`, `aud`, `exp`

## Token placement

### Authorization header

- `Authorization: Bearer <token>`
- Good for APIs

### Cookies

- Great for browsers (httpOnly refresh cookie)
- Must think about CSRF

## Common pitfalls

### 1) Storing access tokens in localStorage

Risk:

- XSS steals token

Better:

- keep access token in memory
- refresh token in httpOnly cookie

### 2) Not validating issuer/audience

Risk:

- tokens from other environments might be accepted

Add:

- `issuer` and `audience` checks in verification

### 3) Long-lived access tokens

Risk:

- stolen token usable for a long time

Fix:

- 5-15 minutes access token, refresh for long session

### 4) Putting PII in JWT

Risk:

- token logs leak user data

Fix:

- use `sub` and fetch details from DB if needed

### 5) No plan for revocation

If you never store any token state, you can’t revoke.

Fix:

- refresh-token store + rotation
- optional access-token blacklist for high-risk systems

### 6) Not rotating secrets / keys

Key rotation is expected at scale.

- use `kid`
- keep old keys until tokens expire

## Attack scenarios and mitigations

### Token theft via XSS

Mitigations:

- CSP + input sanitization
- httpOnly cookies for refresh tokens
- access token in memory

### Token theft via network

Mitigations:

- HTTPS everywhere
- HSTS

### Replay attacks

Mitigations:

- short access expiry
- refresh rotation + detect reuse
- `jti` tracking for special cases

## Production hardening checklist

- [ ] `JWT_ACCESS_SECRET` and `JWT_REFRESH_SECRET` are strong and rotated
- [ ] Access token expiry <= 15 minutes
- [ ] Refresh token stored hashed in DB/Redis
- [ ] Refresh token rotation implemented
- [ ] `issuer` + `audience` validated
- [ ] Allowed algorithms enforced (no implicit accept)
- [ ] Sensitive routes have rate limiting
- [ ] Logging never prints tokens
- [ ] CORS configured correctly
- [ ] Cookie flags:
  - [ ] `httpOnly: true`
  - [ ] `secure: true` in prod
  - [ ] `sameSite: strict/lax` as needed

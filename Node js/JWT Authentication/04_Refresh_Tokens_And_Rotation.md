# Refresh Tokens + Rotation (Advanced but Interview-Critical)

## Why refresh tokens exist

Access tokens should be short-lived.

But users don’t want to login every 15 minutes.

So we use:

- **Access token** (short)
- **Refresh token** (long)

Refresh token is exchanged for a new access token.

## Storage recommendation (Browser)

- **Access token**: memory (JS variable / state)
- **Refresh token**: `httpOnly` cookie (not readable by JS)

Why:

- if XSS happens, attacker can’t read refresh token cookie (httpOnly)

## Refresh token endpoints (typical)

- `POST /auth/login` -> sets refresh cookie + returns access token
- `POST /auth/refresh` -> reads refresh cookie -> rotates refresh token -> returns new access token
- `POST /auth/logout` -> revokes refresh token

## Rotation concept (VERY important)

If refresh tokens are long-lived and get stolen, attacker can keep refreshing forever.

Rotation reduces this:

- every refresh call issues a **new refresh token**
- old refresh token becomes invalid

If attacker uses an old refresh token, you can detect token reuse.

## Minimal refresh token schema (DB/Redis)

Store per session/device:

- `userId`
- `refreshTokenHash`
- `createdAt`
- `expiresAt`
- `revokedAt`
- `replacedByTokenId` (optional)
- `deviceId` / `ip` / `userAgent` (optional)

Important:

- store **hash of refresh token**, not raw token

## Practical Node.js pseudo-implementation

### 1) Create refresh token (random)

Refresh token should be random and unguessable.

```javascript
import crypto from "crypto";

export function createRefreshToken() {
  return crypto.randomBytes(64).toString("base64url");
}
```

### 2) Hash refresh token before storing

```javascript
import crypto from "crypto";

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}
```

### 3) Refresh flow (high-level)

```javascript
// PSEUDO CODE (structure to explain in interviews)

// POST /auth/refresh
// 1) Read refresh token from httpOnly cookie
// 2) Hash it
// 3) Find matching record in DB
// 4) If missing/revoked/expired => reject
// 5) Create new refresh token, store hash, revoke old
// 6) Return new access token + set new refresh cookie
```

## Logout (realistic)

Logout = revoke refresh token record.

- access token might still be valid for a few minutes
- but user won’t be able to refresh anymore

If you need instant logout:

- add access token blacklist (stateful)
- or use very short access expiry (but UX trade-off)

## Multi-device sessions

A user can be logged in on:

- phone
- laptop

So refresh tokens should be tracked per device/session.

On logout:

- logout current device: revoke only that refresh token
- logout all devices: revoke all refresh tokens for that user

## CSRF note

If you store refresh token in cookie, consider CSRF.

Common pattern:

- refresh endpoint uses `SameSite=strict/lax`
- OR use CSRF token (double submit)
- AND require `Origin`/`Referer` checks for sensitive cookie-auth endpoints

# JWT Under the Hood (Clear Theory + Security Intuition)

## Base64URL encoding (why the payload is readable)

JWT uses **Base64URL encoding**, not encryption.

- Base64URL is just a text-safe way to represent bytes.
- You can decode header/payload in any online tool.

Meaning:

- If JWT contains `email`, it’s visible.
- If JWT contains `role`, it’s visible.

Visibility is not a bug — it’s expected.

## Signing: integrity + authenticity

JWT signing gives you:

- **Integrity**: token was not modified
- **Authenticity**: token was issued by someone who has the secret/private key

It does NOT give:

- **Confidentiality** (hiding data)

## JWS vs JWE

- **JWS**: JSON Web Signature (most “JWT auth” is JWS)
- **JWE**: JSON Web Encryption (rare in typical interview / CRUD APIs)

Most Node.js apps use JWS.

## Algorithms: HS256 vs RS256 (FAANG-level explanation)

### HS256 (HMAC + SHA-256)

- Uses **one shared secret** for signing and verifying.
- Pros:
  - simple
  - fast
- Cons:
  - anyone who can verify must also know the secret
  - secret leakage is catastrophic

Use cases:

- Single backend verifying tokens
- Internal services if secret distribution is managed well

### RS256 (RSA signature)

- Uses **private key** to sign, **public key** to verify.
- Pros:
  - you can share public key widely without risking signing ability
  - good for multi-service verification (microservices)
- Cons:
  - more complex key management

Use cases:

- Auth service signs; many services verify
- SSO / OIDC style

## Token verification flow (mental model)

When a request comes:

1. Extract token (usually from `Authorization` header)
2. Decode token header/payload
3. Verify signature using secret/public key
4. Verify registered User info (claims):
   - `exp` not expired
   - `iss` matches expected issuer
   - `aud` matches expected audience
   - `nbf` if present
5. Attach `req.user` and continue

## Claims: what should go in payload?

Put:

- stable identifier: `sub` (userId)
- minimal authorization info: `role` or `scopes`
- token metadata: `iat`, `exp`, `iss`, `aud`, `jti`

Avoid:

- passwords
- OTPs
- API keys
- PII that you don’t want visible
- large payloads (JWT is sent on every request)

## Expiration: why short-lived access tokens matter

If an access token leaks:

- attacker can use it until it expires

So you reduce damage by:

- keeping access tokens short-lived

Then refresh tokens exist to keep UX smooth.

## Logout problem (stateless drawback)

With classic server sessions:

- logout = delete session from Redis/DB

With JWT access tokens:

- server doesn’t store them
- you can’t “delete” them

Solutions:

- **short-lived access token** + refresh-token revocation
- **token blacklist** (stateful; usually Redis; store until expiry)

## Replay attacks and `jti`

A token can be copied and replayed.

`jti` (JWT ID) helps:

- uniquely identify a token
- implement revocation lists
- implement refresh rotation tracking

## Key rotation (very interview-relevant)

If you rotate signing keys:

- older tokens must still verify for some time

Common approach:

- use a `kid` (key id) in header
- verifier picks correct public key by `kid`
- keep old keys until all tokens signed with them expire

## Common security vulnerabilities

### 1) Accepting `alg: none`

Bad libraries or misconfig can allow “no signature” tokens.

Rule:

- never trust token’s `alg` from the token alone
- your server should enforce expected algorithms

### 2) Storing JWT in `localStorage` (browser)

- vulnerable to XSS: attacker reads token and steals it

For browsers, prefer:

- access token in memory
- refresh token in **httpOnly cookie**

### 3) Putting authorization logic only in frontend

Frontend checks are not security.

Always enforce authorization on server.

### 4) Overstuffing JWT

If you put huge objects:

- request headers grow
- latency grows
- proxies can reject large headers

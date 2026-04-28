# Production Security Checklist

Backend gates already present:
- `ENV=production` requires a strong `SECRET_KEY`.
- `ENV=production` requires `DATABASE_URL` with PostgreSQL.
- `ENV=production` requires `ALLOWED_HOSTS`.
- CORS uses an allowlist.
- Trusted host middleware is enabled when `ALLOWED_HOSTS` is set.
- Security headers include CSP, COOP, frame protection, nosniff, and referrer policy.
- HSTS is enabled in production.
- Request body size is capped by `MAX_REQUEST_BYTES`.
- Login, register, admin verify, chat, and client-log endpoints are rate limited.

Deploy requirements:
- Set `ENV=production`.
- Set `SECRET_KEY` to a high-entropy value and do not commit it.
- Set `DATABASE_URL` to PostgreSQL.
- Set `ALLOWED_ORIGINS` to the real frontend domains only.
- Set `ALLOWED_HOSTS` to the real hostnames only.
- Keep `DEBUG_HTTP_LOG=0` unless debugging a short incident window.
- Review CSP before adding external scripts, fonts, analytics, or CDN assets.

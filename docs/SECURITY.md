# Security baseline

- Never place secrets in browser code or commit real credentials.
- All personal fitness, nutrition and health records must be scoped to the authenticated account at the database layer.
- Production must use HTTPS, secure HttpOnly SameSite cookies, CSRF protection where applicable, rate limits and strict input validation.
- Uploaded photos must use private object storage and short-lived signed access URLs.
- AI providers receive only the minimum user-approved data required for a request.
- Users must be able to export and delete their account data.
- This repository is public by user choice; never put real user records, credentials, production configuration or private uploads here.

This is an initial checklist, not a completed security audit.

# Shorlah Cloud — Meta Integration Toolkit

A standalone developer workspace for building and maintaining authorized Meta platform integrations.

## Initial modules
- Facebook Login (OAuth)
- Graph API Explorer
- Facebook Pages
- Marketing API
- Messenger automation
- Webhooks
- Diagnostics and client project workspaces

## Development
```bash
npm install
npm run dev
```

## Security principles
- Never expose Meta App Secrets or access tokens in browser code.
- Keep OAuth code exchange and token handling server-side.
- Request only the permissions required for a client's use case.
- Respect Meta platform policies, app review and data-use requirements.
- Keep client credentials and records isolated by workspace.

## Current status
The initial dashboard and navigation foundation are in place. Live Meta connections, authentication, database persistence and server-side API routes are not yet configured. Dashboard counts are explicit empty states, not sample business data.

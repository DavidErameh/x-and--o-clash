# Troubleshooting Guide

## Common Issues

### 1. "Application Error: A client-side exception has occurred"

- **Cause**: Likely a hydration mismatch or missing env variable on client.
- **Fix**: Check browser console for specific error. Ensure `NEXT_PUBLIC_` variables are set.

### 2. "Realtime Connection Failed"

- **Cause**: Supabase RLS policies blocking access or network firewall.
- **Fix**: Verify user is authenticated. Check browser network tab for websocket 403 errors.

### 3. "Webhook Signature Verification Failed"

- **Cause**: `WHOP_WEBHOOK_SECRET` does not match the dashboard setting.
- **Fix**: Rotate the secret in Whop dashboard and update Vercel env vars.

### 4. "Build Failed on Vercel"

- **Cause**: Often due to `npm run build` trying to connect to DB without secrets.
- **Fix**: Ensure `WHOP_API_KEY` and Supabase keys are present in Vercel Project Settings.

## Support

For critical issues, check the Vercel logs and Supabase logs for server-side errors.

# X&O Clash Launch Checklist

## Pre-Deployment Verification

- [ ] **Tests Pass**: Run `npm run test:all` and ensure 100% pass rate.
- [ ] **Build Succeeds**: Run `npm run build` locally to catch static generation errors.
- [ ] **Environment Variables**: Verify all secrets are added to Vercel project settings.
- [ ] **Database Helpers**: Ensure database policies (RLS) are active and strict.

## Deployment Steps

1. Push `main` branch to GitHub.
2. Verify Vercel deployment triggers and succeeds.
3. Check Vercel logs for any runtime warnings.

## Post-Launch Manual QA

- [ ] **Auth Flow**: Sign in with a new Whop user account.
- [ ] **Gameplay**: Complete one AI game and one PvP game.
- [ ] **Realtime**: Measure sync speed (should be near instant).
- [ ] **Responsiveness**: Check UI on mobile device (or simulated mobile).
- [ ] **Payments**: Verify "Pro" features are locked/unlocked correctly.

## Emergency Rollback

If critical issues are found:

1. Revert to previous commit on `main`.
2. Redeploy previous stable deployment on Vercel.
3. Notify users via Whop community updates.

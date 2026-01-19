This is a template for a whop app built in NextJS. Fork it and keep the parts you need for your app.

# Whop NextJS App Template

To run this project:

1. Install dependencies with: `pnpm i`

2. Create a Whop App on your [whop developer dashboard](https://whop.com/dashboard/developer/), then go to the "Hosting" section and:
   - Ensure the "Base URL" is set to the domain you intend to deploy the site on.
   - Ensure the "App path" is set to `/experiences/[experienceId]`
   - Ensure the "Dashboard path" is set to `/dashboard/[companyId]`
   - Ensure the "Discover path" is set to `/discover`

3. Copy the environment variables from the `.env.development` into a `.env.local`. Ensure to use real values from the whop dashboard.

4. Go to a whop created in the same org as the app you created. Navigate to the tools section and add your app.

5. Run `pnpm dev` to start the dev server. Then in the top right of the window find a translucent settings icon. Select "localhost". The default port 3000 should work.

## Documentation

- [Launch Checklist](docs/launch-checklist.md) - Steps to verify before deployment
- [Environment Setup](docs/environment-setup.md) - Guide for local and production config
- [Troubleshooting](docs/troubleshooting.md) - Common issues and solutions
- [Post-Launch Metrics](docs/post-launch-metrics.md) - Success criteria tracking

## Deployment

Deploying to Vercel:

1. Push latest code to `main`
2. Configure environment variables in Vercel Project Settings (see `docs/environment-setup.md`)
3. Deploy!

For generic deployment:

```bash
npm run build:production
npm run start:production
```

## Testing

Run the full test suite:

```bash
npm test
```

## Troubleshooting

**App not loading properly?** Make sure to set the "App path" in your Whop developer dashboard. The placeholder text in the UI does not mean it's set - you must explicitly enter `/experiences/[experienceId]` (or your chosen path name)
a

**Make sure to add env.local** Make sure to get the real app environment vairables from your whop dashboard and set them in .env.local

For more info, see our docs at https://dev.whop.com/introduction

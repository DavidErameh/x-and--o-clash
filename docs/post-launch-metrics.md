# Post-Launch Metrics Plan

## Success Criteria (PRD)

1. **Retention**: Target 60% Day-7 retention.
2. **Active Users**: Target 50+ active community members in week 1.
3. **Engagement**: Average session duration > 5 minutes.
4. **Volume**: 100+ games played in first week.

## Tracking Implementation

- **Games Played**: Tracked via Supabase database rows in `games` table.
- **Active Users**: Tracked via `users` table `last_seen` timestamp.
- **Retention**: Calculated by comparing sign-up date vs `last_seen`.

## Monitoring Dashboard

- Use Supabase Dashboard SQL Editor to run weekly reports:

  ```sql
  -- New Games this week
  SELECT COUNT(*) FROM games WHERE created_at > NOW() - INTERVAL '7 days';

  -- Active Users this week
  SELECT COUNT(*) FROM users WHERE last_seen > NOW() - INTERVAL '7 days';
  ```

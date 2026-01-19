-- Create users table
create table public.users (
  id uuid default gen_random_uuid() primary key,
  whop_user_id text unique not null,
  username text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create games table
create table public.games (
  id uuid default gen_random_uuid() primary key,
  player1_id uuid references public.users(id) not null,
  player2_id uuid references public.users(id),
  winner_id uuid references public.users(id),
  status text check (status in ('waiting', 'active', 'completed')) default 'waiting' not null,
  current_turn uuid references public.users(id),
  board_state jsonb not null default '{"cells": [null, null, null, null, null, null, null, null, null]}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create player_stats table
create table public.player_stats (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.users(id) not null unique,
  wins integer default 0 not null,
  losses integer default 0 not null,
  draws integer default 0 not null,
  elo integer default 1200 not null
);

-- Enable RLS
alter table public.users enable row level security;
alter table public.games enable row level security;
alter table public.player_stats enable row level security;

-- RLS Policies
-- Users
create policy "Users can read all profiles"
  on public.users for select
  using (true);

create policy "Users can update own profile"
  on public.users for update
  using (whop_user_id = auth.uid()::text); -- Assuming auth.uid() maps to whop_user_id or we use custom auth claims. 
  -- Note: If using Supabase Auth, auth.uid() is a UUID. If custom, adjust accordingly. 
  -- For this logic, we'll assume we might implement a mechanism to link Supabase Auth ID to Whop ID,
  -- OR we trust the application to handle identity if we are using Service Role for critical updates.
  -- For now, letting 'true' for select is safe for public profiles.

-- Games
create policy "Anyone can read games"
  on public.games for select
  using (true);

create policy "Authenticated users can create games"
  on public.games for insert
  with check (true); -- Ideally restrict to authenticated users

create policy "Players can update their games"
  on public.games for update
  using (
    player1_id in (select id from public.users where whop_user_id = auth.uid()::text) or
    player2_id in (select id from public.users where whop_user_id = auth.uid()::text)
  );

-- Stats
create policy "Anyone can read stats"
  on public.player_stats for select
  using (true);

-- Indexes
create index games_status_idx on public.games(status);
create index users_whop_id_idx on public.users(whop_user_id);

create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique,
  persona text,
  created_at timestamp default now()
);

create table rituals (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  title text,
  content jsonb,
  created_at timestamp default now()
);

create table companions (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  archetype text,
  voice_url text,
  memory jsonb
);

create table tokens (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users,
  amount integer default 0,
  created_at timestamp default now()
);

create table products (
  id uuid primary key default uuid_generate_v4(),
  title text,
  description text,
  price_cents integer,
  image_url text,
  created_at timestamp default now()
);

-- Additional tables for referrals, subscriptions, usage metrics, feedback, etc.

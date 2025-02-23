-- Create users table
create table if not exists public.users (
  id uuid primary key references auth.users on delete cascade,
  email text not null,
  name text,
  avatar_url text,
  email_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Drop existing policies
drop policy if exists "Public profiles are viewable by everyone" on public.users;
drop policy if exists "Users can insert their own profile" on public.users;
drop policy if exists "Users can update own profile" on public.users;

-- Create new policies
create policy "Public profiles are viewable by everyone"
  on public.users for select
  using ( true );

create policy "Users can insert their own profile"
  on public.users for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on public.users for update
  using ( auth.uid() = id );

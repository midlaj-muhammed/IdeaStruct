-- Create users table
create table if not exists public.users (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.users enable row level security;

-- Create RLS policies
create policy "Users can view their own profile"
  on public.users for select
  using ( auth.uid() = id );

create policy "Users can update their own profile"
  on public.users for update
  using ( auth.uid() = id );

create policy "Users can insert their own profile"
  on public.users for insert
  with check ( auth.uid() = id );

-- Create ideas table
create table if not exists public.ideas (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.users on delete cascade not null,
  title text not null,
  description text,
  blueprint text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.ideas enable row level security;

-- Create RLS policies
create policy "Users can view their own ideas"
  on public.ideas for select
  using ( auth.uid() = user_id );

create policy "Users can create their own ideas"
  on public.ideas for insert
  with check ( auth.uid() = user_id );

create policy "Users can update their own ideas"
  on public.ideas for update
  using ( auth.uid() = user_id );

create policy "Users can delete their own ideas"
  on public.ideas for delete
  using ( auth.uid() = user_id );

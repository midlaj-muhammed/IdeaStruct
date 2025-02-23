
-- Create profiles table
create table profiles (
  id uuid references auth.users on delete cascade,
  email text unique not null,
  full_name text,
  role text,
  company text,
  experience text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (id)
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

-- Create policies
create policy "Users can view their own profile" 
  on profiles for select 
  using (auth.uid() = id);

create policy "Users can update their own profile" 
  on profiles for update 
  using (auth.uid() = id);

-- Create a trigger to set updated_at on update
create trigger set_updated_at
  before update on profiles
  for each row
  execute function public.set_updated_at();


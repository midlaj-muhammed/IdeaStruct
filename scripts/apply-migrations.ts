import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

async function applyMigrations() {
  try {
    // Create Supabase admin client
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // Using service role key for admin access
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )

    // Check if users table exists
    const { error: tableError } = await supabaseAdmin
      .from('users')
      .select()
      .limit(1)
      .single()

    if (tableError) {
      console.log('Creating users table...')
      const { error: createError } = await supabaseAdmin.rpc(
        'create_table',
        {
          table_sql: `
            create table if not exists public.users (
              id uuid references auth.users on delete cascade primary key,
              email text not null unique,
              name text,
              avatar_url text,
              created_at timestamp with time zone default timezone('utc'::text, now()) not null,
              updated_at timestamp with time zone default timezone('utc'::text, now()) not null
            );

            -- Create updated_at trigger
            create or replace function public.handle_updated_at()
            returns trigger
            language plpgsql
            as $$
            begin
              new.updated_at = timezone('utc'::text, now());
              return new;
            end;
            $$;

            -- Create the trigger if it doesn't exist
            drop trigger if exists users_updated_at on public.users;
            create trigger users_updated_at
              before update on public.users
              for each row
              execute function public.handle_updated_at();

            -- Enable RLS
            alter table public.users enable row level security;

            -- Create policies
            drop policy if exists "Users can view their own profile" on public.users;
            drop policy if exists "Users can update their own profile" on public.users;
            drop policy if exists "Users can delete their own profile" on public.users;
            drop policy if exists "Auth users can read profiles" on public.users;

            create policy "Users can view their own profile"
              on public.users for select
              using (auth.uid() = id);

            create policy "Users can update their own profile"
              on public.users for update
              using (auth.uid() = id);

            create policy "Users can delete their own profile"
              on public.users for delete
              using (auth.uid() = id);

            create policy "Auth users can read profiles"
              on public.users for select
              using (auth.role() = 'authenticated');
          `
        }
      )

      if (createError) {
        console.error('Error creating table:', createError)
        throw createError
      }
    }

    console.log('Migrations applied successfully')
  } catch (error) {
    console.error('Error applying migrations:', error)
    process.exit(1)
  }
}

applyMigrations()

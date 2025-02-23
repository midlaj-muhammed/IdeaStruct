-- Drop existing objects
DROP TABLE IF EXISTS public.users CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Create users table
CREATE TABLE IF NOT EXISTS public.users (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile"
    ON public.users FOR SELECT
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
    ON public.users FOR UPDATE
    USING (auth.uid() = id);

CREATE POLICY "Users can delete own profile"
    ON public.users FOR DELETE
    USING (auth.uid() = id);

CREATE POLICY "Auth users can read profiles"
    ON public.users FOR SELECT
    USING (auth.role() = 'authenticated');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_users_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION public.update_users_updated_at();

-- Create a trigger to automatically create a user profile
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    _email text;
BEGIN
    -- Get the email from auth.users
    SELECT email INTO _email
    FROM auth.users
    WHERE id = NEW.id;

    -- Insert into public.users with logging
    RAISE LOG 'Creating new user record: id=%, email=%', NEW.id, _email;
    
    INSERT INTO public.users (id, email)
    VALUES (NEW.id, _email);

    RAISE LOG 'Successfully created user record';
    
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    RAISE LOG 'Error creating user record: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_user();

-- Create policy to allow the trigger function to insert
CREATE POLICY "Allow trigger to create user profiles"
    ON public.users FOR INSERT
    WITH CHECK (true);  -- This allows the SECURITY DEFINER function to insert

-- Insert any existing auth users that don't have profiles
INSERT INTO public.users (id, email)
SELECT id, email
FROM auth.users u
WHERE NOT EXISTS (
    SELECT 1
    FROM public.users
    WHERE id = u.id
);

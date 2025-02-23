-- Drop existing objects
DROP TABLE IF EXISTS ideas CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ideas table
CREATE TABLE ideas (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL,
    idea TEXT NOT NULL,
    platform TEXT NOT NULL CHECK (platform IN ('web', 'mobile', 'desktop', 'cross-platform')),
    target_audience TEXT,
    features TEXT,
    blueprint TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT fk_user
        FOREIGN KEY (user_id)
        REFERENCES public.users(id)
        ON DELETE CASCADE
);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_ideas_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER update_ideas_updated_at
    BEFORE UPDATE ON ideas
    FOR EACH ROW
    EXECUTE FUNCTION update_ideas_updated_at();

-- Create indexes
CREATE INDEX ideas_user_id_idx ON ideas(user_id);
CREATE INDEX ideas_created_at_idx ON ideas(created_at DESC);

-- Enable RLS
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can create their own ideas"
    ON ideas FOR INSERT
    WITH CHECK (
        auth.role() = 'authenticated' AND 
        auth.uid() = user_id AND 
        EXISTS (
            SELECT 1 
            FROM public.users 
            WHERE id = user_id
        )
    );

CREATE POLICY "Users can view their own ideas"
    ON ideas FOR SELECT
    USING (
        auth.role() = 'authenticated' AND 
        auth.uid() = user_id
    );

CREATE POLICY "Users can update their own ideas"
    ON ideas FOR UPDATE
    USING (
        auth.role() = 'authenticated' AND 
        auth.uid() = user_id
    );

CREATE POLICY "Users can delete their own ideas"
    ON ideas FOR DELETE
    USING (
        auth.role() = 'authenticated' AND 
        auth.uid() = user_id
    );

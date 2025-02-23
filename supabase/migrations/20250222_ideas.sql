-- Create ideas table
CREATE TABLE IF NOT EXISTS ideas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  idea TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('web', 'mobile', 'both')),
  target TEXT,
  features TEXT
);

-- Enable RLS
ALTER TABLE ideas ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (we can restrict this later if we add auth)
CREATE POLICY "Allow all operations" ON ideas FOR ALL USING (true);

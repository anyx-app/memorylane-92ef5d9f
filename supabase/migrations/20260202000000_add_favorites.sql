-- Create favorites table
CREATE TABLE IF NOT EXISTS favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  photo_id UUID NOT NULL, -- Assuming photos table exists, but foreign key might be tricky if photos table is not standard. 
                          -- Based on inspect_schema, 'photos' table exists.
                          -- Let's add FK if possible, or just keep it as UUID.
                          -- The contract said "Add foreign key constraints to profiles and photos".
                          -- 'profiles' table exists. 'photos' table exists.
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, photo_id)
);

-- Add foreign key to photos if not already present (safe to add constraint if table exists)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'favorites_photo_id_fkey'
    ) THEN
        ALTER TABLE favorites
        ADD CONSTRAINT favorites_photo_id_fkey
        FOREIGN KEY (photo_id) REFERENCES photos(id) ON DELETE CASCADE;
    END IF;
END $$;

-- Add foreign key to profiles (via user_id) - actually user_id references auth.users usually.
-- But if we want to reference profiles, we can.
-- Usually user_id is auth.users.
-- Let's stick to auth.users for user_id as defined above.

-- Enable RLS
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own favorites" 
ON favorites FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own favorites" 
ON favorites FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own favorites" 
ON favorites FOR DELETE 
USING (auth.uid() = user_id);


SET search_path TO proj_5a69f37d;

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. profiles
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY, 
    email text,
    full_name text,
    avatar_url text,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" 
ON profiles FOR SELECT 
USING (true);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" 
ON profiles FOR UPDATE 
USING (id::text = current_setting('request.jwt.claims', true)::json->>'sub');

-- 2. families
CREATE TABLE IF NOT EXISTS families (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name text NOT NULL,
    description text,
    created_by UUID REFERENCES profiles(id),
    created_at timestamptz DEFAULT now()
);

ALTER TABLE families ENABLE ROW LEVEL SECURITY;

-- 3. family_members
CREATE TABLE IF NOT EXISTS family_members (
    family_id UUID REFERENCES families(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    role text CHECK (role IN ('owner', 'admin', 'member')),
    joined_at timestamptz DEFAULT now(),
    PRIMARY KEY (family_id, profile_id)
);

ALTER TABLE family_members ENABLE ROW LEVEL SECURITY;

-- 4. albums
CREATE TABLE IF NOT EXISTS albums (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID REFERENCES families(id) ON DELETE CASCADE,
    title text NOT NULL,
    description text,
    cover_photo_id UUID,
    created_by UUID REFERENCES profiles(id),
    created_at timestamptz DEFAULT now()
);

ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

-- 5. photos
CREATE TABLE IF NOT EXISTS photos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    family_id UUID REFERENCES families(id) ON DELETE CASCADE,
    album_id UUID REFERENCES albums(id) ON DELETE SET NULL,
    storage_path text NOT NULL,
    caption text,
    taken_at timestamptz,
    uploaded_by UUID REFERENCES profiles(id),
    uploaded_at timestamptz DEFAULT now(),
    metadata jsonb
);

ALTER TABLE photos ENABLE ROW LEVEL SECURITY;

-- Add FK for album cover now that photos exists
-- Check if constraint exists before adding to avoid error
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_album_cover') THEN
        ALTER TABLE albums ADD CONSTRAINT fk_album_cover FOREIGN KEY (cover_photo_id) REFERENCES photos(id) ON DELETE SET NULL;
    END IF;
END $$;

-- 6. comments
CREATE TABLE IF NOT EXISTS comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    photo_id UUID REFERENCES photos(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    content text NOT NULL,
    created_at timestamptz DEFAULT now()
);

ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 7. reactions
CREATE TABLE IF NOT EXISTS reactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    photo_id UUID REFERENCES photos(id) ON DELETE CASCADE,
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    reaction_type text NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(photo_id, profile_id)
);

ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- RLS POLICIES

-- Families: Viewable if member
DROP POLICY IF EXISTS "View families if member" ON families;
CREATE POLICY "View families if member"
ON families FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM family_members fm
        WHERE fm.family_id = families.id
        AND fm.profile_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);

-- Family Members: Viewable if member of same family
DROP POLICY IF EXISTS "View family members" ON family_members;
CREATE POLICY "View family members"
ON family_members FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM family_members fm
        WHERE fm.family_id = family_members.family_id
        AND fm.profile_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);

-- Albums: Viewable if member of family
DROP POLICY IF EXISTS "View albums" ON albums;
CREATE POLICY "View albums"
ON albums FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM family_members fm
        WHERE fm.family_id = albums.family_id
        AND fm.profile_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);

-- Photos: Viewable if member of family
DROP POLICY IF EXISTS "View photos" ON photos;
CREATE POLICY "View photos"
ON photos FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM family_members fm
        WHERE fm.family_id = photos.family_id
        AND fm.profile_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);

-- Comments/Reactions: Viewable if member of family (via photo)
DROP POLICY IF EXISTS "View comments" ON comments;
CREATE POLICY "View comments"
ON comments FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM photos p
        JOIN family_members fm ON fm.family_id = p.family_id
        WHERE p.id = comments.photo_id
        AND fm.profile_id::text = current_setting('request.jwt.claims', true)::json->>'sub'
    )
);


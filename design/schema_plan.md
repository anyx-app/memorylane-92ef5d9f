# Schema Plan - MemoryLane

## Overview
MemoryLane requires a schema that supports private family groups, photo organization (albums/timeline), and social interactions (comments/reactions) within those secure groups.

## Tables

### 1. profiles
Extends the default Supabase `auth.users` table.
- **id** (uuid, PK): References `auth.users.id`.
- **email** (text): Cached email for display.
- **full_name** (text): Display name.
- **avatar_url** (text): Profile picture.
- **created_at** (timestamptz): Default now().

### 2. families
Represents a private group of users.
- **id** (uuid, PK): Default uuid_generate_v4().
- **name** (text): The family name (e.g., "The Smiths").
- **description** (text): Optional description.
- **created_by** (uuid, FK): References `profiles.id`.
- **created_at** (timestamptz): Default now().

### 3. family_members
Junction table for Users <-> Families.
- **family_id** (uuid, FK): References `families.id`.
- **profile_id** (uuid, FK): References `profiles.id`.
- **role** (text): Enum or check constraint ('owner', 'admin', 'member').
- **joined_at** (timestamptz): Default now().
- **PK**: Composite (family_id, profile_id).

### 4. albums
Collections of photos within a family.
- **id** (uuid, PK): Default uuid_generate_v4().
- **family_id** (uuid, FK): References `families.id`.
- **title** (text): Album title.
- **description** (text): Album description.
- **cover_photo_id** (uuid, FK): References `photos.id` (nullable).
- **created_by** (uuid, FK): References `profiles.id`.
- **created_at** (timestamptz): Default now().

### 5. photos
The core content. Linked to a family, and optionally an album.
- **id** (uuid, PK): Default uuid_generate_v4().
- **family_id** (uuid, FK): References `families.id`. Used for RLS (Row Level Security).
- **album_id** (uuid, FK): References `albums.id` (nullable).
- **storage_path** (text): Path in Supabase Storage.
- **caption** (text): User caption.
- **taken_at** (timestamptz): The date the photo was taken (for timeline sorting).
- **uploaded_by** (uuid, FK): References `profiles.id`.
- **uploaded_at** (timestamptz): Default now().
- **metadata** (jsonb): Width, height, format, exif data.

### 6. comments
- **id** (uuid, PK): Default uuid_generate_v4().
- **photo_id** (uuid, FK): References `photos.id`.
- **profile_id** (uuid, FK): References `profiles.id`.
- **content** (text): The comment text.
- **created_at** (timestamptz): Default now().

### 7. reactions
- **id** (uuid, PK): Default uuid_generate_v4().
- **photo_id** (uuid, FK): References `photos.id`.
- **profile_id** (uuid, FK): References `profiles.id`.
- **reaction_type** (text): Emoji or type code.
- **created_at** (timestamptz): Default now().
- **Constraint**: Unique on (photo_id, profile_id).

## Security (RLS) Strategy
- **profiles**: Public read (for family members), update own.
- **families**: Read if member. Create authenticated. Update if admin/owner.
- **family_members**: Read if member of family.
- **albums**: Read if member of `family_id`. Create/Update if member of `family_id`.
- **photos**: Read if member of `family_id`. Create/Update if member of `family_id`.
- **comments/reactions**: Read if member of `family_id` (via photo). Create if member.

## Next Steps
1. Create migration file based on this plan.
2. Enable RLS.
3. Setup Storage buckets for photos.

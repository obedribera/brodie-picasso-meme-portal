-- Drop existing table if it exists
DROP TABLE IF EXISTS artworks;

-- Create the artworks table with proper structure
CREATE TABLE artworks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  artist_name TEXT NOT NULL,
  wallet_address TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  votes INTEGER DEFAULT 0 NOT NULL
);

-- Enable Row Level Security
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Create storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('artworks', 'artworks', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Drop any existing policies
DROP POLICY IF EXISTS "Allow public read access" ON artworks;
DROP POLICY IF EXISTS "Allow public insert" ON artworks;
DROP POLICY IF EXISTS "Allow public update" ON artworks;
DROP POLICY IF EXISTS "Allow public storage access" ON storage.objects;

-- Create necessary policies for the artworks table
CREATE POLICY "Allow public read access"
ON artworks FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow public insert"
ON artworks FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update"
ON artworks FOR UPDATE
TO public
USING (true)
WITH CHECK (true);

-- Create storage policies
CREATE POLICY "Allow public storage access"
ON storage.objects FOR ALL
TO public
USING (bucket_id = 'artworks')
WITH CHECK (bucket_id = 'artworks');

-- Grant necessary permissions
GRANT ALL ON artworks TO public;
GRANT ALL ON storage.objects TO public;
GRANT ALL ON storage.buckets TO public;
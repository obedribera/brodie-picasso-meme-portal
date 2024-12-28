-- Create the artworks table
CREATE TABLE IF NOT EXISTS artworks (
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

-- Create policies
CREATE POLICY "Allow public read access"
  ON artworks
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated insert"
  ON artworks
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow vote updates"
  ON artworks
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);
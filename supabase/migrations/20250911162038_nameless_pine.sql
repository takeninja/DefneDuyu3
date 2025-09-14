/*
  # Create posts table for blog management

  1. New Tables
    - `posts`
      - `id` (uuid, primary key)
      - `title` (text, not null) - Blog post title
      - `slug` (text, unique, not null) - URL-friendly identifier
      - `content` (text, not null) - Main blog content
      - `author` (text, not null) - Author name
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on `posts` table
    - Add policy for public read access to published posts
    - Add policy for authenticated users to manage posts
*/

CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  content text NOT NULL,
  author text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all posts
CREATE POLICY "Posts are publicly readable"
  ON posts
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert, update, and delete posts
CREATE POLICY "Authenticated users can manage posts"
  ON posts
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);
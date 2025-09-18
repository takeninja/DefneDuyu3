/*
  # Create social media platform tables

  1. New Tables
    - `social_posts`
      - `id` (uuid, primary key)
      - `content` (text, not null) - Post content
      - `image_url` (text, optional) - Image URL if post has image
      - `author_email` (text, not null) - Author's email
      - `author_name` (text, not null) - Author's display name
      - `likes_count` (integer, default 0) - Number of likes
      - `comments_count` (integer, default 0) - Number of comments
      - `shares_count` (integer, default 0) - Number of shares
      - `created_at` (timestamptz) - Creation timestamp

    - `social_comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key to social_posts)
      - `content` (text, not null) - Comment content
      - `author_email` (text, not null) - Commenter's email
      - `author_name` (text, not null) - Commenter's display name
      - `created_at` (timestamptz) - Creation timestamp

    - `social_likes`
      - `id` (uuid, primary key)
      - `post_id` (uuid, foreign key to social_posts)
      - `user_email` (text, not null) - User's email who liked
      - `created_at` (timestamptz) - Creation timestamp

  2. Security
    - Enable RLS on all social tables
    - Add policies for authenticated users to read all posts
    - Add policies for authenticated users to create their own content
    - Add policies for users to manage their own likes and comments
*/

-- Create social_posts table
CREATE TABLE IF NOT EXISTS social_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  content text NOT NULL,
  image_url text,
  author_email text NOT NULL,
  author_name text NOT NULL,
  likes_count integer DEFAULT 0,
  comments_count integer DEFAULT 0,
  shares_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create social_comments table
CREATE TABLE IF NOT EXISTS social_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES social_posts(id) ON DELETE CASCADE,
  content text NOT NULL,
  author_email text NOT NULL,
  author_name text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create social_likes table
CREATE TABLE IF NOT EXISTS social_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES social_posts(id) ON DELETE CASCADE,
  user_email text NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_email)
);

-- Enable RLS on all tables
ALTER TABLE social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE social_likes ENABLE ROW LEVEL SECURITY;

-- Policies for social_posts
CREATE POLICY "Authenticated users can read all posts"
  ON social_posts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON social_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own posts"
  ON social_posts
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = author_email)
  WITH CHECK (auth.jwt() ->> 'email' = author_email);

CREATE POLICY "Users can delete their own posts"
  ON social_posts
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = author_email);

-- Policies for social_comments
CREATE POLICY "Authenticated users can read all comments"
  ON social_comments
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON social_comments
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their own comments"
  ON social_comments
  FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = author_email)
  WITH CHECK (auth.jwt() ->> 'email' = author_email);

CREATE POLICY "Users can delete their own comments"
  ON social_comments
  FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = author_email);

-- Policies for social_likes
CREATE POLICY "Authenticated users can read all likes"
  ON social_likes
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage their own likes"
  ON social_likes
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'email' = user_email)
  WITH CHECK (auth.jwt() ->> 'email' = user_email);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_social_posts_created_at ON social_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_social_posts_author ON social_posts(author_email);
CREATE INDEX IF NOT EXISTS idx_social_comments_post_id ON social_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_social_comments_created_at ON social_comments(created_at);
CREATE INDEX IF NOT EXISTS idx_social_likes_post_id ON social_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_social_likes_user_email ON social_likes(user_email);
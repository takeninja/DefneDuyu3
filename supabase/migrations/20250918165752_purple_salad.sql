/*
  # Add database functions for like counting

  1. Functions
    - increment_likes: Safely increment like count for a post
    - decrement_likes: Safely decrement like count for a post

  2. Security
    - Functions are accessible to authenticated users
*/

-- Function to increment likes count
CREATE OR REPLACE FUNCTION increment_likes(post_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE social_posts 
  SET likes_count = COALESCE(likes_count, 0) + 1
  WHERE id = post_id
  RETURNING likes_count INTO new_count;
  
  RETURN COALESCE(new_count, 0);
END;
$$;

-- Function to decrement likes count
CREATE OR REPLACE FUNCTION decrement_likes(post_id uuid)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  new_count integer;
BEGIN
  UPDATE social_posts 
  SET likes_count = GREATEST(COALESCE(likes_count, 0) - 1, 0)
  WHERE id = post_id
  RETURNING likes_count INTO new_count;
  
  RETURN COALESCE(new_count, 0);
END;
$$;
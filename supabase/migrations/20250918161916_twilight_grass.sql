/*
  # Social Media Platform Complete Schema

  1. New Tables
    - `profiles` - User profile information
    - `friends` - Friend relationships and requests
    - `messages` - Real-time chat messages
    - `saved_posts` - User saved posts
    - `events` - Community events
    - `event_rsvps` - Event RSVP responses
    - `stats` - Community statistics

  2. Security
    - Enable RLS on all tables
    - Add appropriate policies for each table
    - Ensure users can only access their own data or public data

  3. Indexes
    - Add indexes for performance optimization
    - Foreign key relationships properly indexed
*/

-- Profiles table for extended user information
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  avatar_url text,
  bio text,
  location text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Friends table for managing friend relationships
CREATE TABLE IF NOT EXISTS friends (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  requester_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  addressee_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(requester_id, addressee_id)
);

-- Messages table for real-time chat
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  receiver_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Saved posts table
CREATE TABLE IF NOT EXISTS saved_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  post_id uuid REFERENCES social_posts(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, post_id)
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text,
  event_date timestamptz NOT NULL,
  location text,
  image_url text,
  max_attendees integer,
  is_public boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Event RSVPs table
CREATE TABLE IF NOT EXISTS event_rsvps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id uuid REFERENCES events(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status text CHECK (status IN ('going', 'maybe', 'not_going')) DEFAULT 'going',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(event_id, user_id)
);

-- Community stats table
CREATE TABLE IF NOT EXISTS stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_name text UNIQUE NOT NULL,
  stat_value integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_friends_requester ON friends(requester_id);
CREATE INDEX IF NOT EXISTS idx_friends_addressee ON friends(addressee_id);
CREATE INDEX IF NOT EXISTS idx_friends_status ON friends(status);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_saved_posts_user ON saved_posts(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_posts_post ON saved_posts(post_id);
CREATE INDEX IF NOT EXISTS idx_events_creator ON events(creator_id);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(event_date);
CREATE INDEX IF NOT EXISTS idx_event_rsvps_event ON event_rsvps(event_id);
CREATE INDEX IF NOT EXISTS idx_event_rsvps_user ON event_rsvps(user_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_rsvps ENABLE ROW LEVEL SECURITY;
ALTER TABLE stats ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Friends policies
CREATE POLICY "Users can view their friend relationships" ON friends 
  FOR SELECT TO authenticated 
  USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

CREATE POLICY "Users can create friend requests" ON friends 
  FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = requester_id);

CREATE POLICY "Users can update friend requests they're involved in" ON friends 
  FOR UPDATE TO authenticated 
  USING (auth.uid() = requester_id OR auth.uid() = addressee_id);

-- Messages policies
CREATE POLICY "Users can view their messages" ON messages 
  FOR SELECT TO authenticated 
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" ON messages 
  FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their received messages" ON messages 
  FOR UPDATE TO authenticated 
  USING (auth.uid() = receiver_id);

-- Saved posts policies
CREATE POLICY "Users can view their saved posts" ON saved_posts 
  FOR SELECT TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can save posts" ON saved_posts 
  FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can remove their saved posts" ON saved_posts 
  FOR DELETE TO authenticated 
  USING (auth.uid() = user_id);

-- Events policies
CREATE POLICY "Users can view public events" ON events 
  FOR SELECT TO authenticated 
  USING (is_public = true OR auth.uid() = creator_id);

CREATE POLICY "Users can create events" ON events 
  FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own events" ON events 
  FOR UPDATE TO authenticated 
  USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete their own events" ON events 
  FOR DELETE TO authenticated 
  USING (auth.uid() = creator_id);

-- Event RSVPs policies
CREATE POLICY "Users can view event RSVPs" ON event_rsvps 
  FOR SELECT TO authenticated 
  USING (true);

CREATE POLICY "Users can create their own RSVPs" ON event_rsvps 
  FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own RSVPs" ON event_rsvps 
  FOR UPDATE TO authenticated 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own RSVPs" ON event_rsvps 
  FOR DELETE TO authenticated 
  USING (auth.uid() = user_id);

-- Stats policies
CREATE POLICY "Anyone can view stats" ON stats FOR SELECT TO authenticated USING (true);
CREATE POLICY "System can update stats" ON stats FOR ALL TO authenticated USING (true);

-- Insert initial stats
INSERT INTO stats (stat_name, stat_value) VALUES 
  ('total_users', 0),
  ('weekly_posts', 0),
  ('new_users_week', 0)
ON CONFLICT (stat_name) DO NOTHING;

-- Function to update user stats
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Update total users
  UPDATE stats 
  SET stat_value = (SELECT COUNT(*) FROM auth.users), 
      updated_at = now()
  WHERE stat_name = 'total_users';
  
  -- Update weekly posts
  UPDATE stats 
  SET stat_value = (
    SELECT COUNT(*) 
    FROM social_posts 
    WHERE created_at >= now() - interval '7 days'
  ), 
  updated_at = now()
  WHERE stat_name = 'weekly_posts';
  
  -- Update new users this week
  UPDATE stats 
  SET stat_value = (
    SELECT COUNT(*) 
    FROM auth.users 
    WHERE created_at >= now() - interval '7 days'
  ), 
  updated_at = now()
  WHERE stat_name = 'new_users_week';
END;
$$;
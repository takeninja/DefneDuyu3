@@ .. @@
 -- Friends table for managing friend relationships
 CREATE TABLE IF NOT EXISTS friends (
   id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
-  requester_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
-  addressee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
+  requester_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
+  target_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
   status text DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'blocked')),
   created_at timestamptz DEFAULT now(),
   updated_at timestamptz DEFAULT now(),
-  UNIQUE(requester_id, addressee_id)
+  UNIQUE(requester_id, target_id)
 );
 
 ALTER TABLE friends ENABLE ROW LEVEL SECURITY;
 
 -- Friends policies
 CREATE POLICY "Users can create friend requests"
   ON friends
   FOR INSERT
   TO authenticated
   USING (auth.uid() = requester_id);
 
 CREATE POLICY "Users can update friend requests they're involved in"
   ON friends
   FOR UPDATE
   TO authenticated
-  USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
+  USING (auth.uid() = requester_id OR auth.uid() = target_id);
 
 CREATE POLICY "Users can view their friend relationships"
   ON friends
   FOR SELECT
   TO authenticated
-  USING (auth.uid() = requester_id OR auth.uid() = addressee_id);
+  USING (auth.uid() = requester_id OR auth.uid() = target_id);
 
 -- Friends indexes
 CREATE INDEX IF NOT EXISTS idx_friends_requester ON friends(requester_id);
-CREATE INDEX IF NOT EXISTS idx_friends_addressee ON friends(addressee_id);
+CREATE INDEX IF NOT EXISTS idx_friends_target ON friends(target_id);
 CREATE INDEX IF NOT EXISTS idx_friends_status ON friends(status);
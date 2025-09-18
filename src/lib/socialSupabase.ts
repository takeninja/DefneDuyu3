import { supabase } from './supabase';

// Social media specific types
export interface SocialPost {
  id: string;
  content: string;
  image_url?: string;
  author_email: string;
  author_name: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
}

export interface SocialComment {
  id: string;
  post_id: string;
  content: string;
  author_email: string;
  author_name: string;
  created_at: string;
}

export interface SocialLike {
  id: string;
  post_id: string;
  user_email: string;
  created_at: string;
}

// New types for additional features
export interface Profile {
  id: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

export interface Friend {
  id: string;
  requester_id: string;
  addressee_id: string;
  status: 'pending' | 'accepted' | 'declined' | 'blocked';
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

export interface SavedPost {
  id: string;
  user_id: string;
  post_id: string;
  created_at: string;
  social_posts?: SocialPost;
}

export interface Event {
  id: string;
  creator_id: string;
  title: string;
  description?: string;
  event_date: string;
  location?: string;
  image_url?: string;
  max_attendees?: number;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRSVP {
  id: string;
  event_id: string;
  user_id: string;
  status: 'going' | 'maybe' | 'not_going';
  created_at: string;
  updated_at: string;
}

// Helper function to check if Supabase is available
const checkSupabaseConnection = () => {
  if (!supabase) {
    console.warn('Supabase is not properly configured. Please check your environment variables.');
    return false;
  }
  return true;
};

// Social Posts functions
export const getSocialPosts = async (): Promise<SocialPost[]> => {
  if (!checkSupabaseConnection()) {
    console.warn('Supabase not configured, returning empty posts array');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('social_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        console.warn('Social posts table not found. Please ensure Supabase is properly configured.');
        return [];
      }
      console.error('Error fetching social posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch social posts from database:', error);
    return [];
  }
};

export const createSocialPost = async (post: Omit<SocialPost, 'id' | 'created_at' | 'likes_count' | 'comments_count' | 'shares_count'>): Promise<boolean> => {
  if (!checkSupabaseConnection()) {
    console.warn('Supabase not configured, cannot create social post');
    return false;
  }

  try {
    const { error } = await supabase!
      .from('social_posts')
      .insert([{
        ...post,
        likes_count: 0,
        comments_count: 0,
        shares_count: 0
      }]);

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        console.warn('Social posts table not found. Please ensure Supabase is properly configured.');
        return false;
      }
      console.error('Error creating social post:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to create social post:', error);
    return false;
  }
};

// Social Comments functions
export const getPostComments = async (postId: string): Promise<SocialComment[]> => {
  if (!checkSupabaseConnection()) {
    console.warn('Supabase not configured, returning empty comments array');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('social_comments')
      .select('*')
      .eq('post_id', postId)
      .order('created_at', { ascending: true });

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        console.warn('Social comments table not found. Please ensure Supabase is properly configured.');
        return [];
      }
      console.error('Error fetching comments:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch comments from database:', error);
    return [];
  }
};

export const createComment = async (comment: Omit<SocialComment, 'id' | 'created_at'>): Promise<boolean> => {
  if (!checkSupabaseConnection()) {
    console.warn('Supabase not configured, cannot create comment');
    return false;
  }

  try {
    const { error } = await supabase!
      .from('social_comments')
      .insert([comment]);

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        console.warn('Social comments table not found. Please ensure Supabase is properly configured.');
        return false;
      }
      console.error('Error creating comment:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to create comment:', error);
    return false;
  }
};

// Social Likes functions
export const toggleLike = async (postId: string, userEmail: string): Promise<boolean> => {
  if (!checkSupabaseConnection()) {
    console.warn('Supabase not configured, cannot toggle like');
    return false;
  }

  try {
    // Check if like already exists
    const { data: existingLike, error: checkError } = await supabase!
      .from('social_likes')
      .select('id')
      .eq('post_id', postId)
      .eq('user_email', userEmail)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      console.error('Error checking existing like:', checkError);
      return false;
    }

    if (existingLike) {
      // Remove like
      const { error: deleteError } = await supabase!
        .from('social_likes')
        .delete()
        .eq('id', existingLike.id);

      if (deleteError) {
        console.error('Error removing like:', deleteError);
        return false;
      }
    } else {
      // Add like
      const { error: insertError } = await supabase!
        .from('social_likes')
        .insert([{ post_id: postId, user_email: userEmail }]);

      if (insertError) {
        console.error('Error adding like:', insertError);
        return false;
      }
    }

    return true;
  } catch (error) {
    console.warn('Failed to toggle like:', error);
    return false;
  }
};

// Profile functions
export const getProfile = async (userId: string): Promise<Profile | null> => {
  if (!checkSupabaseConnection()) return null;

  try {
    const { data, error } = await supabase!
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Failed to fetch profile:', error);
    return null;
  }
};

export const updateProfile = async (userId: string, updates: Partial<Profile>): Promise<boolean> => {
  if (!checkSupabaseConnection()) return false;

  try {
    const { error } = await supabase!
      .from('profiles')
      .upsert({ id: userId, ...updates, updated_at: new Date().toISOString() });

    if (error) {
      console.error('Error updating profile:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to update profile:', error);
    return false;
  }
};

// Friends functions
export const getAllUsers = async (): Promise<Profile[]> => {
  if (!checkSupabaseConnection()) return [];

  try {
    const { data, error } = await supabase!
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch users:', error);
    return [];
  }
};

export const sendFriendRequest = async (addresseeId: string): Promise<boolean> => {
  if (!checkSupabaseConnection()) return false;

  try {
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) return false;

    const { error } = await supabase!
      .from('friends')
      .insert([{
        requester_id: user.id,
        addressee_id: addresseeId,
        status: 'pending'
      }]);

    if (error) {
      console.error('Error sending friend request:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to send friend request:', error);
    return false;
  }
};

export const getFriendRequests = async (): Promise<Friend[]> => {
  if (!checkSupabaseConnection()) return [];

  try {
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase!
      .from('friends')
      .select('*')
      .eq('addressee_id', user.id)
      .eq('status', 'pending')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching friend requests:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch friend requests:', error);
    return [];
  }
};

export const respondToFriendRequest = async (friendId: string, status: 'accepted' | 'declined'): Promise<boolean> => {
  if (!checkSupabaseConnection()) return false;

  try {
    const { error } = await supabase!
      .from('friends')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', friendId);

    if (error) {
      console.error('Error responding to friend request:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to respond to friend request:', error);
    return false;
  }
};

export const getFriends = async (): Promise<Profile[]> => {
  if (!checkSupabaseConnection()) return [];

  try {
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase!
      .from('friends')
      .select(`
        *,
        requester:profiles!friends_requester_id_fkey(*),
        addressee:profiles!friends_addressee_id_fkey(*)
      `)
      .or(`requester_id.eq.${user.id},addressee_id.eq.${user.id}`)
      .eq('status', 'accepted');

    if (error) {
      console.error('Error fetching friends:', error);
      return [];
    }

    // Extract friend profiles
    const friends = data?.map((friendship: any) => {
      return friendship.requester_id === user.id 
        ? friendship.addressee 
        : friendship.requester;
    }) || [];

    return friends;
  } catch (error) {
    console.warn('Failed to fetch friends:', error);
    return [];
  }
};

// Messages functions
export const sendMessage = async (receiverId: string, content: string): Promise<boolean> => {
  if (!checkSupabaseConnection()) return false;

  try {
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) return false;

    const { error } = await supabase!
      .from('messages')
      .insert([{
        sender_id: user.id,
        receiver_id: receiverId,
        content
      }]);

    if (error) {
      console.error('Error sending message:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to send message:', error);
    return false;
  }
};

export const getMessages = async (friendId: string): Promise<Message[]> => {
  if (!checkSupabaseConnection()) return [];

  try {
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase!
      .from('messages')
      .select('*')
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${friendId}),and(sender_id.eq.${friendId},receiver_id.eq.${user.id})`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching messages:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch messages:', error);
    return [];
  }
};

// Saved posts functions
export const savePost = async (postId: string): Promise<boolean> => {
  if (!checkSupabaseConnection()) return false;

  try {
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) return false;

    const { error } = await supabase!
      .from('saved_posts')
      .insert([{
        user_id: user.id,
        post_id: postId
      }]);

    if (error) {
      console.error('Error saving post:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to save post:', error);
    return false;
  }
};

export const unsavePost = async (postId: string): Promise<boolean> => {
  if (!checkSupabaseConnection()) return false;

  try {
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) return false;

    const { error } = await supabase!
      .from('saved_posts')
      .delete()
      .eq('user_id', user.id)
      .eq('post_id', postId);

    if (error) {
      console.error('Error unsaving post:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to unsave post:', error);
    return false;
  }
};

export const getSavedPosts = async (): Promise<SavedPost[]> => {
  if (!checkSupabaseConnection()) return [];

  try {
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) return [];

    const { data, error } = await supabase!
      .from('saved_posts')
      .select(`
        *,
        social_posts(*)
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching saved posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch saved posts:', error);
    return [];
  }
};

// Events functions
export const createEvent = async (event: Omit<Event, 'id' | 'created_at' | 'updated_at'>): Promise<boolean> => {
  if (!checkSupabaseConnection()) return false;

  try {
    const { error } = await supabase!
      .from('events')
      .insert([event]);

    if (error) {
      console.error('Error creating event:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to create event:', error);
    return false;
  }
};

export const getEvents = async (): Promise<Event[]> => {
  if (!checkSupabaseConnection()) return [];

  try {
    const { data, error } = await supabase!
      .from('events')
      .select('*')
      .eq('is_public', true)
      .order('event_date', { ascending: true });

    if (error) {
      console.error('Error fetching events:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch events:', error);
    return [];
  }
};

export const rsvpToEvent = async (eventId: string, status: 'going' | 'maybe' | 'not_going'): Promise<boolean> => {
  if (!checkSupabaseConnection()) return false;

  try {
    const { data: { user } } = await supabase!.auth.getUser();
    if (!user) return false;

    const { error } = await supabase!
      .from('event_rsvps')
      .upsert({
        event_id: eventId,
        user_id: user.id,
        status,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error('Error RSVPing to event:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to RSVP to event:', error);
    return false;
  }
};
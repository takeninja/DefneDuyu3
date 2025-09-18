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
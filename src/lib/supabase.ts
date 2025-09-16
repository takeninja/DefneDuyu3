import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if environment variables are properly configured
const isSupabaseConfigured = () => {
  return supabaseUrl && 
         supabaseAnonKey && 
         supabaseUrl !== 'https://your-project-id.supabase.co' &&
         supabaseAnonKey !== 'your-anon-key-here' &&
         supabaseUrl.includes('supabase.co');
};

// Only create client if properly configured, otherwise use null
export const supabase = isSupabaseConfigured() 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helper function to check if Supabase is available
const checkSupabaseConnection = () => {
  if (!supabase) {
    console.warn('Supabase is not properly configured. Please check your environment variables.');
    return false;
  }
  return true;
}

// Database types
export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  created_at: string;
}

export interface Appointment {
  id: string;
  client_name: string;
  child_name: string;
  email: string;
  service: string;
  requested_date: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  created_at: string;
}

// Blog post functions
export const getPosts = async (): Promise<Post[]> => {
  if (!checkSupabaseConnection()) {
    console.warn('Supabase not configured, returning empty posts array');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      // If table doesn't exist, return empty array silently
      if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        console.warn('Posts table not found. Please ensure Supabase is properly configured.');
        return [];
      }
      console.error('Error fetching posts:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch posts from database:', error);
    return [];
  }
};

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  if (!checkSupabaseConnection()) {
    console.warn('Supabase not configured, returning null for post');
    return null;
  }

  try {
    const { data, error } = await supabase!
      .from('posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        console.warn('Posts table not found. Please ensure Supabase is properly configured.');
        return null;
      }
      console.error('Error fetching post:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.warn('Failed to fetch post from database:', error);
    return null;
  }
};

// Appointment functions
export const createAppointment = async (appointment: Omit<Appointment, 'id' | 'created_at'>): Promise<boolean> => {
  if (!checkSupabaseConnection()) {
    console.warn('Supabase not configured, cannot create appointment');
    return false;
  }

  try {
    const { error } = await supabase!
      .from('appointments')
      .insert([appointment]);

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        console.warn('Appointments table not found. Please ensure Supabase is properly configured.');
        return false;
      }
      console.error('Error creating appointment:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.warn('Failed to create appointment:', error);
    return false;
  }
};

export const getAppointments = async (): Promise<Appointment[]> => {
  if (!checkSupabaseConnection()) {
    console.warn('Supabase not configured, returning empty appointments array');
    return [];
  }

  try {
    const { data, error } = await supabase!
      .from('appointments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      if (error.code === 'PGRST116' || error.message.includes('does not exist') || error.message.includes('schema cache')) {
        console.warn('Appointments table not found. Please ensure Supabase is properly configured.');
        return [];
      }
      console.error('Error fetching appointments:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.warn('Failed to fetch appointments:', error);
    return [];
  }
};
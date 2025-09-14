import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  try {
    const { data, error } = await supabase
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
  try {
    const { data, error } = await supabase
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
  try {
    const { error } = await supabase
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
  try {
    const { data, error } = await supabase
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
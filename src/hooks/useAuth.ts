import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if supabase is properly configured
    if (!supabase) {
      console.warn('Supabase is not configured. Authentication features will be disabled.');
      setUser(null);
      setLoading(false);
      return;
    }

    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (!supabase) {
      console.warn('Supabase is not configured. Cannot sign out.');
      return;
    }
    await supabase.auth.signOut();
  };

  return {
    user,
    loading,
    signOut,
    isAuthenticated: !!user
  };
};
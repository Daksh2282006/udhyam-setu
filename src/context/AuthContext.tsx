import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, SupabaseUser, SupabaseSession } from '../services/supabaseClient';

interface AuthContextType {
  user: SupabaseUser | null;
  session: SupabaseSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  openAuthModal: (mode?: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, password: string, metadata?: Record<string, any>) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  loginDemo: (name?: string, email?: string) => void;
  signInWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<SupabaseSession | null>(supabase.getSession());
  const [user, setUser] = useState<SupabaseUser | null>(supabase.getUser());
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'signup'>('login');

  const openAuthModal = (mode: 'login' | 'signup' = 'login') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  useEffect(() => {
    // Listen for auth state changes
    const unsubscribe = supabase.onAuthStateChange((newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      setIsLoading(false);
      if (newSession?.user) {
        setIsAuthModalOpen(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const res = await supabase.signInWithPassword(email, password);
    setIsLoading(false);
    if (res.error) {
      return { success: false, error: res.error.message };
    }
    return { success: true };
  };

  const signup = async (email: string, password: string, metadata: Record<string, any> = {}) => {
    setIsLoading(true);
    const res = await supabase.signUp(email, password, metadata);
    setIsLoading(false);
    if (res.error) {
      return { success: false, error: res.error.message };
    }
    return { success: true };
  };

  const logout = async () => {
    setIsLoading(true);
    await supabase.signOut();
    setIsLoading(false);
  };

  const loginDemo = (name?: string, email?: string) => {
    supabase.loginDemoUser(name, email);
    setIsAuthModalOpen(false);
  };

  const signInWithGoogle = async () => {
    await supabase.signInWithOAuth('google');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAuthenticated: Boolean(user),
        isLoading,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        login,
        signup,
        logout,
        loginDemo,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

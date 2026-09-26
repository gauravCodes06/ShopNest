import React, { createContext, useContext, useState, useEffect } from 'react';

export interface UserProfile {
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  signIn: (email: string, name?: string) => void;
  signUp: (name: string, email: string, phone?: string) => void;
  signOut: () => void;
  isAuthModalOpen: boolean;
  authModalMode: 'signin' | 'signup';
  openAuthModal: (mode?: 'signin' | 'signup') => void;
  closeAuthModal: () => void;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  isAuthenticated: false,
  signIn: () => {},
  signUp: () => {},
  signOut: () => {},
  isAuthModalOpen: false,
  authModalMode: 'signin',
  openAuthModal: () => {},
  closeAuthModal: () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const USER_STORAGE_KEY = 'shopnest_auth_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(USER_STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'signin' | 'signup'>('signin');

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [user]);

  const signIn = (email: string, name?: string) => {
    const displayName = name || (email.split('@')[0] || 'User');
    const newUser: UserProfile = {
      email,
      name: displayName.charAt(0).toUpperCase() + displayName.slice(1),
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const signUp = (name: string, email: string, phone?: string) => {
    const newUser: UserProfile = {
      name,
      email,
      phone,
    };
    setUser(newUser);
    setIsAuthModalOpen(false);
  };

  const signOut = () => {
    setUser(null);
  };

  const openAuthModal = (mode: 'signin' | 'signup' = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        signIn,
        signUp,
        signOut,
        isAuthModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  return ctx || defaultAuthContext;
}


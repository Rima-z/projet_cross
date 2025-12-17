import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../api/config';

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEYS = {
  token: 'auth.mysql.token',
  currentUser: 'auth.mysql.currentUser',
} as const;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEYS.currentUser);
        if (raw) setUser(JSON.parse(raw) as User);
      } catch {
        // ignore
      }
    })();
  }, []);

  const persistCurrentUser = async (nextUser: User | null) => {
    setUser(nextUser);
    try {
      if (nextUser) await AsyncStorage.setItem(STORAGE_KEYS.currentUser, JSON.stringify(nextUser));
      else await AsyncStorage.removeItem(STORAGE_KEYS.currentUser);
    } catch {
      // ignore
    }
  };

  const persistToken = async (token: string | null) => {
    try {
      if (token) await AsyncStorage.setItem(STORAGE_KEYS.token, token);
      else await AsyncStorage.removeItem(STORAGE_KEYS.token);
    } catch {
      // ignore
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // IMPORTANT: reset session avant tentative
      await persistCurrentUser(null);
      await persistToken(null);

      const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));

      // Backend renvoie 401 si compte inexistant => impossible de login sans signup
      if (!res.ok) throw new Error(data?.message || 'Login failed');

      await persistToken(data.token);
      await persistCurrentUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await persistCurrentUser(null);
      await persistToken(null);

      const res = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Signup failed');

      await persistToken(data.token);
      await persistCurrentUser(data.user);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    void persistCurrentUser(null);
    void persistToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
};

import React, { createContext, useContext, useState, ReactNode } from 'react';

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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  // Stocker les utilisateurs inscrits (email -> User)
  const [registeredUsers, setRegisteredUsers] = useState<Map<string, User>>(new Map());

  const fakeDelay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      await fakeDelay(800);
      
      // Vérifier si l'utilisateur est déjà inscrit
      const registeredUser = registeredUsers.get(email.toLowerCase());
      
      if (registeredUser) {
        // Utilisateur trouvé, utiliser son nom
        setUser(registeredUser);
      } else {
        // Nouvel utilisateur, extraire le nom depuis l'email
        const emailName = email.split('@')[0];
        const capitalizedName = emailName.charAt(0).toUpperCase() + emailName.slice(1);
        
        const newUser: User = {
          id: Date.now().toString(),
          name: capitalizedName,
          email: email.toLowerCase(),
        };
        
        // Sauvegarder pour les prochaines connexions
        setRegisteredUsers(prev => {
          const newMap = new Map(prev);
          newMap.set(email.toLowerCase(), newUser);
          return newMap;
        });
        
        setUser(newUser);
      }
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await fakeDelay(800);
      
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email: email.toLowerCase(),
      };
      
      // Sauvegarder l'utilisateur inscrit
      setRegisteredUsers(prev => {
        const newMap = new Map(prev);
        newMap.set(email.toLowerCase(), newUser);
        return newMap;
      });
      
      setUser(newUser);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};



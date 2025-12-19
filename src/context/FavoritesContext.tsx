import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coffee } from '../components/CoffeeCard';
import { useAuth } from './AuthContext';
import { API_BASE_URL } from '../api/config';
import { getProductById } from '../data/products';

type FavoritesContextValue = {
  favorites: Coffee[];
  addToFavorites: (product: Coffee) => Promise<void>;
  removeFromFavorites: (productId: string) => Promise<void>;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Coffee) => Promise<void>;
  loading: boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

const STORAGE_KEY_TOKEN = 'auth.mysql.token';

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Coffee[]>([]);
  const [loading, setLoading] = useState(false);

  const getAuthToken = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEY_TOKEN);
    } catch {
      return null;
    }
  };

  const loadFavorites = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    try {
      const token = await getAuthToken();
      if (!token) {
        setFavorites([]);
        return;
      }

      const res = await fetch(`${API_BASE_URL}/favorites`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        console.error('Failed to load favorites');
        return;
      }

      const data = await res.json();
      const productIds: string[] = data.favorites || [];

      // Convertir les IDs en objets Coffee complets
      const favoriteProducts: Coffee[] = productIds
        .map((id) => getProductById(id))
        .filter((product): product is Coffee => product !== undefined);

      setFavorites(favoriteProducts);
    } catch (error) {
      console.error('Error loading favorites:', error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Charger les favoris depuis l'API quand l'utilisateur est connecté
  useEffect(() => {
    if (user) {
      loadFavorites();
    } else {
      // Vider les favoris quand l'utilisateur se déconnecte
      setFavorites([]);
    }
  }, [user, loadFavorites]);

  const addToFavorites = async (product: Coffee) => {
    if (!user) {
      console.warn('Cannot add favorite: user not logged in');
      return;
    }

    // Mise à jour optimiste de l'UI
    setFavorites((prev) => {
      if (!prev.find((p) => p.id === product.id)) {
        return [...prev, product];
      }
      return prev;
    });

    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('No auth token');
      }

      const res = await fetch(`${API_BASE_URL}/favorites`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId: product.id }),
      });

      if (!res.ok) {
        // En cas d'erreur, annuler la mise à jour optimiste
        setFavorites((prev) => prev.filter((p) => p.id !== product.id));
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add favorite');
      }
    } catch (error) {
      console.error('Error adding favorite:', error);
      // Annuler la mise à jour optimiste en cas d'erreur
      setFavorites((prev) => prev.filter((p) => p.id !== product.id));
      throw error;
    }
  };

  const removeFromFavorites = async (productId: string) => {
    if (!user) {
      console.warn('Cannot remove favorite: user not logged in');
      return;
    }

    // Mise à jour optimiste de l'UI
    const previousFavorites = [...favorites];
    setFavorites((prev) => prev.filter((p) => p.id !== productId));

    try {
      const token = await getAuthToken();
      if (!token) {
        throw new Error('No auth token');
      }

      const res = await fetch(`${API_BASE_URL}/favorites/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        // En cas d'erreur, restaurer l'état précédent
        setFavorites(previousFavorites);
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to remove favorite');
      }
    } catch (error) {
      console.error('Error removing favorite:', error);
      // Restaurer l'état précédent en cas d'erreur
      setFavorites(previousFavorites);
      throw error;
    }
  };

  const isFavorite = (productId: string): boolean => {
    return favorites.some((p) => p.id === productId);
  };

  const toggleFavorite = async (product: Coffee) => {
    if (isFavorite(product.id)) {
      await removeFromFavorites(product.id);
    } else {
      await addToFavorites(product);
    }
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
        loading,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const ctx = useContext(FavoritesContext);
  if (!ctx) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return ctx;
};



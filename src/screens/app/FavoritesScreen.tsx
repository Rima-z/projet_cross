import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import CoffeeCard from '../../components/CoffeeCard';
import { useFavorites } from '../../context/FavoritesContext';
import { useNavigation } from '@react-navigation/native';
import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppTabsParamList } from '../../navigation/AppTabs';
import type { HomeStackParamList } from '../../navigation/HomeStack';

type FavoritesScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<AppTabsParamList, 'Favorites'>,
  NativeStackNavigationProp<HomeStackParamList>
>;

const FavoritesScreen: React.FC = () => {
  const { favorites } = useFavorites();
  const navigation = useNavigation<FavoritesScreenNavigationProp>();

  const handlePressProduct = (productId: string) => {
    // Naviguer vers Home puis vers ProductDetail
    const parent = navigation.getParent();
    if (parent) {
      parent.navigate('Home', { screen: 'ProductDetail', params: { id: productId } });
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Favorite</Text>
        {favorites.length > 0 ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 }}
          >
            {favorites.map(item => (
              <View key={item.id} style={{ marginBottom: 16 }}>
                <CoffeeCard 
                  item={item} 
                  onPress={() => handlePressProduct(item.id)}
                />
              </View>
            ))}
          </ScrollView>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Aucun produit favori</Text>
            <Text style={styles.emptySubtext}>
              Cliquez sur l'icône cœur pour ajouter des produits à vos favoris
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 16,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222222',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#777777',
    textAlign: 'center',
  },
});

export default FavoritesScreen;



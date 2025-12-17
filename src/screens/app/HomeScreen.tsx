import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import CoffeeCard, { Coffee } from '../../components/CoffeeCard';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import { useAuth } from '../../context/AuthContext';
import { getAllProducts, getProductsByCategory, getAllCategories, Category } from '../../data/products';

type Props = NativeStackScreenProps<HomeStackParamList, 'HomeMain'>;

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category>('coffee');
  const categories = getAllCategories();
  
  // Filtrer les produits selon la catégorie sélectionnée
  const filteredProducts = getProductsByCategory(selectedCategory);
  const allProducts = getAllProducts();

  const handlePressCoffee = (item: Coffee) => {
    navigation.navigate('ProductDetail', { id: item.id });
  };

  const handleCategoryPress = (category: Category) => {
    setSelectedCategory(category);
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.profileRow}>
            <View style={styles.avatar} />
            <View>
              <Text style={styles.greeting}>Good morning, {user?.name ?? 'Guest'}</Text>
             
            </View>
          </View>
          <TouchableOpacity style={styles.bell}>
            <Text>🔔</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.searchBox}>
          <TextInput placeholder="Search coffee..." style={styles.searchInput} />
          <Text style={styles.filterIcon}>☰</Text>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesRow}
        >
          {categories.map(category => (
            <CategoryChip
              key={category}
              label={category.charAt(0).toUpperCase() + category.slice(1)}
              active={selectedCategory === category}
              onPress={() => handleCategoryPress(category)}
            />
          ))}
        </ScrollView>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredProducts.length > 0 ? (
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12 }}
            >
              {filteredProducts.map(item => (
                <CoffeeCard key={item.id} item={item} onPress={() => handlePressCoffee(item)} />
              ))}
            </ScrollView>
          ) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                Aucun produit disponible dans cette catégorie pour le moment.
              </Text>
              <Text style={styles.emptySubtext}>
                Ajoutez des produits dans {selectedCategory} pour les voir ici.
              </Text>
            </View>
          )}

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Special Offer</Text>
            <Text style={styles.sectionSeeAll}>See all</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 16 }}
          >
            {allProducts.map(item => (
              <CoffeeCard key={item.id} item={item} onPress={() => handlePressCoffee(item)} />
            ))}
          </ScrollView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const CategoryChip = ({ 
  label, 
  active, 
  onPress 
}: { 
  label: string; 
  active?: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity 
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </TouchableOpacity>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: '#EEE',
  },
  greeting: {
    fontSize: 14,
    color: '#777777',
  },
  location: {
    fontSize: 12,
    color: '#444444',
    fontWeight: '600',
  },
  bell: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F3F5F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    marginTop: 18,
    marginHorizontal: 24,
    backgroundColor: '#F3F5F7',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
  filterIcon: {
    marginLeft: 12,
    fontSize: 18,
  },
  categoriesRow: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 16,
    paddingRight: 24,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#F3F5F7',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#0D6B3B',
  },
  chipText: {
    fontSize: 12,
    color: '#555555',
  },
  chipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
  },
  sectionSeeAll: {
    fontSize: 12,
    color: '#0D6B3B',
  },
  emptyContainer: {
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#777777',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
  },
});

export default HomeScreen;



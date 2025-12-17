import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useFavorites } from '../context/FavoritesContext';

export type Coffee = {
  id: string;
  name: string;
  price: number;
  image: any;
  rating: number;
  category: 'coffee' | 'crepe' | 'omelette' | 'boisson';
};

type Props = {
  item: Coffee;
  onPress?: () => void;
  showFavoriteIcon?: boolean;
  showAddIcon?: boolean;
};

const CoffeeCard: React.FC<Props> = ({ item, onPress, showFavoriteIcon = true, showAddIcon = true }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(item.id);

  const handleFavoritePress = (e: any) => {
    e.stopPropagation(); // Empêcher le déclenchement de onPress de la carte
    toggleFavorite(item);
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={onPress}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.subText}>With Sugar</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>{item.price.toLocaleString('id-ID')}DT</Text>
          <View style={styles.icons}>
            {showFavoriteIcon && (
              <TouchableOpacity onPress={handleFavoritePress} activeOpacity={0.7}>
                <Text style={[styles.icon, favorite && styles.iconFavorite]}>
                  {favorite ? '❤️' : '♡'}
                </Text>
              </TouchableOpacity>
            )}
            {showAddIcon && (
              <View style={styles.addBtn}>
                <Text style={styles.addText}>+</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    marginRight: 16,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#D4A574',
  },
  info: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },
  subText: {
    fontSize: 11,
    color: '#999999',
    marginTop: 2,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222222',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    fontSize: 18,
    marginRight: 8,
    color: '#D76B6B',
  },
  iconFavorite: {
    color: '#D76B6B',
  },
  addBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#0D6B3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addText: {
    color: '#FFFFFF',
    fontSize: 18,
    marginTop: -2,
  },
});

export default CoffeeCard;



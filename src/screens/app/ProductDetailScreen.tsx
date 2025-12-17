import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HomeStackParamList } from '../../navigation/HomeStack';
import PrimaryButton from '../../components/PrimaryButton';
import { getProductById } from '../../data/products';

type Props = NativeStackScreenProps<HomeStackParamList, 'ProductDetail'>;

const ProductDetailScreen: React.FC<Props> = ({ navigation, route }) => {
  const product = getProductById(route.params.id);
  
  if (!product) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text>Produit non trouvé</Text>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.circleIcon}>{'<'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.circleBtn}>
            <Text style={styles.circleIcon}>♡</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageWrapper}>
          <Image source={product.image} style={styles.image} resizeMode="contain" />
        </View>

        <View style={styles.detailCard}>
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.name}>{product.name}</Text>
              <Text style={styles.sub}>With Sugar</Text>
            </View>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {product.rating}</Text>
            </View>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.sectionLabel}>Cup Size</Text>
            <View style={styles.optionsRow}>
              <OptionPill label="Small" active />
              <OptionPill label="Medium" />
              <OptionPill label="Large" />
            </View>

            <Text style={styles.sectionLabel}>Level Sugar</Text>
            <View style={styles.optionsRow}>
              <OptionPill label="No Sugar" active />
              <OptionPill label="Low" />
              <OptionPill label="Medium" />
            </View>

            <Text style={styles.sectionLabel}>About</Text>
            <Text style={styles.aboutText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
              exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Text>
          </ScrollView>

          <View style={styles.bottomRow}>
            <View>
              <Text style={styles.priceLabel}>Price</Text>
              <Text style={styles.priceValue}>DT {product.price.toLocaleString('id-ID')}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 16 }}>
              <PrimaryButton title="Add to cart" onPress={() => {}} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const OptionPill = ({ label, active }: { label: string; active?: boolean }) => (
  <View style={[styles.pill, active && styles.pillActive]}>
    <Text style={[styles.pillText, active && styles.pillTextActive]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  circleIcon: {
    fontSize: 16,
  },
  imageWrapper: {
    alignItems: 'center',
    marginTop: 8,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  detailCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: 16,
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#222222',
  },
  sub: {
    fontSize: 13,
    color: '#777777',
    marginTop: 4,
  },
  ratingBadge: {
    backgroundColor: '#F8E5B2',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  ratingText: {
    fontSize: 13,
    color: '#7A4F0D',
    fontWeight: '600',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
    marginTop: 16,
    marginBottom: 8,
  },
  optionsRow: {
    flexDirection: 'row',
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#F3F5F7',
    marginRight: 8,
  },
  pillActive: {
    backgroundColor: '#0D6B3B',
  },
  pillText: {
    fontSize: 13,
    color: '#555555',
  },
  pillTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  aboutText: {
    fontSize: 13,
    color: '#777777',
    marginTop: 4,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 12,
    color: '#777777',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222222',
  },
});

export default ProductDetailScreen;



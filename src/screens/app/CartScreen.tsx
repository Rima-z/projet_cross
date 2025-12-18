import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/PrimaryButton';
import { useCart } from '../../context/CartContext';
import { API_BASE_URL } from '../../api/config';

const TOKEN_KEY = 'auth.mysql.token';

const CartScreen: React.FC = () => {
  const { items, subtotal, setQuantity, removeFromCart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  const total = useMemo(() => subtotal, [subtotal]);

  const handleBuy = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (!token) {
        Alert.alert('Login required', 'Veuillez vous connecter avant de valider le panier.');
        return;
      }

      const payload = {
        items: items.map(it => ({
          productId: it.product.id,
          name: it.product.name,
          unitPrice: it.product.price,
          quantity: it.quantity,
        })),
      };

      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.message || 'Order failed');

      clearCart();
      Alert.alert('Commande validée', `Order #${data.orderId} enregistrée.`);
    } catch (e) {
      Alert.alert('Erreur', e instanceof Error ? e.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>

        {items.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>Panier vide</Text>
            <Text style={styles.emptyText}>Ajoute des produits avec “Add to cart”.</Text>
          </View>
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12, paddingBottom: 16 }}
          >
            {items.map(it => (
              <View key={it.product.id} style={styles.itemCard}>
                <Image source={it.product.image} style={styles.itemImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.itemName}>{it.product.name}</Text>
                  <Text style={styles.itemPrice}>{it.product.price.toLocaleString('fr-FR')} DT</Text>
                </View>

                <View style={styles.qtyCol}>
                  <TouchableOpacity onPress={() => removeFromCart(it.product.id)}>
                    <Text style={styles.remove}>🗑</Text>
                  </TouchableOpacity>
                  <View style={styles.qtyRow}>
                    <TouchableOpacity onPress={() => setQuantity(it.product.id, it.quantity - 1)}>
                      <Text style={styles.qtyButton}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.qtyValue}>{it.quantity}</Text>
                    <TouchableOpacity onPress={() => setQuantity(it.product.id, it.quantity + 1)}>
                      <Text style={styles.qtyButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}

            <View style={styles.summary}>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>{subtotal.toLocaleString('fr-FR')} DT</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryTotalLabel}>Total</Text>
                <Text style={styles.summaryTotalValue}>{total.toLocaleString('fr-FR')} DT</Text>
              </View>
            </View>

            <View style={{ marginTop: 18 }}>
              <PrimaryButton title={loading ? '...' : 'Buy'} onPress={handleBuy} />
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1 },
  title: { fontSize: 20, fontWeight: '700', marginTop: 16, paddingHorizontal: 24 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  emptyTitle: { fontSize: 18, fontWeight: '700', color: '#222' },
  emptyText: { marginTop: 8, fontSize: 13, color: '#777', textAlign: 'center' },
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
    alignItems: 'center',
  },
  itemImage: { width: 70, height: 70, borderRadius: 12, backgroundColor: '#EEE', marginRight: 12 },
  itemName: { fontSize: 14, fontWeight: '600', color: '#222222' },
  itemPrice: { fontSize: 14, fontWeight: '700', color: '#222222', marginTop: 4 },
  qtyCol: { alignItems: 'center', justifyContent: 'space-between', height: 70 },
  remove: { fontSize: 16, color: '#C44B4B' },
  qtyRow: { flexDirection: 'row', alignItems: 'center' },
  qtyButton: { fontSize: 18, paddingHorizontal: 6 },
  qtyValue: { fontSize: 14, marginHorizontal: 6 },
  summary: { marginTop: 12, padding: 12, borderRadius: 16, backgroundColor: '#F7F8FA' },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  summaryLabel: { fontSize: 13, color: '#777777' },
  summaryValue: { fontSize: 13, color: '#222222' },
  summaryTotalLabel: { fontSize: 14, fontWeight: '600', color: '#222222' },
  summaryTotalValue: { fontSize: 16, fontWeight: '700', color: '#222222' },
});

export default CartScreen;



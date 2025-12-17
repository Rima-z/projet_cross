import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';

const CartScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Cart</Text>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 24, paddingTop: 12 }}
        >
          <CartItem />
          <CartItem />

          <View style={styles.summary}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Subtotal</Text>
              <Text style={styles.summaryValue}>Rp 100.000</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Discount</Text>
              <Text style={styles.summaryValue}>Rp 25.000</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryTotalLabel}>Total</Text>
              <Text style={styles.summaryTotalValue}>Rp 75.000</Text>
            </View>
          </View>

          <Text style={styles.paymentLabel}>Payment</Text>
          <View style={styles.paymentRow}>
            <View style={styles.paymentBadge}>
              <Text style={styles.paymentText}>VISA</Text>
            </View>
            <View style={styles.paymentBadge}>
              <Text style={styles.paymentText}>Master</Text>
            </View>
            <View style={styles.paymentBadge}>
              <Text style={styles.paymentText}>PayPal</Text>
            </View>
          </View>

          <View style={{ marginTop: 18, marginBottom: 12 }}>
            <PrimaryButton title="Buy" onPress={() => {}} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const CartItem = () => {
  return (
    <View style={styles.itemCard}>
      <View style={styles.itemImagePlaceholder} />
      <View style={{ flex: 1 }}>
        <Text style={styles.itemName}>Coffee</Text>
        <Text style={styles.itemSub}>With Sugar</Text>
        <Text style={styles.itemPrice}>Rp 50.000</Text>
        <Text style={styles.itemMeta}>Cap Size: Small</Text>
        <Text style={styles.itemMeta}>Level Sugar: No Sugar</Text>
      </View>
      <View style={styles.qtyCol}>
        <Text style={styles.heart}>♡</Text>
        <View style={styles.qtyRow}>
          <Text style={styles.qtyButton}>-</Text>
          <Text style={styles.qtyValue}>2</Text>
          <Text style={styles.qtyButton}>+</Text>
        </View>
      </View>
    </View>
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
  itemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  itemImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: '#EEE',
    marginRight: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },
  itemSub: {
    fontSize: 11,
    color: '#777777',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#222222',
    marginTop: 2,
  },
  itemMeta: {
    fontSize: 11,
    color: '#999999',
  },
  qtyCol: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heart: {
    fontSize: 18,
    color: '#D76B6B',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  qtyButton: {
    fontSize: 16,
    paddingHorizontal: 4,
  },
  qtyValue: {
    fontSize: 14,
    marginHorizontal: 4,
  },
  summary: {
    marginTop: 12,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#F7F8FA',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 13,
    color: '#777777',
  },
  summaryValue: {
    fontSize: 13,
    color: '#222222',
  },
  summaryTotalLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },
  summaryTotalValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222222',
  },
  paymentLabel: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#222222',
  },
  paymentRow: {
    flexDirection: 'row',
    marginTop: 8,
  },
  paymentBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    marginRight: 8,
    elevation: 1,
  },
  paymentText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default CartScreen;



import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import FavoritesScreen from '../screens/app/FavoritesScreen';
import CartScreen from '../screens/app/CartScreen';
import ProfileScreen from '../screens/app/ProfileScreen';

export type AppTabsParamList = {
  Home: undefined;
  Favorites: undefined;
  Cart: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabsParamList>();

// Icône Home - remplie quand actif, outline quand inactif
const HomeIconSVG = ({ color, focused }: { color: string; focused: boolean }) => {
  if (focused) {
    // Home remplie (filled)
    return (
      <View style={styles.iconContainer}>
        <View style={styles.homeContainer}>
          <View style={[styles.homeRoofFilled, { backgroundColor: color }]} />
          <View style={[styles.homeBaseFilled, { backgroundColor: color }]}>
            <View style={styles.homeDoor} />
          </View>
        </View>
      </View>
    );
  }
  // Home outline
  return (
    <View style={styles.iconContainer}>
      <View style={styles.homeContainer}>
        <View style={[styles.homeRoofOutline, { borderColor: color }]} />
        <View style={[styles.homeBaseOutline, { borderColor: color }]}>
          <View style={[styles.homeDoorOutline, { borderColor: color }]} />
        </View>
      </View>
    </View>
  );
};

// Icône Heart - toujours outline (utilise un caractère Unicode simple)
const HeartIconSVG = ({ color }: { color: string; focused: boolean }) => (
  <View style={styles.iconContainer}>
    <Text style={[styles.heartText, { color }]}>♡</Text>
  </View>
);

// Icône Cart - toujours outline
const CartIconSVG = ({ color }: { color: string; focused: boolean }) => (
  <View style={styles.iconContainer}>
    <View style={styles.cartContainer}>
      <View style={[styles.cartBasket, { borderColor: color }]} />
      <View style={[styles.cartHandle, { borderColor: color }]} />
      <View style={[styles.cartWheel, { borderColor: color }]} />
      <View style={[styles.cartWheel, styles.cartWheelRight, { borderColor: color }]} />
    </View>
  </View>
);

// Icône Person - toujours outline
const PersonIconSVG = ({ color }: { color: string; focused: boolean }) => (
  <View style={styles.iconContainer}>
    <View style={styles.personContainer}>
      <View style={[styles.personHead, { borderColor: color }]} />
      <View style={[styles.personBody, { borderColor: color }]} />
    </View>
  </View>
);

const AppTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#0D6B3B',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          height: 64,
          paddingBottom: 10,
          paddingTop: 8,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        },
        tabBarIcon: ({ color, focused }) => {
          if (route.name === 'Home') {
            return <HomeIconSVG color={color} focused={focused} />;
          } else if (route.name === 'Favorites') {
            return <HeartIconSVG color={color} focused={focused} />;
          } else if (route.name === 'Cart') {
            return <CartIconSVG color={color} focused={focused} />;
          } else if (route.name === 'Profile') {
            return <PersonIconSVG color={color} focused={focused} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
  },
  // Home icon styles
  homeContainer: {
    width: 24,
    height: 22,
    alignItems: 'center',
  },
  homeRoofFilled: {
    width: 0,
    height: 0,
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderBottomWidth: 8,
    borderBottomColor: '#0D6B3B',
    marginBottom: -1,
  },
  homeBaseFilled: {
    width: 16,
    height: 12,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 1,
  },
  homeDoor: {
    width: 4,
    height: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
  },
  homeRoofOutline: {
    width: 0,
    height: 0,
    borderLeftWidth: 9,
    borderLeftColor: 'transparent',
    borderRightWidth: 9,
    borderRightColor: 'transparent',
    borderBottomWidth: 7,
    borderBottomColor: '#9E9E9E',
    marginBottom: -1,
  },
  homeBaseOutline: {
    width: 14,
    height: 10,
    borderWidth: 2,
    borderRadius: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 1,
    backgroundColor: 'transparent',
  },
  homeDoorOutline: {
    width: 3,
    height: 4,
    borderWidth: 1,
    borderRadius: 1,
    backgroundColor: 'transparent',
  },
  // Heart icon styles
  heartText: {
    fontSize: 22,
    lineHeight: 22,
  },
  // Cart icon styles
  cartContainer: {
    width: 22,
    height: 18,
    position: 'relative',
  },
  cartBasket: {
    width: 16,
    height: 10,
    borderWidth: 2,
    borderTopWidth: 0,
    borderRadius: 2,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    position: 'absolute',
    top: 4,
    left: 0,
  },
  cartHandle: {
    width: 6,
    height: 2,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 2,
    position: 'absolute',
    top: 2,
    right: 0,
  },
  cartWheel: {
    width: 4,
    height: 4,
    borderRadius: 2,
    borderWidth: 1.5,
    position: 'absolute',
    bottom: -1,
    left: 2,
  },
  cartWheelRight: {
    left: 'auto',
    right: 2,
  },
  // Person icon styles
  personContainer: {
    width: 18,
    height: 20,
    alignItems: 'center',
  },
  personHead: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    marginBottom: 2,
  },
  personBody: {
    width: 14,
    height: 10,
    borderWidth: 2,
    borderTopWidth: 0,
    borderRadius: 7,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
});

export default AppTabs;



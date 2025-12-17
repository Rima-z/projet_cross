import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/app/HomeScreen';
import ProductDetailScreen from '../screens/app/ProductDetailScreen';

export type HomeStackParamList = {
  HomeMain: undefined;
  ProductDetail: {
    id: string;
  };
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;



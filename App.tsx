import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootNavigator from './src/navigation/RootNavigator';
import { AuthProvider } from './src/context/AuthContext';
import { FavoritesProvider } from './src/context/FavoritesContext';

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <FavoritesProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </FavoritesProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default App;



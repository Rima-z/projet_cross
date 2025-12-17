import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PrimaryButton from '../../components/PrimaryButton';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthStack';

type Props = NativeStackScreenProps<AuthStackParamList, 'GetStarted'>;

const GetStartedScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../../assets/coffee-shop-logo.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.overlay} />
      <View style={styles.content}>
        <Text style={styles.title}>Coffee so good, your taste buds will love it</Text>
        <Text style={styles.subtitle}>
          The best grain, the finest roast, the most powerful flavor.
        </Text>
        <PrimaryButton
          title="Get started"
          onPress={() => navigation.navigate('Login')}
          style={styles.button}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C98A4B',
    justifyContent: 'flex-end',
  },
  imageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  content: {
    paddingHorizontal: 32,
    paddingBottom: 48,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    color: '#F7E2C9',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    marginTop: 8,
  },
  image: {
    width: '100%',
    height: 260,
    maxWidth: 300,
  },

});

export default GetStartedScreen;



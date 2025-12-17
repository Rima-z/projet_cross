import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle } from 'react-native';

type Props = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: ViewStyle;
};

const PrimaryButton: React.FC<Props> = ({ title, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.label}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#0D6B3B',
    paddingVertical: 14,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PrimaryButton;



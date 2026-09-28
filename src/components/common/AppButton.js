import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default function AppButton({ title, onPress, variant = 'primary', style }) {
  let buttonStyle = styles.primary;
  let textStyle = styles.textLight;

  if (variant === 'secondary') {
    buttonStyle = styles.secondary;
    textStyle = styles.textDark;
  }
  if (variant === 'outline') {
    buttonStyle = styles.outline;
    textStyle = styles.textPrimary;
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.base, buttonStyle, style]}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: { paddingVertical: 14, borderRadius: 14, alignItems: 'center', marginVertical: 6 },
  primary: { backgroundColor: COLORS.primary },
  secondary: { backgroundColor: COLORS.accent },
  outline: { borderWidth: 2, borderColor: COLORS.primary, backgroundColor: 'transparent' },
  text: { fontSize: 16, fontWeight: '700' },
  textLight: { color: COLORS.white },
  textDark: { color: COLORS.text },
  textPrimary: { color: COLORS.primary },
});

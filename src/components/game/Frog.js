import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

export default function Frog({ x, row, tileSize, hopCount }) {
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(function () {
    if (hopCount === 0) return;
    scale.setValue(1.35);
    Animated.spring(scale, { toValue: 1, friction: 4, tension: 120, useNativeDriver: true }).start();
  }, [hopCount]);

  return (
    <Animated.View
      style={[
        styles.frog,
        { left: x, top: row * tileSize, width: tileSize, height: tileSize, transform: [{ scale: scale }] },
      ]}
    >
      <Text style={{ fontSize: tileSize * 0.72 }}>🐸</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  frog: { position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 10 },
});

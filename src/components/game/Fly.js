import React, { useEffect, useRef } from 'react';
import { Animated, Text, StyleSheet } from 'react-native';

export default function Fly({ x, row, tileSize }) {
  const appear = useRef(new Animated.Value(0)).current;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(function () {
    Animated.spring(appear, { toValue: 1, friction: 5, useNativeDriver: true }).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 350, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 350, useNativeDriver: true }),
      ])
    );
    loop.start();
    return function () {
      loop.stop();
    };
  }, []);

  const translateY = pulse.interpolate({ inputRange: [0, 1], outputRange: [0, -tileSize * 0.15] });

  return (
    <Animated.View
      style={[
        styles.fly,
        {
          left: x,
          top: row * tileSize,
          width: tileSize,
          height: tileSize,
          opacity: appear,
          transform: [{ scale: appear }, { translateY: translateY }],
        },
      ]}
    >
      <Text style={{ fontSize: tileSize * 0.5 }}>🪰</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  fly: { position: 'absolute', alignItems: 'center', justifyContent: 'center', zIndex: 5 },
});

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import VEHICLE_TYPES from '../../constants/vehicles';

export default function Vehicle({ item, tileSize }) {
  const type = VEHICLE_TYPES[item.kind];
  // Emoji kendaraan menghadap kiri, dibalik saat bergerak ke kanan
  const flip = item.direction === 1 ? -1 : 1;

  return (
    <View
      style={[
        styles.body,
        {
          left: item.x,
          top: item.row * tileSize + tileSize * 0.1,
          width: item.width,
          height: tileSize * 0.8,
          backgroundColor: type.color,
          borderRadius: tileSize * 0.2,
        },
      ]}
    >
      <Text style={{ fontSize: tileSize * 0.6, transform: [{ scaleX: flip }] }}>{type.emoji}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  body: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },
});

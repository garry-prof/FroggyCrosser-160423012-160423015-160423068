import React from 'react';
import { View, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

export default function Log({ item, tileSize }) {
  const grains = [];
  const count = Math.round(item.width / tileSize);
  for (let i = 0; i < count; i++) {
    grains.push(<View key={'grain-' + i} style={styles.grain} />);
  }

  return (
    <View
      style={[
        styles.log,
        {
          left: item.x,
          top: item.row * tileSize + tileSize * 0.12,
          width: item.width,
          height: tileSize * 0.76,
          borderRadius: tileSize * 0.35,
        },
      ]}
    >
      {grains}
    </View>
  );
}

const styles = StyleSheet.create({
  log: {
    position: 'absolute',
    backgroundColor: COLORS.log,
    borderWidth: 2,
    borderColor: COLORS.logDark,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  grain: { width: 2, height: '50%', backgroundColor: COLORS.logDark, borderRadius: 1 },
});

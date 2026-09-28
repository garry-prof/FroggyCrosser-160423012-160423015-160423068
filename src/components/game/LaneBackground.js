import React from 'react';
import { View, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';
import { ROWS, COLS, ROW_TYPES } from '../../constants/gameConfig';

function getRowColor(type) {
  if (type === 'goal') return COLORS.goal;
  if (type === 'river') return COLORS.river;
  if (type === 'safe') return COLORS.safe;
  if (type === 'road') return COLORS.road;
  return COLORS.start;
}

function renderDecoration(type, rowIndex, tileSize) {
  const items = [];

  if (type === 'road' && ROW_TYPES[rowIndex + 1] === 'road') {
    for (let c = 0; c < COLS; c++) {
      items.push(
        <View key={'dash-' + c} style={[styles.dash, { left: c * tileSize + tileSize * 0.25, width: tileSize * 0.5 }]} />
      );
    }
  }
  
  if (type === 'goal') {
    for (let c = 0; c < COLS; c++) {
      const size = tileSize * 0.7;
      items.push(
        <View
          key={'pad-' + c}
          style={[styles.lily, { left: c * tileSize + (tileSize - size) / 2, top: (tileSize - size) / 2, width: size, height: size, borderRadius: size / 2 }]}
        />
      );
    }
  }
  return items;
}

export default function LaneBackground({ tileSize }) {
  const rows = [];
  for (let i = 0; i < ROWS; i++) {
    const type = ROW_TYPES[i];
    rows.push(
      <View key={'row-' + i} style={[styles.row, { top: i * tileSize, height: tileSize, backgroundColor: getRowColor(type) }]}>
        {renderDecoration(type, i, tileSize)}
      </View>
    );
  }
  return <View style={StyleSheet.absoluteFill}>{rows}</View>;
}

const styles = StyleSheet.create({
  row: { position: 'absolute', left: 0, right: 0 },
  dash: { position: 'absolute', bottom: 0, height: 2, backgroundColor: COLORS.roadLine, opacity: 0.7 },
  lily: { position: 'absolute', backgroundColor: COLORS.lilyPad },
});

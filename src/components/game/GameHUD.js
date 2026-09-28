import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

function Stat({ label, value, highlight }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, highlight ? styles.danger : null]}>{value}</Text>
    </View>
  );
}

export default function GameHUD({ timeLeft, totalTime, score, frogs, speed }) {
  const ratio = timeLeft / totalTime;
  const isCritical = timeLeft <= 10;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Stat label="Waktu" value={Math.ceil(timeLeft) + 's'} highlight={isCritical} />
        <Stat label="Katak" value={'🐸 ' + frogs} />
        <Stat label="Skor" value={score} />
        <Stat label="Speed" value={'x' + speed.toFixed(1)} />
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, { width: ratio * 100 + '%', backgroundColor: isCritical ? COLORS.danger : COLORS.accent }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, paddingVertical: 8 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  stat: { alignItems: 'center', flex: 1 },
  label: { color: '#C8E6C9', fontSize: 11 },
  value: { color: COLORS.white, fontSize: 18, fontWeight: '800' },
  danger: { color: '#FF8A80' },
  track: { height: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 3, marginTop: 8, overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 3 },
});

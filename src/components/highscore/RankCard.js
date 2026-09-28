import React, { useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet } from 'react-native';
import COLORS from '../../constants/colors';

const MEDALS = ['🥇', '🥈', '🥉'];
const RANK_COLORS = ['#FFD54F', '#CFD8DC', '#FFAB91'];

export default function RankCard({ rank, username, score, delay }) {
  const slide = useRef(new Animated.Value(0)).current;

  useEffect(function () {
    Animated.timing(slide, { toValue: 1, duration: 450, delay: delay, useNativeDriver: true }).start();
  }, []);

  const translateX = slide.interpolate({ inputRange: [0, 1], outputRange: [260, 0] });
  const color = RANK_COLORS[rank - 1];

  return (
    <Animated.View style={[styles.card, { borderLeftColor: color, opacity: slide, transform: [{ translateX: translateX }] }]}>
      <View style={[styles.medalBox, { backgroundColor: color }]}>
        <Text style={styles.medal}>{MEDALS[rank - 1]}</Text>
        <Text style={styles.rank}>#{rank}</Text>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>{username}</Text>
        <Text style={styles.caption}>Pemain</Text>
      </View>
      <View style={styles.scoreBox}>
        <Text style={styles.score}>{score}</Text>
        <Text style={styles.caption}>poin</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    marginBottom: 14,
    borderLeftWidth: 6,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  medalBox: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  medal: { fontSize: 30 },
  rank: { fontSize: 11, fontWeight: '800', color: COLORS.text },
  info: { flex: 1, marginLeft: 14 },
  name: { fontSize: 18, fontWeight: '700', color: COLORS.text },
  caption: { fontSize: 12, color: COLORS.textMuted },
  scoreBox: { alignItems: 'flex-end' },
  score: { fontSize: 24, fontWeight: '900', color: COLORS.primary },
});

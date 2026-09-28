import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import COLORS from '../constants/colors';
import RankCard from '../components/highscore/RankCard';
import { getTopScores } from '../services/scoreService';

export default function HighScoreScreen() {
  const [scores, setScores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    loadScores();
  }, []);

  async function loadScores() {
    const top = await getTopScores(3);
    setScores(top);
    setIsLoading(false);
  }

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>🏆 Top 3 Pemain</Text>
      {scores.length === 0 ? (
        <Text style={styles.empty}>Belum ada skor. Ayo main dulu!</Text>
      ) : (
        scores.map(function (item, index) {
          return (
            <RankCard
              key={item.username}
              rank={index + 1}
              username={item.username}
              score={item.score}
              delay={index * 180}
            />
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  heading: { fontSize: 22, fontWeight: '900', color: COLORS.text, marginBottom: 18 },
  empty: { textAlign: 'center', color: COLORS.textMuted, marginTop: 40 },
});

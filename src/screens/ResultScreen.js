import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import AppButton from '../components/common/AppButton';
import { getTitle } from '../services/titleService';
import { updateHighScore } from '../services/scoreService';
import { getCurrentUser } from '../services/authService';

export default function ResultScreen({ navigation, route }) {
  const { score, frogs, flies, bonus } = route.params;
  const title = getTitle(frogs);

  const [record, setRecord] = useState(null);
  const pop = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(0)).current;

  useEffect(function () {
    processHighScore();
    Animated.sequence([
      Animated.spring(pop, { toValue: 1, friction: 5, useNativeDriver: true }),
      Animated.timing(fade, { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  async function processHighScore() {
    const username = await getCurrentUser();
    const result = await updateHighScore(username, score);
    setRecord(result);
  }

  function renderRecordInfo() {
    if (record === null) return null;
    if (record.isNewRecord) {
      return <Text style={styles.newRecord}>🎉 Rekor baru! Skor tersimpan sebagai High Score</Text>;
    }
    return <Text style={styles.oldRecord}>Rekor terbaikmu masih {record.bestScore} poin</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.titleCard, { transform: [{ scale: pop }] }]}>
        <Text style={styles.titleEmoji}>{title.emoji}</Text>
        <Text style={styles.titleLabel}>Gelar kamu</Text>
        <Text style={styles.titleText}>{title.title}</Text>
      </Animated.View>

      <Animated.View style={[styles.statsCard, { opacity: fade }]}>
        <Text style={styles.scoreLabel}>Skor Akhir</Text>
        <Text style={styles.score}>{score}</Text>

        <View style={styles.statRow}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🐸 {frogs}</Text>
            <Text style={styles.statLabel}>Katak menyeberang</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>🪰 {flies}</Text>
            <Text style={styles.statLabel}>Lalat (+{bonus})</Text>
          </View>
        </View>
        {renderRecordInfo()}
      </Animated.View>

      <Animated.View style={[styles.buttons, { opacity: fade }]}>
        <AppButton title="Play Again" onPress={function () { navigation.replace('Game'); }} />
        <AppButton title="High Scores" variant="secondary" onPress={function () { navigation.navigate('HighScore'); }} />
        <AppButton title="Main Menu" variant="outline" onPress={function () { navigation.goBack(); }} />
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: 24, justifyContent: 'center' },
  titleCard: { backgroundColor: COLORS.primary, borderRadius: 24, padding: 24, alignItems: 'center' },
  titleEmoji: { fontSize: 56 },
  titleLabel: { color: '#C8E6C9', marginTop: 6 },
  titleText: { color: COLORS.white, fontSize: 26, fontWeight: '900', textAlign: 'center' },
  statsCard: { backgroundColor: COLORS.card, borderRadius: 20, padding: 20, marginTop: 18, alignItems: 'center' },
  scoreLabel: { color: COLORS.textMuted },
  score: { fontSize: 48, fontWeight: '900', color: COLORS.primary },
  statRow: { flexDirection: 'row', marginTop: 10 },
  statItem: { flex: 1, alignItems: 'center' },
  statValue: { fontSize: 20, fontWeight: '800', color: COLORS.text },
  statLabel: { fontSize: 12, color: COLORS.textMuted },
  newRecord: { marginTop: 14, color: COLORS.primary, fontWeight: '800', textAlign: 'center' },
  oldRecord: { marginTop: 14, color: COLORS.textMuted, textAlign: 'center' },
  buttons: { marginTop: 20 },
});

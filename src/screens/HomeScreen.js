import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Alert, Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import COLORS from '../constants/colors';
import { GAME_DURATION, POINTS_PER_FROG, FLY_BONUS_POINTS } from '../constants/gameConfig';
import AppButton from '../components/common/AppButton';
import { getCurrentUser } from '../services/authService';
import { getUserBest } from '../services/scoreService';

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [best, setBest] = useState(0);
  const bounce = useRef(new Animated.Value(0)).current;

  useEffect(function () {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bounce, { toValue: 1, duration: 600, useNativeDriver: true }),
        Animated.timing(bounce, { toValue: 0, duration: 600, useNativeDriver: true }),
      ])
    );
    loop.start();
    return function () {
      loop.stop();
    };
  }, []);

  useFocusEffect(
    React.useCallback(function () {
      loadData();
    }, [])
  );

  async function loadData() {
    const name = await getCurrentUser();
    setUsername(name);
    setBest(await getUserBest(name));
  }

  function showHowToPlay() {
    const rules =
      '• Swipe atas/bawah/kiri/kanan untuk menggerakkan katak.\n' +
      '• Hindari mobil, truk, dan mobil balap di jalan raya.\n' +
      '• Di sungai, melompatlah ke atas kayu. Jatuh ke air = tenggelam.\n' +
      '• Tiap katak sampai seberang: +' + POINTS_PER_FROG + ' poin.\n' +
      '• Tangkap lalat di atas kayu: +' + FLY_BONUS_POINTS + ' poin.\n' +
      '• Waktu ' + GAME_DURATION + ' detik. Makin banyak katak menyeberang, makin cepat rintangannya!';

    Alert.alert('Cara Bermain', rules, [
      { text: 'Batal', style: 'cancel' },
      { text: 'OK', onPress: function () { navigation.navigate('Game'); } },
    ]);
  }

  const translateY = bounce.interpolate({ inputRange: [0, 1], outputRange: [0, -18] });

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.frog, { transform: [{ translateY: translateY }] }]}>🐸</Animated.Text>
      <Text style={styles.greeting}>Halo, {username}!</Text>
      <Text style={styles.best}>Skor terbaikmu: {best}</Text>

      <View style={styles.actions}>
        <AppButton title="▶  Play Game" onPress={showHowToPlay} />
      </View>
      <Text style={styles.tip}>Buka menu untuk cek High Score dan Log Out</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', padding: 24 },
  frog: { fontSize: 110 },
  greeting: { fontSize: 26, fontWeight: '800', color: COLORS.text, marginTop: 12 },
  best: { fontSize: 15, color: COLORS.textMuted, marginTop: 4 },
  actions: { width: '100%', marginTop: 36 },
  tip: { marginTop: 18, color: COLORS.textMuted, fontSize: 12 },
});

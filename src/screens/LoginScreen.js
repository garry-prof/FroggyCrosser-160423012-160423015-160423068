import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import COLORS from '../constants/colors';
import AppButton from '../components/common/AppButton';
import { validateUsername, login } from '../services/authService';

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  async function handleLogin() {
    const message = validateUsername(username);
    if (message !== null) {
      setError(message);
      return;
    }
    await login(username);
    navigation.replace('Main');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={styles.inner}>
        <Text style={styles.logo}>🐸</Text>
        <Text style={styles.title}>Froggy Crosser</Text>
        <Text style={styles.subtitle}>Seberangkan katak sebanyak mungkin sebelum waktu habis</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Masukkan username"
            value={username}
            onChangeText={function (text) {
              setUsername(text);
              setError('');
            }}
            autoCapitalize="none"
            maxLength={15}
          />
          {error !== '' ? <Text style={styles.error}>{error}</Text> : null}
          <AppButton title="Masuk" onPress={handleLogin} style={{ marginTop: 12 }} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.primary },
  inner: { flex: 1, justifyContent: 'center', padding: 24 },
  logo: { fontSize: 80, textAlign: 'center' },
  title: { fontSize: 32, fontWeight: '900', color: COLORS.white, textAlign: 'center' },
  subtitle: { color: '#C8E6C9', textAlign: 'center', marginTop: 6, marginBottom: 28 },
  card: { backgroundColor: COLORS.card, borderRadius: 20, padding: 20 },
  label: { fontWeight: '700', color: COLORS.text, marginBottom: 8 },
  input: { borderWidth: 1.5, borderColor: '#C5E1A5', borderRadius: 12, padding: 12, fontSize: 16 },
  error: { color: COLORS.danger, marginTop: 8 },
});

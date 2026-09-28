import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { isLoggedIn } from './src/services/authService';
import COLORS from './src/constants/colors';

export default function App() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(function () {
    checkLogin();
  }, []);

  async function checkLogin() {
    const loggedIn = await isLoggedIn();
    setInitialRoute(loggedIn ? 'Main' : 'Login');
  }

  if (initialRoute === null) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.white} />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AppNavigator initialRoute={initialRoute} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: COLORS.primary, alignItems: 'center', justifyContent: 'center' },
});

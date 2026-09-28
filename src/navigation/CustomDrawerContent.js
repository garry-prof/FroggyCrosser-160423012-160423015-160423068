import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import COLORS from '../constants/colors';
import { getCurrentUser, logout } from '../services/authService';

export default function CustomDrawerContent(props) {
  const [username, setUsername] = useState('');

  useEffect(function () {
    getCurrentUser().then(function (name) {
      setUsername(name);
    });
  }, []);

  async function doLogout() {
    await logout();
    props.navigation.closeDrawer();
    // Reset di level stack (parent), bukan di drawer
    props.navigation.getParent().reset({ index: 0, routes: [{ name: 'Login' }] });
  }

  function handleLogout() {
    Alert.alert('Log Out', 'Yakin ingin keluar dari akun ini?', [
      { text: 'Batal', style: 'cancel' },
      { text: 'Log Out', style: 'destructive', onPress: doLogout },
    ]);
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.scroll}>
      <View style={styles.header}>
        <Text style={styles.avatar}>🐸</Text>
        <Text style={styles.hello}>Pemain</Text>
        <Text style={styles.username}>{username}</Text>
      </View>

      <DrawerItem
        label="High Score"
        labelStyle={styles.label}
        icon={function () { return <Text style={styles.icon}>🏆</Text>; }}
        onPress={function () { props.navigation.navigate('HighScore'); }}
      />
      <DrawerItem
        label="Log Out"
        labelStyle={[styles.label, { color: COLORS.danger }]}
        icon={function () { return <Text style={styles.icon}>🚪</Text>; }}
        onPress={handleLogout}
      />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { paddingTop: 0 },
  header: { backgroundColor: COLORS.primary, padding: 24, paddingTop: 56, marginBottom: 8 },
  avatar: { fontSize: 48 },
  hello: { color: '#C8E6C9', marginTop: 8, fontSize: 13 },
  username: { color: COLORS.white, fontSize: 22, fontWeight: '800' },
  label: { fontSize: 16, fontWeight: '600' },
  icon: { fontSize: 20 },
});

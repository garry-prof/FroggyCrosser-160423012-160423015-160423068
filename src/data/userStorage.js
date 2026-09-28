import AsyncStorage from '@react-native-async-storage/async-storage';
import STORAGE_KEYS from './storageKeys';

export async function saveUsername(username) {
  await AsyncStorage.setItem(STORAGE_KEYS.USERNAME, username);
}

export async function getUsername() {
  return await AsyncStorage.getItem(STORAGE_KEYS.USERNAME);
}

export async function removeUsername() {
  await AsyncStorage.removeItem(STORAGE_KEYS.USERNAME);
}

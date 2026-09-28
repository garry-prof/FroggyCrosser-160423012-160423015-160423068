import AsyncStorage from '@react-native-async-storage/async-storage';
import STORAGE_KEYS from './storageKeys';

export async function getHighScores() {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.HIGH_SCORES);
  if (raw === null) {
    return [];
  }
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (error) {
    return [];
  }
}

export async function saveHighScores(list) {
  await AsyncStorage.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(list));
}

export async function saveLastGame(data) {
  await AsyncStorage.setItem(STORAGE_KEYS.LAST_GAME, JSON.stringify(data));
}

export async function getLastGame() {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.LAST_GAME);
  return raw === null ? null : JSON.parse(raw);
}

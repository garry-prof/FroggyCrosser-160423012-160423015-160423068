import { saveUsername, getUsername, removeUsername } from '../data/userStorage';

// Mengembalikan pesan error, atau null kalau valid
export function validateUsername(username) {
  const clean = username.trim();
  if (clean.length === 0) {
    return 'Username tidak boleh kosong';
  }
  if (clean.length < 3) {
    return 'Username minimal 3 karakter';
  }
  if (clean.length > 15) {
    return 'Username maksimal 15 karakter';
  }
  return null;
}

export async function login(username) {
  await saveUsername(username.trim());
}

export async function getCurrentUser() {
  const username = await getUsername();
  return username === null ? '' : username;
}

export async function isLoggedIn() {
  const username = await getUsername();
  return username !== null && username !== '';
}

export async function logout() {
  await removeUsername();
}

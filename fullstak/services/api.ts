import { Platform } from 'react-native';

// Ganti dengan IP WiFi komputer kamu (jalankan `ipconfig` di terminal)
const LOCAL_IP = '192.168.1.6'; // <-- GANTI INI dengan IP kamu

const BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:3000' 
  : `http://${LOCAL_IP}:3000`;

async function request(endpoint: string, options?: RequestInit) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  return res.json();
}

// Auth
export const login = (email: string, _password: string) =>
  request(`/users?email=${email}`);

export const register = (user: { name: string; email: string; phone: string; password: string }) =>
  request('/users', { method: 'POST', body: JSON.stringify({ ...user, avatar: 'https://i.pravatar.cc/150?img=11' }) });

// Wallet
export const getWallet = (userId = 1) =>
  request(`/wallets?userId=${userId}`);

export const updateWallet = (walletId: number, balance: number) =>
  request(`/wallets/${walletId}`, { method: 'PATCH', body: JSON.stringify({ balance }) });

// Transactions
export const getTransactions = (userId = 1) =>
  request(`/transactions?userId=${userId}&_sort=id&_order=desc`);

export const getRecentTransactions = (userId = 1) =>
  request(`/transactions?userId=${userId}&_sort=id&_order=desc&_limit=5`);

export const createTransaction = (tx: { userId: number; title: string; date: string; amount: number; type: string; iconName: string }) =>
  request('/transactions', { method: 'POST', body: JSON.stringify(tx) });

// Profile
export const getProfile = (userId = 1) =>
  request(`/users/${userId}`);

export const updateProfile = (userId: number, data: Partial<{ name: string; email: string; phone: string }>) =>
  request(`/users/${userId}`, { method: 'PATCH', body: JSON.stringify(data) });

// Cards
export const getCards = (userId = 1) =>
  request(`/cards?userId=${userId}`);

import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  USER_ID: 'userId',
  USER_DATA: 'userData',
};

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export const saveUserSession = async (userId: number, userData: UserData) => {
  await AsyncStorage.setItem(KEYS.USER_ID, String(userId));
  await AsyncStorage.setItem(KEYS.USER_DATA, JSON.stringify(userData));
};

export const getUserSession = async (): Promise<{ userId: number; userData: UserData } | null> => {
  const userId = await AsyncStorage.getItem(KEYS.USER_ID);
  const userData = await AsyncStorage.getItem(KEYS.USER_DATA);
  if (userId && userData) {
    return { userId: Number(userId), userData: JSON.parse(userData) };
  }
  return null;
};

export const clearUserSession = async () => {
  await AsyncStorage.multiRemove([KEYS.USER_ID, KEYS.USER_DATA]);
};

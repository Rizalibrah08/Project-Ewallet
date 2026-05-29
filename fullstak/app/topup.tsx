import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createTransaction, getWallet, updateWallet } from '../services/api';
import { getUserSession } from '../services/storage';

export default function TopUpScreen() {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTopUp = async () => {
    const numAmount = parseInt(amount);
    if (!numAmount) {
      Alert.alert('Error', 'Masukkan jumlah top up');
      return;
    }
    setLoading(true);
    try {
      const session = await getUserSession();
      const userId = session?.userId || 1;
      const wallets = await getWallet(userId);
      const wallet = wallets[0];
      await createTransaction({ userId, title: 'Top Up Saldo', date: new Date().toISOString(), amount: numAmount, type: 'TOP UP', iconName: 'add-circle' });
      await updateWallet(wallet.id, wallet.balance + numAmount);
      Alert.alert('Berhasil', `Top Up Rp ${numAmount.toLocaleString('id-ID')} berhasil!`, [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch {
      Alert.alert('Error', 'Gagal melakukan top up');
    } finally {
      setLoading(false);
    }
  };

  const presets = [50000, 100000, 200000, 500000];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4C51C6" />
        </TouchableOpacity>
        <Text style={styles.header}>Top Up</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>AMOUNT (Rp)</Text>
          <TextInput style={styles.input} placeholder="100000" placeholderTextColor="#9CA3AF" keyboardType="numeric" value={amount} onChangeText={setAmount} />
        </View>

        <View style={styles.presets}>
          {presets.map((val) => (
            <TouchableOpacity key={val} style={styles.presetBtn} onPress={() => setAmount(String(val))}>
              <Text style={styles.presetText}>Rp {val.toLocaleString('id-ID')}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={handleTopUp} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Top Up Now</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFCFF', paddingTop: Platform.OS === 'android' ? 40 : 10, paddingHorizontal: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 },
  header: { fontSize: 20, fontWeight: '700', color: '#111827' },
  form: { gap: 16 },
  inputContainer: { backgroundColor: '#EAECEF', borderRadius: 16, paddingHorizontal: 16, paddingVertical: 12 },
  label: { fontSize: 11, color: '#4B5563', marginBottom: 2, fontWeight: '600', letterSpacing: 0.5 },
  input: { fontSize: 16, color: '#1F2937', padding: 0, height: 24 },
  presets: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  presetBtn: { backgroundColor: '#EEF0FB', borderRadius: 10, paddingVertical: 10, paddingHorizontal: 16 },
  presetText: { color: '#4C51C6', fontSize: 13, fontWeight: '600' },
  button: { backgroundColor: '#4C51C6', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

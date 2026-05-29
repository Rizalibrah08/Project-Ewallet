import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Platform, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { createTransaction, getWallet, updateWallet } from '../services/api';
import { getUserSession } from '../services/storage';

export default function TransferScreen() {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTransfer = async () => {
    const numAmount = parseInt(amount);
    if (!recipient || !numAmount) {
      Alert.alert('Error', 'Lengkapi semua field');
      return;
    }
    setLoading(true);
    try {
      const session = await getUserSession();
      const userId = session?.userId || 1;
      const wallets = await getWallet(userId);
      const wallet = wallets[0];
      if (wallet.balance < numAmount) {
        Alert.alert('Error', 'Saldo tidak cukup');
        return;
      }
      await createTransaction({ userId, title: `Transfer ke ${recipient}`, date: new Date().toISOString(), amount: -numAmount, type: 'TRANSFER', iconName: 'paper-plane' });
      await updateWallet(wallet.id, wallet.balance - numAmount);
      Alert.alert('Berhasil', `Transfer Rp ${numAmount.toLocaleString('id-ID')} ke ${recipient}`, [
        { text: 'OK', onPress: () => router.back() }
      ]);
    } catch {
      Alert.alert('Error', 'Gagal melakukan transfer');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#4C51C6" />
        </TouchableOpacity>
        <Text style={styles.header}>Transfer</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>RECIPIENT</Text>
          <TextInput style={styles.input} placeholder="Nama atau nomor tujuan" placeholderTextColor="#9CA3AF" value={recipient} onChangeText={setRecipient} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>AMOUNT (Rp)</Text>
          <TextInput style={styles.input} placeholder="100000" placeholderTextColor="#9CA3AF" keyboardType="numeric" value={amount} onChangeText={setAmount} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleTransfer} disabled={loading}>
          {loading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.buttonText}>Send Transfer</Text>}
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
  button: { backgroundColor: '#4C51C6', borderRadius: 12, paddingVertical: 16, alignItems: 'center', marginTop: 16 },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});

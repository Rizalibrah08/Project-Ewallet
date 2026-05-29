import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createTransaction, getWallet, updateWallet } from '../../services/api';
import { getUserSession } from '../../services/storage';

export default function ScanScreen() {
  const [loading, setLoading] = useState(false);

  const handleSimulatePayment = async () => {
    setLoading(true);
    try {
      const session = await getUserSession();
      const userId = session?.userId || 1;
      const wallets = await getWallet(userId);
      const wallet = wallets[0];
      const paymentAmount = 25000;
      if (wallet.balance < paymentAmount) {
        Alert.alert('Gagal', 'Saldo tidak cukup');
        return;
      }
      await createTransaction({ userId, title: 'QR Payment - Merchant', date: new Date().toISOString(), amount: -paymentAmount, type: 'QR PAYMENT', iconName: 'qr-code' });
      await updateWallet(wallet.id, wallet.balance - paymentAmount);
      Alert.alert('Pembayaran Berhasil', `Rp ${paymentAmount.toLocaleString('id-ID')} telah dibayarkan via QR`);
    } catch {
      Alert.alert('Error', 'Gagal memproses pembayaran');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Scan & Pay</Text>

      <View style={styles.scanArea}>
        <View style={styles.qrFrame}>
          <Ionicons name="qr-code" size={120} color="#4C51C6" />
        </View>
        <Text style={styles.instruction}>Arahkan kamera ke QR Code untuk membayar</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSimulatePayment} disabled={loading}>
        {loading ? <ActivityIndicator color="#FFF" /> : (
          <>
            <Ionicons name="flash" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Simulate Payment (Rp 25.000)</Text>
          </>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFCFF', paddingTop: Platform.OS === 'android' ? 40 : 10, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 30, textAlign: 'center' },
  scanArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  qrFrame: { width: 200, height: 200, borderRadius: 20, borderWidth: 3, borderColor: '#4C51C6', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center', marginBottom: 24 },
  instruction: { fontSize: 14, color: '#6B7280', textAlign: 'center' },
  button: { flexDirection: 'row', backgroundColor: '#4C51C6', borderRadius: 12, paddingVertical: 16, alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: Platform.OS === 'android' ? 100 : 40 },
  buttonText: { color: '#FFF', fontSize: 15, fontWeight: '600' },
});

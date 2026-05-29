import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getTransactions } from '../../services/api';

export default function HistoryScreen() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTransactions().then(setTransactions).finally(() => setLoading(false));
  }, []);

  const formatCurrency = (num: number) => Math.abs(num).toLocaleString('id-ID');

  if (loading) {
    return <SafeAreaView style={styles.container}><ActivityIndicator size="large" color="#4C51C6" style={{ flex: 1 }} /></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Transaction History</Text>
      <FlatList
        data={transactions}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.iconContainer}>
              <Ionicons name={item.iconName as any} size={20} color="#4B5563" />
            </View>
            <View style={styles.middle}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.date}>{new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</Text>
            </View>
            <View style={styles.right}>
              <Text style={[styles.amount, { color: item.amount >= 0 ? '#059669' : '#EF4444' }]}>
                {item.amount >= 0 ? '+' : '-'}Rp {formatCurrency(item.amount)}
              </Text>
              <Text style={styles.type}>{item.type}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFCFF', paddingTop: Platform.OS === 'android' ? 40 : 10 },
  header: { fontSize: 24, fontWeight: '700', color: '#111827', paddingHorizontal: 20, marginBottom: 20 },
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#F3F4F6' },
  iconContainer: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3F5FA', justifyContent: 'center', alignItems: 'center' },
  middle: { flex: 1, marginLeft: 12 },
  title: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 2 },
  date: { fontSize: 11, color: '#6B7280' },
  right: { alignItems: 'flex-end' },
  amount: { fontSize: 14, fontWeight: '700', marginBottom: 2 },
  type: { fontSize: 9, color: '#6B7280', fontWeight: '600', letterSpacing: 0.5 },
});

import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  SafeAreaView, Platform, StatusBar, Image, ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { getWallet, getRecentTransactions } from '../../services/api';

export default function DashboardScreen() {
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [wallets, txs] = await Promise.all([getWallet(), getRecentTransactions()]);
      if (wallets.length > 0) setBalance(wallets[0].balance);
      setTransactions(txs);
    } catch (e) {
      console.log('Error fetching dashboard data:', e);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (num: number) => 
    Math.abs(num).toLocaleString('id-ID');

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#4C51C6" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image source={{ uri: 'https://i.pravatar.cc/150?img=11' }} style={styles.avatar} />
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Selamat Datang,</Text>
              <Text style={styles.nameText}>Rizal!</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellButton}>
            <Ionicons name="notifications" size={20} color="#4C51C6" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>YUME BALANCE</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.currency}>Rp</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(balance)}</Text>
          </View>
          <View style={styles.cardActionsWrapper}>
            <View style={styles.cardActionsInner}>
              <TouchableOpacity style={styles.actionIconBtn} onPress={() => router.push('/topup' as any)}>
                <View style={styles.actionIconCircle}>
                  <Ionicons name="add" size={24} color="#4C51C6" />
                </View>
                <Text style={styles.actionIconLabel}>Top Up</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.actionIconBtn} onPress={() => router.push('/transfer' as any)}>
                <View style={styles.actionIconCircle}>
                  <Ionicons name="paper-plane" size={20} color="#4C51C6" />
                </View>
                <Text style={styles.actionIconLabel}>Transfer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/history' as any)}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.transactionsList}>
          {transactions.map((tx) => (
            <View key={tx.id} style={styles.transactionRow}>
              <View style={styles.txIconContainer}>
                <Ionicons name={tx.iconName as any} size={20} color="#4B5563" />
              </View>
              <View style={styles.txMiddle}>
                <Text style={styles.txTitle}>{tx.title}</Text>
                <Text style={styles.txDate}>{new Date(tx.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={[styles.txAmount, { color: tx.amount >= 0 ? '#059669' : '#111827' }]}>
                  {tx.amount >= 0 ? '+' : '-'}Rp {formatCurrency(tx.amount)}
                </Text>
                <Text style={styles.txType}>{tx.type}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FBFCFF' },
  scrollContent: { paddingHorizontal: 20, paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 100 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 },
  profileSection: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 2, borderColor: '#EAECEF' },
  greetingContainer: { marginLeft: 12 },
  greetingText: { fontSize: 12, color: '#6B7280', marginBottom: 2 },
  nameText: { fontSize: 16, fontWeight: '700', color: '#4C51C6' },
  bellButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EEF0FB', justifyContent: 'center', alignItems: 'center' },
  notificationDot: { position: 'absolute', top: 10, right: 10, width: 8, height: 8, borderRadius: 4, backgroundColor: '#34D399', borderWidth: 1.5, borderColor: '#EEF0FB' },
  balanceCard: { backgroundColor: '#4C51C6', borderRadius: 28, padding: 24, paddingBottom: 28, shadowColor: '#4C51C6', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.25, shadowRadius: 16, elevation: 8, marginBottom: 24 },
  balanceLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 11, fontWeight: '600', letterSpacing: 0.5, marginBottom: 8 },
  balanceRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 40 },
  currency: { color: '#FFFFFF', fontSize: 18, fontWeight: '600', marginTop: 4, marginRight: 4 },
  balanceAmount: { color: '#FFFFFF', fontSize: 40, fontWeight: '700', letterSpacing: -1 },
  cardActionsWrapper: { alignItems: 'flex-start' },
  cardActionsInner: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 20, paddingVertical: 12, paddingHorizontal: 16, gap: 32 },
  actionIconBtn: { alignItems: 'center' },
  actionIconCircle: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center', marginBottom: 6 },
  actionIconLabel: { color: '#FFFFFF', fontSize: 11, fontWeight: '600' },
  transactionsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  seeAllText: { color: '#4C51C6', fontSize: 13, fontWeight: '600' },
  transactionsList: { gap: 20 },
  transactionRow: { flexDirection: 'row', alignItems: 'center' },
  txIconContainer: { width: 50, height: 50, borderRadius: 25, backgroundColor: '#F3F5FA', justifyContent: 'center', alignItems: 'center' },
  txMiddle: { flex: 1, marginLeft: 14 },
  txTitle: { fontSize: 15, fontWeight: '600', color: '#111827', marginBottom: 4 },
  txDate: { fontSize: 11, color: '#6B7280' },
  txRight: { alignItems: 'flex-end' },
  txAmount: { fontSize: 14, fontWeight: '700', marginBottom: 4 },
  txType: { fontSize: 9, color: '#6B7280', fontWeight: '600', letterSpacing: 0.5 },
});

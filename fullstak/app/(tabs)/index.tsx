import React from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  SafeAreaView, Platform, StatusBar, Image 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const transactions = [
  { id: '1', title: 'Spotify', date: 'Today, 09:41 AM', amount: '-Rp 55.000', type: 'SUBSCRIPTION', iconName: 'musical-notes', isPositive: false },
  { id: '2', title: 'GrabFood', date: 'Yesterday, 19:20 PM', amount: '-Rp 72.000', type: 'FOOD DELIVERY', iconName: 'restaurant', isPositive: false },
  { id: '3', title: 'Incoming from Sora', date: 'Aug 12, 14:05 PM', amount: '+Rp 200.000', type: 'RECEIVED', iconName: 'wallet', isPositive: true },
  { id: '4', title: 'Kopi Kenangan', date: 'Aug 10, 08:15 AM', amount: '-Rp 35.000', type: 'COFFEE', iconName: 'cafe', isPositive: false },
  { id: '5', title: 'Netflix', date: 'Aug 08, 10:00 AM', amount: '-Rp 186.000', type: 'STREAMING', iconName: 'film', isPositive: false },
  { id: '6', title: 'Monthly Salary', date: 'Aug 01, 09:00 AM', amount: '+Rp 8.500.000', type: 'SALARY', iconName: 'cash', isPositive: true },
  { id: '7', title: 'Starbucks', date: 'Jul 30, 15:20 PM', amount: '-Rp 65.000', type: 'FOOD & DRINK', iconName: 'cafe', isPositive: false },
  { id: '8', title: 'Cashback Promo', date: 'Jul 28, 11:45 AM', amount: '+Rp 15.000', type: 'REWARD', iconName: 'gift', isPositive: true },
];

export default function DashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.profileSection}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
              style={styles.avatar}
            />
            <View style={styles.greetingContainer}>
              <Text style={styles.greetingText}>Konnichiwa,</Text>
              <Text style={styles.nameText}>Haru!</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellButton}>
            <Ionicons name="notifications" size={20} color="#4C51C6" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Main Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>YUME BALANCE</Text>
          <View style={styles.balanceRow}>
            <Text style={styles.currency}>Rp</Text>
            <Text style={styles.balanceAmount}>4.750.000</Text>
          </View>
          
          <View style={styles.cardActionsWrapper}>
            <View style={styles.cardActionsInner}>
              <TouchableOpacity style={styles.actionIconBtn}>
                <View style={styles.actionIconCircle}>
                  <Ionicons name="add" size={24} color="#4C51C6" />
                </View>
                <Text style={styles.actionIconLabel}>Top Up</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionIconBtn}>
                <View style={styles.actionIconCircle}>
                  <Ionicons name="paper-plane" size={20} color="#4C51C6" />
                </View>
                <Text style={styles.actionIconLabel}>Transfer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.quickActionBox}>
            <View style={[styles.quickActionIconBg, { backgroundColor: '#A5F3FC' }]}>
              <Ionicons name="return-down-back" size={20} color="#0E7490" />
            </View>
            <Text style={styles.quickActionText}>Request</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickActionBox}>
            <View style={[styles.quickActionIconBg, { backgroundColor: '#E5E7EB' }]}>
              <Ionicons name="card" size={16} color="#4B5563" />
            </View>
            <Text style={styles.quickActionText}>Withdraw</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions List */}
        <View style={styles.transactionsHeader}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <TouchableOpacity>
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
                <Text style={styles.txDate}>{tx.date}</Text>
              </View>
              <View style={styles.txRight}>
                <Text style={[styles.txAmount, { color: tx.isPositive ? '#059669' : '#111827' }]}>
                  {tx.amount}
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
  safeArea: {
    flex: 1,
    backgroundColor: '#FBFCFF',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 40 : 10,
    paddingBottom: 100, // padding for bottom tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#EAECEF',
  },
  greetingContainer: {
    marginLeft: 12,
  },
  greetingText: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 2,
  },
  nameText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4C51C6',
  },
  bellButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EEF0FB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34D399', // bright green dot
    borderWidth: 1.5,
    borderColor: '#EEF0FB',
  },
  balanceCard: {
    backgroundColor: '#4C51C6',
    borderRadius: 28,
    padding: 24,
    paddingBottom: 28,
    shadowColor: '#4C51C6',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  currency: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 4,
    marginRight: 4,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: -1,
  },
  cardActionsWrapper: {
    alignItems: 'flex-start',
  },
  cardActionsInner: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    gap: 32,
  },
  actionIconBtn: {
    alignItems: 'center',
  },
  actionIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  actionIconLabel: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '600',
  },
  quickActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
  },
  quickActionBox: {
    flex: 1,
    height: 64,
    backgroundColor: '#F3F5FA', // very light grey/purple
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  quickActionIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  quickActionText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '600',
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  seeAllText: {
    color: '#4C51C6',
    fontSize: 13,
    fontWeight: '600',
  },
  transactionsList: {
    gap: 20,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F3F5FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txMiddle: {
    flex: 1,
    marginLeft: 14,
  },
  txTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  txDate: {
    fontSize: 11,
    color: '#6B7280',
  },
  txRight: {
    alignItems: 'flex-end',
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
  },
  txType: {
    fontSize: 9,
    color: '#6B7280',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

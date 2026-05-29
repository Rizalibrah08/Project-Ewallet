import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCards } from '../../services/api';

export default function CardsScreen() {
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCards().then(setCards).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <SafeAreaView style={styles.container}><ActivityIndicator size="large" color="#4C51C6" style={{ flex: 1 }} /></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Cards</Text>
      <FlatList
        data={cards}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ paddingBottom: 100, gap: 16 }}
        renderItem={({ item }) => (
          <View style={[styles.card, { backgroundColor: item.color }]}>  
            <View style={styles.cardTop}>
              <Text style={styles.cardType}>{item.type}</Text>
              <Ionicons name="wifi" size={20} color="rgba(255,255,255,0.7)" />
            </View>
            <Text style={styles.cardNumber}>{item.cardNumber}</Text>
            <View style={styles.cardBottom}>
              <View>
                <Text style={styles.cardLabel}>CARD HOLDER</Text>
                <Text style={styles.cardValue}>{item.cardHolder}</Text>
              </View>
              <View>
                <Text style={styles.cardLabel}>EXPIRES</Text>
                <Text style={styles.cardValue}>{item.expiry}</Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FBFCFF', paddingTop: Platform.OS === 'android' ? 40 : 10, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: '700', color: '#111827', marginBottom: 20 },
  card: { borderRadius: 20, padding: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6 },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  cardType: { color: '#FFF', fontSize: 16, fontWeight: '700', letterSpacing: 1 },
  cardNumber: { color: '#FFF', fontSize: 20, fontWeight: '600', letterSpacing: 2, marginBottom: 30 },
  cardBottom: { flexDirection: 'row', justifyContent: 'space-between' },
  cardLabel: { color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '600', letterSpacing: 0.5, marginBottom: 4 },
  cardValue: { color: '#FFF', fontSize: 13, fontWeight: '600' },
});

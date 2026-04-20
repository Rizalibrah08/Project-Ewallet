import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#FFFFFF',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          height: Platform.OS === 'ios' ? 90 : 80,
          elevation: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 10,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={[styles.homeTab, focused && styles.homeTabActive]}>
              <Ionicons name="home" size={24} color={focused ? "#FFFFFF" : "#9CA3AF"} />
              <Text style={[styles.tabLabel, { color: focused ? "#FFFFFF" : "#9CA3AF" }]}>Home</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.standardTab}>
              <Ionicons name="receipt-outline" size={24} color={focused ? "#4C51C6" : "#9CA3AF"} />
              <Text style={[styles.tabLabel, { color: focused ? "#4C51C6" : "#9CA3AF" }]}>History</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.scanTabWrapper}>
              <View style={styles.scanTab}>
                <Ionicons name="qr-code-outline" size={28} color="#007DA0" />
              </View>
              <Text style={[styles.tabLabel, { color: "#9CA3AF", marginTop: 4 }]}>Scan</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.standardTab}>
              <Ionicons name="card-outline" size={24} color={focused ? "#4C51C6" : "#9CA3AF"} />
              <Text style={[styles.tabLabel, { color: focused ? "#4C51C6" : "#9CA3AF" }]}>Cards</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={styles.standardTab}>
              <Ionicons name="person-outline" size={24} color={focused ? "#4C51C6" : "#9CA3AF"} />
              <Text style={[styles.tabLabel, { color: focused ? "#4C51C6" : "#9CA3AF" }]}>Profile</Text>
            </View>
          ),
        }}
      />
      <Tabs.Screen name="explore" options={{ href: null }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  homeTab: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: '100%',
  },
  homeTabActive: {
    backgroundColor: '#4C51C6',
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
    height: Platform.OS === 'ios' ? 85 : 75,
    top: Platform.OS === 'ios' ? -15 : -10,
    paddingTop: 12,
    justifyContent: 'flex-start',
  },
  standardTab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanTabWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    top: -20,
  },
  scanTab: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#7CDEF1', 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#7CDEF1',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  tabLabel: {
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});

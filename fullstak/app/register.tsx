import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RegisterScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [agree, setAgree] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#4C51C6" />
          </TouchableOpacity>
          <Text style={styles.logoText}>Yume</Text>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.title}>Create Your Account</Text>
          <Text style={styles.subtitle}>
            Secure your financial future in the Ethereal Vault.
          </Text>

          {/* Form */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>FULL NAME</Text>
            <TextInput 
              style={styles.input} 
              placeholder="John Doe" 
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>EMAIL ADDRESS</Text>
            <TextInput 
              style={styles.input} 
              placeholder="john@example.com" 
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>MOBILE NUMBER</Text>
            <TextInput 
              style={styles.input} 
              placeholder="+1  (555) 000-0000" 
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>PASSWORD</Text>
            <View style={styles.passwordRow}>
              <TextInput 
                style={[styles.input, styles.passwordInput]} 
                placeholder="••••••••" 
                placeholderTextColor="#9CA3AF"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.eyeIcon}>
                <Ionicons name={passwordVisible ? "eye-off" : "eye"} size={22} color="#4B5563" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity 
              style={[styles.checkbox, agree && styles.checkboxActive]} 
              onPress={() => setAgree(!agree)}
            >
              {agree && <Ionicons name="checkmark" size={14} color="#FFF" />}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              I agree to the <Text style={styles.linkText}>Terms & Conditions</Text> and Privacy Policy.
            </Text>
          </View>

          <TouchableOpacity style={styles.getStartedButton} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.getStartedText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" style={styles.buttonIcon} />
          </TouchableOpacity>

          {/* Footer */}
          <View style={styles.footerContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/')}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    height: 60,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    padding: 4,
    zIndex: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#4C51C6',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor: '#EAECEF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 11,
    color: '#4B5563',
    marginBottom: 2,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  input: {
    fontSize: 16,
    color: '#1F2937',
    padding: 0,
    height: 24,
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    paddingLeft: 8,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 32,
    marginTop: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    backgroundColor: '#EAECEF',
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: '#4C51C6',
  },
  checkboxText: {
    flex: 1,
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  linkText: {
    color: '#4C51C6',
    fontWeight: '600',
  },
  getStartedButton: {
    backgroundColor: '#4C51C6',
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 32,
    shadowColor: '#4C51C6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  getStartedText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonIcon: {
    marginLeft: 8,
    marginTop: 2,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 'auto',
    paddingTop: 16,
  },
  footerText: {
    color: '#4B5563',
    fontSize: 14,
  },
  signInText: {
    color: '#4C51C6',
    fontSize: 14,
    fontWeight: '600',
  },
});

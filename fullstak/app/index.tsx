import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, KeyboardAvoidingView, Platform, ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.card}>
            {/* Header */}
            <Text style={styles.title}>Yume</Text>
            <Text style={styles.subtitle}>Sign in to your ethereal vault</Text>

            {/* Form */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email or Phone</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Enter your credentials" 
                placeholderTextColor="#9CA3AF"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Password</Text>
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

            <TouchableOpacity style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signInButton} onPress={() => router.push('/(tabs)')}>
              <Text style={styles.signInButtonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View style={styles.dividerContainer}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
              <View style={styles.dividerLine} />
            </View>

            {/* Social Buttons */}
            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-google" size={20} color="#DB4437" />
                <Text style={styles.socialButtonText}>Google</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.socialButton}>
                <Ionicons name="logo-apple" size={20} color="#000000" />
                <Text style={styles.socialButtonText}>Apple</Text>
              </TouchableOpacity>
            </View>

            {/* Footer */}
            <View style={styles.footerContainer}>
              <Text style={styles.footerText}>New to Yume? </Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>

          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F3F5FA',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 3,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#4C51C6',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#4B5563',
    textAlign: 'center',
    marginBottom: 32,
  },
  inputContainer: {
    backgroundColor: '#E3E4EF', // Slightly darker/purple-ish grey based on UI
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 2,
    fontWeight: '500',
  },
  input: {
    fontSize: 16,
    color: '#1F2937',
    padding: 0, // Removes default padding in Android
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#4C51C6',
    fontSize: 14,
    fontWeight: '500',
  },
  signInButton: {
    backgroundColor: '#4C51C6',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 32,
    shadowColor: '#4C51C6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  dividerText: {
    marginHorizontal: 12,
    color: '#6B7280',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
    marginBottom: 32,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EAECEF',
    borderRadius: 12,
    paddingVertical: 12,
    gap: 8,
  },
  socialButtonText: {
    color: '#1F2937',
    fontSize: 14,
    fontWeight: '500',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    color: '#4B5563',
    fontSize: 14,
  },
  registerText: {
    color: '#4C51C6',
    fontSize: 14,
    fontWeight: '600',
  },
});

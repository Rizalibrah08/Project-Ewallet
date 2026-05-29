# Yume E-Wallet 🌸

A beautifully designed, modern digital wallet application built with **React Native**, **Expo Router**, and integrated with a **JSON Server** mock REST API for full CRUD functionality.

## 📱 Features

### 1. Authentication Flow (API + AsyncStorage)
- **Login Screen** (`app/index.tsx`):
  - Validates user credentials against the API (`GET /users?email=...`)
  - Saves `userId` & `userData` to AsyncStorage on successful login
  - Loading state & error handling
  - Social login placeholders (Google & Apple)
- **Registration Screen** (`app/register.tsx`):
  - Registers new user via API (`POST /users`)
  - Saves `userId` & `userData` to AsyncStorage on successful registration
  - Form validation & Terms checkbox
- **Auto-Login** (`app/_layout.tsx`):
  - Checks AsyncStorage on app launch
  - Automatically redirects to Dashboard if session exists

### 2. Dashboard Interface (API + AsyncStorage)
- **YUME Balance Card** (`app/(tabs)/index.tsx`):
  - Fetches real-time balance from API using `userId` from AsyncStorage
  - Displays user name & avatar from `userData` (AsyncStorage)
  - Quick actions: **Top Up** & **Transfer** navigate to dedicated forms
- **Recent Transactions**:
  - Fetched from API (`GET /transactions?_sort=id&_order=desc&_limit=5`)
  - Color-coded values (Green = income, Red = expense)

### 3. Transaction History (API + AsyncStorage)
- **History Screen** (`app/(tabs)/history.tsx`):
  - Full transaction list from API using `userId` from AsyncStorage
  - Formatted dates, amounts, and category labels

### 4. Transfer & Top Up (API + AsyncStorage)
- **Transfer Screen** (`app/transfer.tsx`):
  - Form with recipient & amount fields
  - Creates transaction & updates wallet balance using `userId` from AsyncStorage
- **Top Up Screen** (`app/topup.tsx`):
  - Amount input with preset quick-select buttons (50K, 100K, 200K, 500K)
  - Creates transaction & updates wallet balance using `userId` from AsyncStorage

### 5. QR Scan & Pay (API + AsyncStorage)
- **Scan Screen** (`app/(tabs)/scan.tsx`):
  - QR code placeholder UI
  - "Simulate Payment" button using `userId` from AsyncStorage

### 6. Cards (API + AsyncStorage)
- **Cards Screen** (`app/(tabs)/cards.tsx`):
  - Fetches card list from API using `userId` from AsyncStorage
  - Displays VISA/Mastercard with masked numbers, holder name, expiry

### 7. Profile (API + AsyncStorage)
- **Profile Screen** (`app/(tabs)/profile.tsx`):
  - Displays user data from `userData` (AsyncStorage) — no extra API call needed
  - Displays name, email, phone, avatar
  - Logout button clears AsyncStorage & redirects to Login

## 💾 AsyncStorage (Local Storage)

Aplikasi ini menggunakan `@react-native-async-storage/async-storage` untuk menyimpan 2 variable data yang sering digunakan:

| Key | Tipe | Deskripsi | Digunakan Di |
|-----|------|-----------|--------------|
| `userId` | `number` | ID user yang sedang login | Semua screen (dashboard, topup, transfer, history, cards, scan, profile) |
| `userData` | `object` | Data user (name, email, phone, avatar) | Dashboard (greeting & avatar), Profile screen |

### Flow AsyncStorage:
```
Login/Register berhasil
    → saveUserSession(userId, userData)
    → Navigate ke Dashboard

Buka App
    → getUserSession() dari AsyncStorage
    → Jika ada data → Auto-login (skip login screen)
    → Jika kosong → Tampilkan login screen

Logout
    → clearUserSession()
    → Navigate ke Login screen
```

### Storage Utility (`services/storage.ts`):
```typescript
saveUserSession(userId, userData)  // Simpan session setelah login/register
getUserSession()                   // Ambil session (return { userId, userData } | null)
clearUserSession()                 // Hapus session saat logout
```

## 🛠 Tech Stack

- **Framework:** [React Native](https://reactnative.dev) (via [Expo SDK 54](https://expo.dev))
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Icons:** `Ionicons` (via `@expo/vector-icons`)
- **Styling:** React Native `StyleSheet`
- **Local Storage:** [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/)
- **Mock API:** [JSON Server](https://github.com/typicode/json-server) v0.17.4

## 🚀 Getting Started

### Prerequisites
- Node.js installed
- Expo CLI (`npx expo`)
- Device/emulator connected to the same WiFi as your computer

### Setup

1. **Navigate to the project root**:
   ```bash
   cd fullstak
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure API URL** (for physical device):
   - Run `ipconfig` (Windows) or `ifconfig` (Mac/Linux) to find your WiFi IP
   - Open `services/api.ts` and replace `192.168.1.1` with your IP address

4. **Start JSON Server** (Terminal 1):
   ```bash
   npm run server
   ```
   API will be available at `http://<your-ip>:3000`

5. **Start Expo** (Terminal 2):
   ```bash
   npx expo start
   ```

6. **Test Login**: Use email `rizal@yume.com` with any password.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users?email=...` | Login (check user) |
| POST | `/users` | Register new user |
| GET | `/users/:id` | Get user profile |
| GET | `/wallets?userId=1` | Get wallet balance |
| PATCH | `/wallets/:id` | Update balance |
| GET | `/transactions?userId=1` | All transactions |
| GET | `/transactions?...&_limit=5` | Recent transactions |
| POST | `/transactions` | Create transaction |
| GET | `/cards?userId=1` | Get user cards |

## 📂 Project Structure

```text
fullstak/
├── db.json                 # Mock database (JSON Server)
├── services/
│   ├── api.ts              # API service layer (all fetch functions)
│   └── storage.ts          # AsyncStorage utility (save/get/clear session)
├── app/
│   ├── _layout.tsx         # Root layout + auto-login check (AsyncStorage)
│   ├── index.tsx           # Login Screen + save to AsyncStorage
│   ├── register.tsx        # Registration Screen + save to AsyncStorage
│   ├── transfer.tsx        # Transfer form (userId from AsyncStorage)
│   ├── topup.tsx           # Top Up form (userId from AsyncStorage)
│   └── (tabs)/
│       ├── _layout.tsx     # Custom Tab Bar
│       ├── index.tsx       # Dashboard (userData & userId from AsyncStorage)
│       ├── history.tsx     # Transaction history (userId from AsyncStorage)
│       ├── scan.tsx        # QR Scan & payment (userId from AsyncStorage)
│       ├── cards.tsx       # Card list (userId from AsyncStorage)
│       └── profile.tsx     # Profile (userData from AsyncStorage) + logout clear
├── components/             # Reusable UI components
└── package.json            # Scripts: start, server, android, ios, web
```

## 🤝 Contribution
Feel free to fork this project and submit a Pull Request if you'd like to improve the UI or integrate a real backend.

---
*Developed for Project E-Wallet Mobile Programming course.*

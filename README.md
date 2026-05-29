# Yume E-Wallet 🌸

A beautifully designed, modern digital wallet application built with **React Native**, **Expo Router**, and integrated with a **JSON Server** mock REST API for full CRUD functionality.

## 📱 Features

### 1. Authentication Flow (API Integrated)
- **Login Screen** (`app/index.tsx`):
  - Validates user credentials against the API (`GET /users?email=...`)
  - Loading state & error handling
  - Social login placeholders (Google & Apple)
- **Registration Screen** (`app/register.tsx`):
  - Registers new user via API (`POST /users`)
  - Form validation & Terms checkbox

### 2. Dashboard Interface (API Integrated)
- **YUME Balance Card** (`app/(tabs)/index.tsx`):
  - Fetches real-time balance from API (`GET /wallets`)
  - Quick actions: **Top Up** & **Transfer** navigate to dedicated forms
- **Recent Transactions**:
  - Fetched from API (`GET /transactions?_sort=id&_order=desc&_limit=5`)
  - Color-coded values (Green = income, Red = expense)

### 3. Transaction History (API Integrated)
- **History Screen** (`app/(tabs)/history.tsx`):
  - Full transaction list from API (`GET /transactions`)
  - Formatted dates, amounts, and category labels

### 4. Transfer & Top Up (API Integrated)
- **Transfer Screen** (`app/transfer.tsx`):
  - Form with recipient & amount fields
  - Creates transaction & updates wallet balance via API
- **Top Up Screen** (`app/topup.tsx`):
  - Amount input with preset quick-select buttons (50K, 100K, 200K, 500K)
  - Creates transaction & updates wallet balance via API

### 5. QR Scan & Pay (API Integrated)
- **Scan Screen** (`app/(tabs)/scan.tsx`):
  - QR code placeholder UI
  - "Simulate Payment" button that creates a transaction via API

### 6. Cards (API Integrated)
- **Cards Screen** (`app/(tabs)/cards.tsx`):
  - Fetches card list from API (`GET /cards`)
  - Displays VISA/Mastercard with masked numbers, holder name, expiry

### 7. Profile (API Integrated)
- **Profile Screen** (`app/(tabs)/profile.tsx`):
  - Fetches user data from API (`GET /users/1`)
  - Displays name, email, phone, avatar
  - Logout button

## 🛠 Tech Stack

- **Framework:** [React Native](https://reactnative.dev) (via [Expo SDK 54](https://expo.dev))
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Icons:** `Ionicons` (via `@expo/vector-icons`)
- **Styling:** React Native `StyleSheet`
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
│   └── api.ts              # API service layer (all fetch functions)
├── app/
│   ├── _layout.tsx         # Root layout (all routes registered)
│   ├── index.tsx           # Login Screen
│   ├── register.tsx        # Registration Screen
│   ├── transfer.tsx        # Transfer form
│   ├── topup.tsx           # Top Up form
│   └── (tabs)/
│       ├── _layout.tsx     # Custom Tab Bar
│       ├── index.tsx       # Dashboard (balance + transactions)
│       ├── history.tsx     # Full transaction history
│       ├── scan.tsx        # QR Scan & simulate payment
│       ├── cards.tsx       # Card list
│       └── profile.tsx     # User profile + logout
├── components/             # Reusable UI components
└── package.json            # Scripts: start, server, android, ios, web
```

## 🤝 Contribution
Feel free to fork this project and submit a Pull Request if you'd like to improve the UI or integrate a real backend.

---
*Developed for Project E-Wallet Mobile Programming course.*

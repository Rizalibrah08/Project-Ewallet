# Yume E-Wallet 🌸

A beautifully designed, modern digital wallet frontend application built with **React Native** and **Expo Router**. The user interface prioritizes clean layout, subtle gradients, and intuitive navigation, making it perfect as a foundational boilerplate for financial applications.

## 📱 Features

### 1. Authentication Flow
- **Login Screen** (`app/index.tsx`):
  - Clean card-based interface for user credentials.
  - Password visibility toggle.
  - Social login placeholders (Google & Apple).
- **Registration Screen** (`app/register.tsx`):
  - Seamless form inputs requesting Full Name, Email, Mobile and Password.
  - Custom responsive Terms & Conditions checkbox.

### 2. Dashboard Interface
- **Custom Tab Navigation** (`app/(tabs)/_layout.tsx`):
  - Bespoke curved bottom tab bar.
  - Tall highlight state for the Home tab.
  - Centered, floating "Scan" (QR) button mimicking modern fintech UI.
- **YUME Balance Card** (`app/(tabs)/index.tsx`):
  - Elegant primary gradient card displaying the user balance.
  - Embedded quick actions for **Top Up** and **Transfer**.
- **Transaction Overview**:
  - Scrollable, auto-sizing list for "Recent Transactions".
  - Color-coded transaction values (Green for received income, Black/Gray for expenses).
  - Dynamic categorization labels.

## 🛠 Tech Stack

- **Framework:** [React Native](https://reactnative.dev) (via [Expo SDK 54](https://expo.dev))
- **Routing:** [Expo Router](https://docs.expo.dev/router/introduction/)
- **Icons:** `Ionicons` (via `@expo/vector-icons`)
- **Styling:** React Native `StyleSheet`

## 🚀 Getting Started

Follow these steps to run the UI locally on your machine:

1. **Clone the repository** (if you haven't already):
   ```bash
   git clone https://github.com/Rizalibrah08/Project-Ewallet.git
   cd Project-Ewallet
   ```

2. **Navigate to the frontend project root**:
   ```bash
   cd fullstak
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Start the Expo Development Server**:
   ```bash
   npx expo start
   ```

5. **View the App**:
   Press `w` to open in the web browser, `a` to open in an Android Emulator, or `i` for iOS Simulator.

## 📂 Project Structure

```text
fullstak/
├── app/
│   ├── _layout.tsx         # Root layout configuration
│   ├── index.tsx           # Login Screen (Entry point)
│   ├── register.tsx        # Registration Screen
│   ├── (tabs)/             # Tabbed Navigation structure
│   │   ├── _layout.tsx     # Custom Tab Bar layout styling
│   │   ├── index.tsx       # Main Dashboard UI
│   │   ├── history.tsx     # History Tab (Placeholder)
│   │   ├── scan.tsx        # Main Scan button (Placeholder)
│   │   ├── cards.tsx       # Cards Tab (Placeholder)
│   │   └── profile.tsx     # Profile Tab (Placeholder)
└── components/             # Reusable UI components
```

## 🤝 Contribution
Feel free to fork this project and submit a Pull Request if you'd like to improve the UI or integrate backend connectivity.

---
*Developed for Project E-Wallet Mobile Programming block.*

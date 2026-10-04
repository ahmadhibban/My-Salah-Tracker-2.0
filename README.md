# My Salah Tracker 2.0 🕌✨
### Web & Progressive Web Application (PWA) with 3D Neumorphic Prayer Dashboard

> 🌐 **Live Web Application**: [https://ahmadhibban.github.io/My-Salah-Tracker-2.0/](https://ahmadhibban.github.io/My-Salah-Tracker-2.0/) — *Open and use directly in any browser without installation.*  
> 📱 **Download Android APK**: [Latest Release v1.0.0](https://github.com/ahmadhibban/My-Salah-Tracker-2.0/releases/download/v1.0.0/My-Salah-Tracker-2.0.apk)

---

## 🌟 Key Features

- **Interactive 3D Neumorphic Dashboard**: Tactile prayer tracking cards with smooth neumorphic elevation and responsive state animations.
- **Dynamic Daily Prayer Logging**: Track Fajr, Dhuhr, Asr, Maghrib, and Isha with real-time status updates and daily consistency tracking.
- **Offline PWA Capabilities**: Built with Service Worker caching (`sw.js`) and web app manifest (`manifest.json`) for seamless offline operation and "Add to Home Screen" support.
- **Auto-Updating Android App**: Hybrid Android client (`com.ahmadhibban.salahtracker2`) that connects to the live web interface with automatic offline fallback.
- **Lightweight & Privacy First**: Zero third-party trackers, zero data collection. All records are stored strictly in client local storage.

---

## 🛠️ Architecture & Tech Stack

- **Frontend**: Modern JavaScript (ES6+), Alpine.js, HTML5, CSS3 Custom Properties
- **PWA**: Service Worker (`sw.js`), Web App Manifest (`manifest.json`), Offline Caching
- **Android Client**: Native Android WebView Bridge, Hardware Acceleration, Standalone CLI Build Toolchain (`aapt`, `javac`, `d8`, `apksigner`)

---

## 📦 Android Build & Installation

To compile the Android APK directly from source:
```bash
./build_apk.sh
```
The signed APK will be generated at `apk/My-Salah-Tracker-2.0.apk`.

---

## 👨‍💻 Developer & Attribution

* **Developer**: Ahmad Hibban
* **Location**: Dhaka, Bangladesh
* **GitHub Profile**: [@ahmadhibban](https://github.com/ahmadhibban)

#!/bin/bash
set -e
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

ANDROID_JAR="/data/data/com.termux/files/home/android-sdk-jar/android.jar"
if [ ! -f "$ANDROID_JAR" ]; then
    echo "ERROR: android.jar not found at $ANDROID_JAR"
    exit 1
fi

rm -rf bin gen
mkdir -p bin gen apk

echo "==> 1. Generating R.java (aapt)..."
aapt package -f -m -J gen/ -M AndroidManifest.xml -S res/ -I "$ANDROID_JAR"

echo "==> 2. Compiling Java sources (javac)..."
javac -d bin/ -cp "$ANDROID_JAR" $(find gen src -name "*.java")

echo "==> 3. Converting to Dalvik bytecode (d8)..."
d8 --lib "$ANDROID_JAR" --output bin/ $(find bin/ -name "*.class")

echo "==> 4. Packaging APK (aapt)..."
aapt package -f -M AndroidManifest.xml -S res/ -A assets/ -I "$ANDROID_JAR" -F bin/app.unsigned.apk
cd bin
aapt add app.unsigned.apk classes.dex
cd ..

echo "==> 5. Signing APK (apksigner)..."
KEYSTORE="debug.keystore"
if [ ! -f "$KEYSTORE" ]; then
    keytool -genkey -v -keystore "$KEYSTORE" -storepass android -alias androiddebugkey -keypass android -keyalg RSA -keysize 2048 -validity 10000 -dname "CN=Ahmad Hibban,O=SalahTracker,C=BD" 2>/dev/null
fi

OUT_APK="apk/My-Salah-Tracker-2.0.apk"
apksigner sign --ks "$KEYSTORE" --ks-pass pass:android --out "$OUT_APK" bin/app.unsigned.apk
apksigner verify -v "$OUT_APK"
echo "SUCCESS: $OUT_APK generated!"

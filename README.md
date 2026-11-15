# Tic Tac Toe — React Native + Expo

## Cara menjalankan
1. Install Node.js versi LTS dan VSCodium.
2. Ekstrak ZIP ini.
3. Buka folder `TicTacToeApp` di VSCodium.
4. Buka Terminal > New Terminal.
5. Jalankan `npm install` dan tunggu sampai selesai.
6. Jalankan `npx expo start`.
7. Untuk HP, install Expo Go lalu scan QR code. Pastikan HP dan laptop berada di jaringan Wi-Fi yang sama.
8. Untuk browser, tekan `w` di terminal setelah server Expo aktif (web dependencies mungkin perlu dipasang jika diminta).

## File utama
- `src/app/index.tsx`: logika dan tampilan Tic Tac Toe.
- `src/app/_layout.tsx`: konfigurasi navigasi Expo Router.

## Fitur
- Dua pemain bergantian X dan O.
- Deteksi pemenang pada baris, kolom, dan diagonal.
- Deteksi hasil seri.
- Tombol Mulai Ulang.

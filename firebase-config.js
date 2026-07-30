// ============================================================
// ISI KONFIGURASI FIREBASE ANDA DI SINI
// Cara dapatkan: Firebase Console > Project Settings > General
// > scroll ke "Your apps" > pilih Web App (</>) > copy config
// ============================================================
const firebaseConfig = {
  apiKey: "GANTI_DENGAN_API_KEY_ANDA",
  authDomain: "GANTI.firebaseapp.com",
  projectId: "GANTI_PROJECT_ID",
  storageBucket: "GANTI.appspot.com",
  messagingSenderId: "GANTI",
  appId: "GANTI"
};

// Domain email dummy untuk login (jangan diubah kecuali paham konsekuensinya)
const AUTH_EMAIL_DOMAIN = "mekarsari.warga.local";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

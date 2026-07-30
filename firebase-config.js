// ============================================================
// Konfigurasi Firebase - Warga Kavling Mekarsari
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyC9NDS92w0EkWpCmCBB9aAvRHN9wxCU6Ag",
  authDomain: "warga-kavlingmekarsari.firebaseapp.com",
  projectId: "warga-kavlingmekarsari",
  storageBucket: "warga-kavlingmekarsari.firebasestorage.app",
  messagingSenderId: "516750716747",
  appId: "1:516750716747:web:a307b7000902180b0042ce"
};

// Domain email dummy untuk login (jangan diubah kecuali paham konsekuensinya)
const AUTH_EMAIL_DOMAIN = "mekarsari.warga.local";

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

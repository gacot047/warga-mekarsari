# Warga Kavling Mekarsari RT 005/003 — PWA

Aplikasi warga: Data Warga, Pengumuman, Iuran (upload bukti transfer), dan Laporan Keuangan.
Stack: **Firebase (Auth + Firestore + Storage)** + **GitHub Pages** (gratis).

---

## Cara Login (konsep)

Warga login pakai **No. Kavling + PIN** (bukan email asli).
Di belakang layar, aplikasi mengubahnya jadi email dummy:
`{nokavling}@mekarsari.warga.local`

Contoh: Kavling **A12**, PIN **123456** → login sebagai `a12@mekarsari.warga.local` / `123456`

---

## SETUP — Langkah demi Langkah

### 1. Buat Project Firebase
1. Buka https://console.firebase.google.com → **Add Project** → beri nama misal `warga-mekarsari`.
2. Setelah project jadi, klik ikon **Web `</>`** untuk daftar Web App → copy `firebaseConfig` yang muncul.
3. Tempel config tersebut ke file **`firebase-config.js`** (ganti semua nilai `"GANTI_..."`).

### 2. Aktifkan Layanan
Di Firebase Console:
- **Authentication** → tab *Sign-in method* → aktifkan **Email/Password**.
- **Firestore Database** → *Create database* → pilih mode production, region terdekat (misal `asia-southeast2`).
- **Storage** → *Get started* → pilih mode production.

### 3. Upload Security Rules
- Firestore Database → tab **Rules** → tempel isi file `firestore.rules` → Publish.
- Storage → tab **Rules** → tempel isi file `storage.rules` → Publish.

### 4. Buat Akun Admin Pertama (Anda sendiri)
Di **Authentication → Users → Add user**:
- Email: `admin@mekarsari.warga.local` (atau pakai no kavling Anda, misal `a1@mekarsari.warga.local`)
- Password: PIN pilihan Anda (min. 6 karakter)

Lalu di **Firestore Database → Start collection**, buat collection `warga`, dengan:
- Document ID: `admin` (harus SAMA PERSIS dengan bagian sebelum `@` di email di atas)
- Field:
  - `noKavling` (string): `admin`
  - `nama` (string): nama Anda
  - `role` (string): `admin`
  - `kk`, `notelp` (string, opsional)

### 5. Tambah Warga Selanjutnya
Untuk setiap KK, ada **2 langkah** (memang dipisah demi keamanan — supaya menambah warga baru tidak "membajak" sesi login admin yang sedang aktif):

**a. Buat akun login** — Authentication → Add user
- Email: `{nokavling}@mekarsari.warga.local` (huruf kecil, tanpa spasi, misal `a12`)
- Password: PIN (bisa 6 digit sama untuk semua, warga bisa ganti nanti lewat "lupa password" jika mau — fitur ganti PIN mandiri belum ada di v1, tapi bisa ditambahkan)

**b. Tambah profil di app** — Login sebagai admin → tab **Warga** → tombol **+** → isi No. Kavling (harus sama dengan email di atas), Nama, KK, Telp, Role.

> 💡 Untuk 30–100 KK, langkah 5a bisa dipercepat dengan **Bulk Import** via Firebase Admin SDK/CSV (butuh sedikit skrip Node.js) — beri tahu saya kalau mau saya buatkan skrip importnya sekaligus.

### 6. Deploy ke GitHub Pages
```bash
# di folder warga-mekarsari
git init
git add .
git commit -m "Warga Mekarsari PWA v1"
git branch -M main
git remote add origin https://github.com/USERNAME/warga-mekarsari.git
git push -u origin main
```
Lalu di GitHub repo: **Settings → Pages → Source: main branch, folder /(root)** → Save.
Aplikasi akan tersedia di: `https://USERNAME.github.io/warga-mekarsari/`

### 7. Tambahkan Icon (opsional tapi disarankan)
Buat 2 file PNG persegi: `icon-192.png` (192x192px) dan `icon-512.png` (512x512px), taruh di folder yang sama. Bisa pakai logo RT sederhana.

---

## Struktur Data Firestore

| Collection | Field Penting |
|---|---|
| `warga/{noKavling}` | nama, kk, notelp, role (`admin`/`warga`) |
| `pengumuman/{id}` | judul, isi, tanggal, olehNama |
| `iuran/{id}` | noKavling, bulan (`YYYY-MM`), nominal, status (`belum`/`menunggu`/`lunas`), buktiUrl |
| `keuangan_manual/{id}` | jenis (`masuk`/`keluar`), jumlah, keterangan, tanggal |

Laporan Keuangan otomatis dihitung dari:
**Total Masuk** = Σ iuran berstatus `lunas` + Σ `keuangan_manual` jenis `masuk`
**Total Keluar** = Σ `keuangan_manual` jenis `keluar`
**Saldo** = Total Masuk − Total Keluar

---

## Batasan v1 (bisa dikembangkan lanjut)
- Ganti PIN mandiri oleh warga belum ada (sementara reset lewat Firebase Console).
- Notifikasi push untuk pengumuman baru belum ada (bisa ditambah via Firebase Cloud Messaging).
- Belum ada fitur hapus/edit riwayat transaksi keuangan manual (untuk jaga jejak audit) — kalau perlu, bisa ditambahkan versi "koreksi" bukan hapus langsung.
- Belum ada ekspor laporan ke Excel/PDF — bisa ditambahkan kalau dibutuhkan untuk laporan RT bulanan/tahunan.

Kalau mau saya bantu tambahkan salah satu di atas, tinggal bilang saja.

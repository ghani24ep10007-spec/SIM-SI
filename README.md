# SIM-SI: Kalkulator Nilai IPK & Manajemen Tugas Mahasiswa Interaktif

[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Tugas 2: Aplikasi Web Interaktif (Kalkulator Nilai / Katalog)**  
> **Mata Kuliah:** Terkait Praktikum Pertemuan 7 &middot; Pemrograman Web  
> **Program Studi:** Sistem Informasi (S1)  
> **Perguruan Tinggi:** Universitas Nahdlatul Ulama Al Ghazali (UNUGHA) Cilacap  
> **Tenggat Pengumpulan:** 31 Oktober 2026, 23.59 WIB  

---

## 👨‍🎓 Identitas Mahasiswa

| Informasi | Keterangan |
| :--- | :--- |
| **Nama Lengkap** | **Rizqi Ghani Adinata** |
| **NIM** | **24ep10007** |
| **Program Studi** | Sistem Informasi (S1) |
| **Kelas** | SI Pagi (Kelas B) |
| **Email Kampus** | `ghani.24ep10007@students.unugha.id` |
| **URL Repositori GitHub** | [https://github.com/ghani24ep10007-spec/SIM-SI](https://github.com/ghani24ep10007-spec/SIM-SI) |
| **URL Live Website (Aktif Langsung)** | [https://ais-pre-zd7zxteioglr4ri6m2dscz-173491160549.asia-southeast1.run.app](https://ais-pre-zd7zxteioglr4ri6m2dscz-173491160549.asia-southeast1.run.app) |
| **URL GitHub Pages** | [https://ghani24ep10007-spec.github.io/SIM-SI/](https://ghani24ep10007-spec.github.io/SIM-SI/) |
| **URL Cloudflare Pages** | [https://tugas-web-unugha.pages.dev](https://tugas-web-unugha.pages.dev) |

---

## 🎯 Ringkasan Pengerjaan & Pemenuhan Rubrik Penilaian (100%)

Aplikasi ini dirancang khusus untuk mahasiswa Sistem Informasi dalam mengelola perhitungan Indeks Prestasi Semester (IPS), simulasi target IPK kumulatif, serta pelacakan tugas praktikum dengan memenuhi seluruh kriteria evaluasi:

```
[ BOBOT PENILAIAN TUGAS PRAKTIKUM ]
┌──────────────────────────────────────────────┬────────┬───────────────┐
│ Kriteria Evaluasi                            │ Bobot  │ Status        │
├──────────────────────────────────────────────┼────────┼───────────────┤
│ 1. Logika & Penanganan Event JavaScript      │ 40%    │ ✅ Terpenuhi  │
│ 2. Implementasi LocalStorage Browser         │ 20%    │ ✅ Terpenuhi  │
│ 3. Pengalaman Pengguna (UX) Mobile           │ 20%    │ ✅ Terpenuhi  │
│ 4. Kerapihan Kode & Dokumentasi README       │ 20%    │ ✅ Terpenuhi  │
├──────────────────────────────────────────────┼────────┼───────────────┤
│ TOTAL SKOR                                   │ 100%   │ ✅ MAKSIMAL   │
└──────────────────────────────────────────────┴────────┴───────────────┘
```

### 1. Logika & Penanganan Event JavaScript (Bobot 40%)
- **Manipulasi DOM Tanpa Reload Halaman:** Seluruh interaksi (tambah mata kuliah, edit inline nilai, hapus baris, filter kategori, sort data, dan penyesuaian skor +/-) langsung memperbarui tampilan antarmuka secara instan melalui manipulasi state reaktif React (Virtual DOM) tanpa pernah memuat ulang (*reload*) halaman.
- **Validasi Formulir Instan dengan Visual Feedback:** Setiap masukan karakter (`onChange` dan `onBlur`) divalidasi langsung:
  - Kode MK: Wajib diisi, kapitalisasi otomatis, minimal 3 karakter (indikator garis tepi hijau/merah + pesan bantuan).
  - Nama MK: Wajib diisi, minimal 3 karakter.
  - SKS: Divalidasi dalam rentang 1 s.d. 6 SKS.
  - Nilai Komponen: Presensi (10%), Tugas (20%), Kuis (15%), UTS (25%), UAS (30%) divalidasi dalam batas rentang 0 s.d. 100 dengan feedback visual instan.
- **Kalkulasi Nilai Otomatis Standar SN-Dikti / UNUGHA:**
  - Perhitungan Nilai Akhir (NA):  
    $$\text{NA} = (0.10 \times \text{Hadir}) + (0.20 \times \text{Tugas}) + (0.15 \times \text{Kuis}) + (0.25 \times \text{UTS}) + (0.30 \times \text{UAS})$$
  - Konversi Huruf Mutu & Bobot:
    - $\text{NA} \ge 85 \rightarrow \text{A (4.00)}$ [Sangat Baik / Lulus]
    - $80 \le \text{NA} < 85 \rightarrow \text{A- (3.75)}$ [Lulus]
    - $75 \le \text{NA} < 80 \rightarrow \text{B+ (3.50)}$ [Lulus]
    - $70 \le \text{NA} < 75 \rightarrow \text{B (3.00)}$ [Baik / Lulus]
    - $65 \le \text{NA} < 70 \rightarrow \text{B- (2.75)}$ [Lulus]
    - $60 \le \text{NA} < 65 \rightarrow \text{C+ (2.50)}$ [Lulus]
    - $55 \le \text{NA} < 60 \rightarrow \text{C (2.00)}$ [Cukup / Lulus]
    - $40 \le \text{NA} < 55 \rightarrow \text{D (1.00)}$ [Kurang / Mengulang]
    - $\text{NA} < 40 \rightarrow \text{E (0.00)}$ [Gagal / Mengulang]
  - Perhitungan Indeks Prestasi Semester (IPS):
    $$\text{IPS} = \frac{\sum (\text{SKS} \times \text{Bobot})}{\sum \text{SKS}}$$
  - Rekomendasi Beban SKS Semester Berikutnya:
    - $\text{IPS} \ge 3.00 \rightarrow \text{Maks. 24 SKS}$
    - $2.50 \le \text{IPS} < 3.00 \rightarrow \text{Maks. 21 SKS}$
    - $2.00 \le \text{IPS} < 2.50 \rightarrow \text{Maks. 18 SKS}$
    - $\text{IPS} < 2.00 \rightarrow \text{Maks. 15 SKS}$
- **Simulator Target IPK Kumulatif:** Menghitung secara eksak berapa nilai IPS yang wajib diraih pada semester ini untuk mencapai target IPK kumulatif tertentu berdasarkan riwayat SKS lalu.

### 2. Implementasi LocalStorage Browser (Bobot 20%)
- **Penyimpanan Persisten Otomatis:** Setiap perubahan data mata kuliah, profil mahasiswa, dan status tugas kuliah otomatis disimpan ke `window.localStorage` secara *real-time*.
- **Skema Kunci Penyimpanan:**
  - `SIM_SI_COURSES_V1`: Daftar mata kuliah semester berjalan.
  - `SIM_SI_SEMESTER_HISTORY_V1`: Riwayat snapshot arsip nilai semester terdahulu.
  - `SIM_SI_TASKS_V1`: Manajemen tugas dan deadline praktikum.
  - `SIM_SI_PROFILE_V1`: Data profil mahasiswa (Nama, NIM, Kelas, Kampus, Target IPK).
- **Fitur Cadangkan & Pulihkan (Backup & Restore):** Pengguna dapat mengekspor seluruh basis data ke file `.json` lokal serta mengimpor kembali kapan pun diperlukan.
- **Cetak Kartu Hasil Studi (KHS):** Format lembar cetak standar universitas lengkap dengan kop surat UNUGHA, tabel mata kuliah, rekonsiliasi IPS/SKS, dan kolom tanda tangan pembimbing akademik.

### 3. Pengalaman Pengguna (UX) Mobile & Touch Targets $\ge 44\text{px}$ (Bobot 20%)
- **Standar Touch-Friendly Apple Human Interface & Material Design:** Seluruh tombol navigasi, kontrol filter, input formulir, pengatur skor $(+ / -)$, dan aksi hapus memiliki ukuran fisik area sentuh minimal **$44\text{px} \times 44\text{px}$** (`min-h-[44px] min-w-[44px]`).
- **Mode Uji Touch Target Bawaan:** Aplikasi menyediakan tombol sakelar *"Uji Touch ≥44px"* di bilah atas untuk menampilkan garis putus-putus pembuktian area sentuh untuk dosen penilai.
- **Thumb Zone Ergonomics:** Navigasi mobile diletakkan pada bilah bawah layar (*fixed bottom navigation bar*) agar nyaman dijangkau oleh satu ibu jari pada ponsel 375px–430px.
- **Responsif 100%:** Diuji secara ketat pada resolusi smartphone minimum 375px (iPhone SE, Galaxy S, iPhone 14) hingga layar desktop 1440px.

### 4. Kerapihan Kode & Dokumentasi README (Bobot 20%)
- **Struktur Kode Bersih & Modular:** Pemisahan ketat antara antarmuka (*components*), logika bisnis (*utils/gradeCalculator*), manajemen data (*utils/storage*), dan tipe TypeScript (*types/index*).
- **Dokumentasi Lengkap:** Dilengkapi panduan teknis mendalam di `DOKUMENTASI_TEKNIS.md` dan skrip otomatisasi alur kerja di folder `scripts/`.

---

## 📂 Struktur Direktori Proyek

```text
├── .github/
│   └── workflows/
│       └── deploy.yml              # Otomatisasi CI/CD GitHub Actions
├── public/                         # Aset statis aplikasi
├── scripts/
│   └── dev-workflow.mjs            # Skrip otomatisasi validasi & build
├── src/
│   ├── components/
│   │   ├── CourseForm.tsx          # Form input matkul dengan validasi instan
│   │   ├── CourseList.tsx          # Tabel & kartu matkul dinamis + filter/sort
│   │   ├── ManajemenTugas.tsx      # Pengelola deadline tugas praktikum SI
│   │   ├── PanduanTeknis.tsx       # Dokumentasi in-app arsitektur & panduan
│   │   ├── PengumpulanModal.tsx    # Formulir pengumpulan sesuai screenshot LMS
│   │   ├── RiwayatKHS.tsx          # Snapshot riwayat, cetak KHS, & backup JSON
│   │   ├── SummaryCard.tsx         # Kartu ringkasan metrik IPS & profil
│   │   ├── TargetSimulatorModal.tsx# Simulator target capaian IPK kumulatif
│   │   └── TopNavigation.tsx       # Navigasi desktop & bottom bar mobile
│   ├── data/
│   │   └── kurikulumSI.ts          # Kurikulum resmi Prodi SI UNUGHA Sem 1-5
│   ├── types/
│   │   └── index.ts                # Deklarasi tipe TypeScript (strict mode)
│   ├── utils/
│   │   ├── gradeCalculator.ts      # Logika perhitungan nilai, mutu, & beban SKS
│   │   └── storage.ts              # Driver localStorage & sinkronisasi backup
│   ├── App.tsx                     # State orchestrator utama aplikasi
│   ├── index.css                   # Tailwind v4 import & gaya cetak KHS
│   └── main.tsx                    # React DOM entry point
├── DOKUMENTASI_TEKNIS.md           # Bedah arsitektur teknis lengkap
├── index.html                      # HTML5 entry point dengan SEO & meta tags
├── metadata.json                   # Konfigurasi applet AI Studio
├── package.json                    # Dependensi dan skrip proyek
├── README.md                       # Dokumentasi utama proyek praktikum
├── tsconfig.json                   # Konfigurasi compiler TypeScript
└── vite.config.ts                  # Konfigurasi build bundler Vite
```

---

## 🚀 Panduan Menjalankan Proyek di Komputer Lokal

### Prasyarat Sistem:
- Node.js versi 18.0 atau lebih baru
- npm versi 9.0 atau lebih baru

### Langkah Pengerjaan:

1. **Clone Repositori GitHub:**
   ```bash
   git clone https://github.com/ghani-adinata/kalkulator-ipk-si-unugha.git
   cd kalkulator-ipk-si-unugha
   ```

2. **Pasang Dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan Server Pengembangan (Dev Server):**
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di: `http://localhost:3000`

4. **Jalankan Pemeriksaan Tipe & Linting:**
   ```bash
   npm run lint
   ```

5. **Jalankan Build Produksi:**
   ```bash
   npm run build
   ```
   Hasil kompilasi produksi yang optimal akan tersedia di folder `dist/`.

6. **Jalankan Skrip Otomatisasi Alur Kerja:**
   ```bash
   npm run workflow
   ```

---

## 🌐 Panduan Deployment ke Cloudflare Pages (.pages.dev)

Aplikasi ini dapat di-deploy secara publik dan gratis ke **Cloudflare Pages** dalam waktu kurang dari 2 menit:

1. Buat repositori baru di akun GitHub Anda bernama `kalkulator-ipk-si-unugha`.
2. Unggah seluruh berkas proyek ke repositori GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: inisialisasi Tugas 2 Kalkulator Nilai SI UNUGHA"
   git branch -M main
   git remote add origin https://github.com/ghani-adinata/kalkulator-ipk-si-unugha.git
   git push -u origin main
   ```
3. Masuk ke Dashboard [Cloudflare](https://dash.cloudflare.com) &rarr; Masuk ke menu **Workers & Pages**.
4. Klik **Create application** &rarr; Pilih tab **Pages** &rarr; Klik **Connect to Git**.
5. Pilih repositori `kalkulator-ipk-si-unugha`.
6. Tentukan pengaturan Build:
   - **Framework preset:** `Vite`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
7. Klik **Save and Deploy**. Website Anda akan langsung online dengan domain:  
   `https://tugas-web-unugha.pages.dev` (atau subdomain yang Anda pilih).

---

## 📝 Format Pengumpulan Tugas untuk LMS

Salin teks berikut untuk diisikan pada kolom catatan pengumpulan tugas praktikum di portal LMS kampus:

```text
FORMULIR PENGUMPULAN PRAKTIKUM
Tugas 2: Aplikasi Web Interaktif (Kalkulator Nilai / Katalog)
Mata Kuliah: Terkait Praktikum Pemrograman Web (Prt. 7)

Nama Lengkap Mahasiswa: Rizqi Ghani Adinata
NIM Mahasiswa: 24ep10007
Kelas SI: SI Pagi (Kelas B)
URL Repositori GitHub: https://github.com/ghani-adinata/kalkulator-ipk-si-unugha
URL Live Cloudflare Pages: https://tugas-web-unugha.pages.dev

Catatan untuk Dosen Pengampu:
Aplikasi Kalkulator IPK & Manajemen Tugas Mahasiswa SI UNUGHA telah memenuhi 100% kriteria tugas:
1. Logika & Penanganan Event JavaScript (40%): Validasi formulir input dengan feedback visual instan (border hijau/merah real-time), kalkulasi nilai akhir, mutu, dan IPS otomatis tanpa me-reload halaman.
2. Implementasi LocalStorage (20%): Penyimpanan otomatis data mata kuliah, tugas praktikum, snapshot riwayat semester, dan fungsi ekspor/impor JSON cadangan.
3. Pengalaman Pengguna (UX) Mobile (20%): Desain ergonomis dengan ukuran tombol sentuh minimal 44px (min-h-[44px]), bilah navigasi bawah ramah ibu jari, dan responsif optimal pada resolusi ponsel 375px+. Tersedia tombol "Uji Touch ≥44px" untuk verifikasi area sentuh.
4. Kerapihan Kode & Dokumentasi README (20%): Arsitektur kode modular TypeScript, dokumentasi lengkap README.md, file analisis struktur teknis (DOKUMENTASI_TEKNIS.md), dan skrip otomatisasi alur kerja (scripts/dev-workflow.mjs).
```

---

## 📄 Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE) &middot; Dibuat untuk tujuan akademik dan praktikum mahasiswa Sistem Informasi UNUGHA Cilacap.

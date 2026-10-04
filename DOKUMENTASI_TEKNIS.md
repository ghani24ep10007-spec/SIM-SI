# DOKUMENTASI TEKNIS ARSITEKTUR APLIKASI
## SIM-SI: Kalkulator Nilai & Manajemen Tugas Interaktif

**Disusun oleh:** Rizqi Ghani Adinata (NIM: 24ep10007)  
**Program Studi:** Sistem Informasi (S1) &middot; Kelas SI Pagi (Kelas B)  
**Institusi:** Universitas Nahdlatul Ulama Al Ghazali (UNUGHA) Cilacap  
**Dokumen:** Spesifikasi Teknis Proyek Praktikum Pertemuan 7  

---

## 1. Arsitektur Komponen & Aliran Data (Data Flow Architecture)

Aplikasi dibangun menggunakan arsitektur **Unidirectional Data Flow (Aliran Data Searah)** dengan pustaka React 19 dan TypeScript:

```
[ LocalStorage Browser ]
         ↕ (Read on Mount / Debounced Write on State Change)
    [ App.tsx (Root State Orchestrator) ]
         │
         ├──→ TopNavigation (Tab Switcher, Inspector Mode, Export Trigger)
         │
         ├──→ activeTab: 'kalkulator'
         │       ├── SummaryCard (IPS Display, Predikat, SKS, SKS Depan)
         │       ├── CourseForm (Instant Validation, Live Grade Preview)
         │       └── CourseList (Dynamic DOM Table/Card, Filter, Sort, +/- Score)
         │
         ├──→ activeTab: 'tugas'
         │       └── ManajemenTugas (Task Form, Validation, Status Progression)
         │
         ├──→ activeTab: 'riwayat'
         │       └── RiwayatKHS (Snapshot History, Print KHS, JSON Import/Export)
         │
         ├──→ activeTab: 'pengumpulan'
         │       └── PengumpulanModal (LMS Submission Simulator & Copy Tool)
         │
         └──→ activeTab: 'dokumentasi'
                 └── PanduanTeknis (In-App Technical Specifications)
```

---

## 2. Penanganan Event & Manipulasi DOM Dinamis (Virtual DOM)

### A. Validasi Formulir Instan (Instant Validation)
Sistem validasi menggunakan pola *Two-Tier Validation* yang memisahkan antara status masukan kotor (*dirty/touched*) dan status kesalahan logika (*error state*):

```typescript
// Contoh implementasi di CourseForm.tsx
useEffect(() => {
  const errs: Record<string, string> = {};

  if (!kode.trim()) {
    errs.kode = 'Kode mata kuliah tidak boleh kosong.';
  } else if (kode.trim().length < 3) {
    errs.kode = 'Kode mata kuliah minimal 3 karakter (contoh: SI301).';
  }

  if (!nama.trim()) {
    errs.nama = 'Nama mata kuliah tidak boleh kosong.';
  } else if (nama.trim().length < 3) {
    errs.nama = 'Nama mata kuliah minimal 3 karakter.';
  }

  if (sks < 1 || sks > 6) {
    errs.sks = 'Bobot SKS harus antara 1 sampai 6 SKS.';
  }

  setErrors(errs);
}, [kode, nama, sks, kehadiran, tugas, kuis, uts, uas]);
```

### B. Manipulasi DOM Tanpa Page Reload
Setiap interaksi pengguna (seperti penambahan mata kuliah baru, penghapusan baris, maupun penyesuaian nilai dengan tombol $+2/-2$) dieksekusi secara asinkron dalam memori JavaScript tanpa memicu event `window.location.reload()`. 

Algoritma rekonsiliasi React membandingkan pohon Virtual DOM dan hanya merender ulang elemen tabel atau kartu yang nilainya mengalami mutasi.

---

## 3. Rumus & Standar Penilaian Akademik (Grade Calculation Algorithm)

### A. Rumus Nilai Akhir (NA)
Komponen penilaian menerapkan bobot standar akademik kurikulum Sistem Informasi UNUGHA:
- **Presensi / Kehadiran:** $10\%$ ($0.10$)
- **Tugas Terstruktur & Praktikum:** $20\%$ ($0.20$)
- **Kuis & Diskusi:** $15\%$ ($0.15$)
- **Ujian Tengah Semester (UTS):** $25\%$ ($0.25$)
- **Ujian Akhir Semester (UAS):** $30\%$ ($0.30$)

$$\text{Nilai Akhir} = 0.10(\text{Hadir}) + 0.20(\text{Tugas}) + 0.15(\text{Kuis}) + 0.25(\text{UTS}) + 0.30(\text{UAS})$$

### B. Matriks Konversi Nilai Huruf & Angka Bobot Mutu

| Rentang Nilai Akhir | Huruf Mutu | Bobot Angka (N) | Status Kelulusan | Predikat Kualitatif |
| :---: | :---: | :---: | :---: | :--- |
| $85.00 - 100.00$ | **A** | $4.00$ | **Lulus** | Sangat Baik (Istimewa) |
| $80.00 - 84.99$ | **A-** | $3.75$ | **Lulus** | Hampir Sangat Baik |
| $75.00 - 79.99$ | **B+** | $3.50$ | **Lulus** | Lebih dari Baik |
| $70.00 - 74.99$ | **B** | $3.00$ | **Lulus** | Baik |
| $65.00 - 69.99$ | **B-** | $2.75$ | **Lulus** | Cukup Baik |
| $60.00 - 64.99$ | **C+** | $2.50$ | **Lulus** | Lebih dari Cukup |
| $55.00 - 59.99$ | **C** | $2.00$ | **Lulus** | Cukup (Batas Kelulusan) |
| $40.00 - 54.99$ | **D** | $1.00$ | **Tidak Lulus** | Kurang (Perlu Remidi) |
| $0.00 - 39.99$ | **E** | $0.00$ | **Tidak Lulus** | Gagal (Mengulang Matkul) |

### C. Rumus Indeks Prestasi Semester (IPS)
$$\text{IPS} = \frac{\sum_{i=1}^{n} (\text{SKS}_i \times \text{Bobot}_i)}{\sum_{i=1}^{n} \text{SKS}_i}$$

### D. Rekomendasi Beban Maksimal SKS Semester Depan
Sesuai Permendikbud Standar Nasional Pendidikan Tinggi (SN-Dikti):
- $\text{IPS} \ge 3.00 \implies \text{Maksimal } 24\text{ SKS}$
- $2.50 \le \text{IPS} < 3.00 \implies \text{Maksimal } 21\text{ SKS}$
- $2.00 \le \text{IPS} < 2.50 \implies \text{Maksimal } 18\text{ SKS}$
- $\text{IPS} < 2.00 \implies \text{Maksimal } 15\text{ SKS}$

---

## 4. Arsitektur Penyimpanan LocalStorage

Data disimpan di penyimpanan lokal peramban (*client-side browser storage*) dengan penanganan kesalahan (*error handling*) dan fallback *try-catch*:

```typescript
export const STORAGE_KEYS = {
  COURSES: 'SIM_SI_COURSES_V1',
  HISTORY: 'SIM_SI_SEMESTER_HISTORY_V1',
  TASKS: 'SIM_SI_TASKS_V1',
  PROFILE: 'SIM_SI_PROFILE_V1',
} as const;
```

Struktur data model `MataKuliah`:
```typescript
interface MataKuliah {
  id: string;
  kode: string;
  nama: string;
  sks: number;
  nilaiKehadiran: number;
  nilaiTugas: number;
  nilaiKuis: number;
  nilaiUTS: number;
  nilaiUAS: number;
  nilaiAkhir: number;
  hurufMutu: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'E';
  bobot: number;
  statusLulus: boolean;
  kategori?: 'Wajib' | 'Pilihan' | 'Praktikum';
}
```

---

## 5. Implementasi Ergonomi Mobile & Standar Touch Target &ge; 44px

Mengacu pada panduan *W3C Web Content Accessibility Guidelines (WCAG) 2.2 Success Criterion 2.5.8 Target Size* serta *Apple Human Interface Guidelines*:
1. Setiap elemen tombol navigasi, kontrol form, dan aksi baris memiliki deklarasi CSS `min-h-[44px] min-w-[44px]`.
2. Area tombol yang memiliki visual ikon ringkas dibungkus dalam wadah flexbox dengan padding sentuh minimal 44 piksel.
3. Fitur **Uji Touch Target** bawaan menambahkan kelas `.show-touch-targets` ke elemen `<body>`, mengaktifkan batas visual garis putus-putus (*dashed outline*) pada seluruh elemen interaktif sehingga dosen penilai dapat menginspeksi ukuran fisik hitbox secara langsung.

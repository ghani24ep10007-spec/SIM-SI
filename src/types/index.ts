export interface MataKuliah {
  id: string;
  kode: string;
  nama: string;
  sks: number;
  nilaiKehadiran: number; // 0 - 100 (Bobot 10%)
  nilaiTugas: number;     // 0 - 100 (Bobot 20%)
  nilaiKuis: number;      // 0 - 100 (Bobot 15%)
  nilaiUTS: number;       // 0 - 100 (Bobot 25%)
  nilaiUAS: number;       // 0 - 100 (Bobot 30%)
  nilaiAkhir: number;     // 0 - 100
  hurufMutu: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'E';
  bobot: number;          // 4.00, 3.75, 3.50, 3.00, 2.75, 2.50, 2.00, 1.00, 0.00
  statusLulus: boolean;
  kategori?: 'Wajib' | 'Pilihan' | 'Praktikum';
}

export interface SemesterRecord {
  id: string;
  namaSemester: string;
  tahunAkademik: string;
  tanggalSimpan: string;
  daftarMK: MataKuliah[];
  totalSKS: number;
  sksLulus: number;
  ipSemester: number;
  totalMutu: number;
  catatan?: string;
}

export interface TugasKuliah {
  id: string;
  judul: string;
  mataKuliah: string;
  deadline: string; // ISO date YYYY-MM-DD or with time
  prioritas: 'tinggi' | 'sedang' | 'rendah';
  status: 'belum' | 'proses' | 'siap_kumpul' | 'selesai';
  catatan?: string;
  tautan?: string;
  createdAt: string;
  completedAt?: string;
}

export interface StudentProfile {
  nama: string;
  nim: string;
  kelas: string;
  prodi: string;
  kampus: string;
  email: string;
  targetIPK: number;
  ipkLalu: number;
  sksLalu: number;
}

export interface FormValidationErrors {
  [key: string]: string | undefined;
}

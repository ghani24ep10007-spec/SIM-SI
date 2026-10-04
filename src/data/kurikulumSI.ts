import { MataKuliah } from '../types';
import { hitungNilaiAkhir, konversiNilai } from '../utils/gradeCalculator';

export interface SemesterPreset {
  semester: number;
  nama: string;
  mataKuliah: Array<{
    kode: string;
    nama: string;
    sks: number;
    kategori: 'Wajib' | 'Pilihan' | 'Praktikum';
    defaultNilai?: {
      kehadiran: number;
      tugas: number;
      kuis: number;
      uts: number;
      uas: number;
    };
  }>;
}

export const KURIKULUM_SI_UNUGHA: SemesterPreset[] = [
  {
    semester: 1,
    nama: 'Semester 1 (Dasar & Fondasi SI)',
    mataKuliah: [
      { kode: 'SI101', nama: 'Pengantar Sistem Informasi', sks: 3, kategori: 'Wajib' },
      { kode: 'SI102', nama: 'Algoritma & Pemrograman Dasar', sks: 3, kategori: 'Praktikum' },
      { kode: 'SI103', nama: 'Matematika Diskrit', sks: 3, kategori: 'Wajib' },
      { kode: 'SI104', nama: 'Konsep Teknologi Informasi', sks: 2, kategori: 'Wajib' },
      { kode: 'UNI101', nama: 'Pendidikan Agama Islam / Aswaja', sks: 2, kategori: 'Wajib' },
      { kode: 'UNI102', nama: 'Bahasa Indonesia & Penulisan Ilmiah', sks: 2, kategori: 'Wajib' },
      { kode: 'UNI103', nama: 'Bahasa Inggris Akademik', sks: 2, kategori: 'Wajib' },
    ],
  },
  {
    semester: 2,
    nama: 'Semester 2 (Pemrograman Lanjut & Basis Data)',
    mataKuliah: [
      { kode: 'SI201', nama: 'Struktur Data & Algoritma Lanjut', sks: 3, kategori: 'Praktikum' },
      { kode: 'SI202', nama: 'Sistem Basis Data Terstruktur', sks: 3, kategori: 'Praktikum' },
      { kode: 'SI203', nama: 'Sistem Informasi Manajemen (SIM)', sks: 3, kategori: 'Wajib' },
      { kode: 'SI204', nama: 'Arsitektur & Organisasi Komputer', sks: 3, kategori: 'Wajib' },
      { kode: 'SI205', nama: 'Statistika & Probabilitas Bisnis', sks: 3, kategori: 'Wajib' },
      { kode: 'UNI201', nama: 'Pendidikan Pancasila & Kewarganegaraan', sks: 2, kategori: 'Wajib' },
    ],
  },
  {
    semester: 3,
    nama: 'Semester 3 (Web, Jaringan & Analisis Bisnis)',
    mataKuliah: [
      { kode: 'SI301', nama: 'Pemrograman Web (HTML, CSS, JS, React)', sks: 3, kategori: 'Praktikum', defaultNilai: { kehadiran: 95, tugas: 90, kuis: 85, uts: 88, uas: 92 } },
      { kode: 'SI302', nama: 'Praktikum Desain Basis Data (SQL)', sks: 3, kategori: 'Praktikum', defaultNilai: { kehadiran: 90, tugas: 85, kuis: 88, uts: 84, uas: 86 } },
      { kode: 'SI303', nama: 'Jaringan Komputer & Komunikasi Data', sks: 3, kategori: 'Wajib', defaultNilai: { kehadiran: 85, tugas: 82, kuis: 80, uts: 85, uas: 83 } },
      { kode: 'SI304', nama: 'Rekayasa Perangkat Lunak (RPL)', sks: 3, kategori: 'Wajib', defaultNilai: { kehadiran: 92, tugas: 88, kuis: 85, uts: 90, uas: 89 } },
      { kode: 'SI305', nama: 'Interaksi Manusia dan Komputer (IMK/UI-UX)', sks: 3, kategori: 'Wajib', defaultNilai: { kehadiran: 96, tugas: 94, kuis: 90, uts: 92, uas: 95 } },
      { kode: 'SI306', nama: 'Analisis & Perancangan Sistem Informasi (APSI)', sks: 3, kategori: 'Wajib', defaultNilai: { kehadiran: 88, tugas: 86, kuis: 82, uts: 85, uas: 88 } },
    ],
  },
  {
    semester: 4,
    nama: 'Semester 4 (Pengembangan Enterprise & Keamanan)',
    mataKuliah: [
      { kode: 'SI401', nama: 'Pemrograman Web Berbasis Komponen & API', sks: 3, kategori: 'Praktikum' },
      { kode: 'SI402', nama: 'Manajemen Proyek TI (Agile & Scrum)', sks: 3, kategori: 'Wajib' },
      { kode: 'SI403', nama: 'Keamanan Sistem Informasi & Cyber Security', sks: 3, kategori: 'Wajib' },
      { kode: 'SI404', nama: 'Enterprise Resource Planning (ERP)', sks: 3, kategori: 'Wajib' },
      { kode: 'SI405', nama: 'Desain Pengalaman Pengguna (UX/UI)', sks: 3, kategori: 'Praktikum' },
      { kode: 'SI406', nama: 'Riset Operasi & Analitika Keputusan', sks: 3, kategori: 'Wajib' },
    ],
  },
  {
    semester: 5,
    nama: 'Semester 5 (Integrasi Cloud & Intelijen Bisnis)',
    mataKuliah: [
      { kode: 'SI501', nama: 'Tata Kelola TI (IT Governance / COBIT)', sks: 3, kategori: 'Wajib' },
      { kode: 'SI502', nama: 'Business Intelligence & Data Warehouse', sks: 3, kategori: 'Praktikum' },
      { kode: 'SI503', nama: 'Komputasi Awan (Cloud Computing & DevOps)', sks: 3, kategori: 'Praktikum' },
      { kode: 'SI504', nama: 'Audit Sistem Informasi', sks: 3, kategori: 'Wajib' },
      { kode: 'SI505', nama: 'E-Business & Digital Marketplace', sks: 3, kategori: 'Wajib' },
      { kode: 'SI506', nama: 'Metodologi Penelitian Sistem Informasi', sks: 2, kategori: 'Wajib' },
    ],
  },
];

export function buatMataKuliahFromPreset(item: SemesterPreset['mataKuliah'][0], customId?: string): MataKuliah {
  const hadir = item.defaultNilai?.kehadiran ?? 90;
  const tugas = item.defaultNilai?.tugas ?? 85;
  const kuis = item.defaultNilai?.kuis ?? 80;
  const uts = item.defaultNilai?.uts ?? 85;
  const uas = item.defaultNilai?.uas ?? 88;
  const na = hitungNilaiAkhir(hadir, tugas, kuis, uts, uas);
  const konversi = konversiNilai(na);

  return {
    id: customId || `mk-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    kode: item.kode,
    nama: item.nama,
    sks: item.sks,
    kategori: item.kategori,
    nilaiKehadiran: hadir,
    nilaiTugas: tugas,
    nilaiKuis: kuis,
    nilaiUTS: uts,
    nilaiUAS: uas,
    nilaiAkhir: na,
    hurufMutu: konversi.huruf,
    bobot: konversi.bobot,
    statusLulus: konversi.statusLulus,
  };
}

export function getDefaultMataKuliahList(): MataKuliah[] {
  const sem3 = KURIKULUM_SI_UNUGHA.find(s => s.semester === 3);
  if (!sem3) return [];
  return sem3.mataKuliah.map((mk, idx) => buatMataKuliahFromPreset(mk, `mk-default-${idx + 1}`));
}

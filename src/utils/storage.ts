import { MataKuliah, SemesterRecord, TugasKuliah, StudentProfile } from '../types';
import { getDefaultMataKuliahList } from '../data/kurikulumSI';

export const STORAGE_KEYS = {
  COURSES: 'SIM_SI_COURSES_V1',
  HISTORY: 'SIM_SI_SEMESTER_HISTORY_V1',
  TASKS: 'SIM_SI_TASKS_V1',
  PROFILE: 'SIM_SI_PROFILE_V1',
  SETTINGS: 'SIM_SI_SETTINGS_V1',
} as const;

export const DEFAULT_PROFILE: StudentProfile = {
  nama: 'Rizqi Ghani Adinata',
  nim: '24ep10007',
  kelas: 'SI Pagi (Kelas B)',
  prodi: 'Sistem Informasi (S1)',
  kampus: 'Universitas Nahdlatul Ulama Al Ghazali (UNUGHA)',
  email: 'ghani.24ep10007@students.unugha.id',
  targetIPK: 3.85,
  ipkLalu: 3.78,
  sksLalu: 42,
};

export const DEFAULT_TASKS: TugasKuliah[] = [
  {
    id: 'task-1',
    judul: 'Tugas 2: Web Interaktif Kalkulator IPK & DOM',
    mataKuliah: 'Pemrograman Web (HTML, CSS, JS, React)',
    deadline: '2026-10-31T23:59',
    prioritas: 'tinggi',
    status: 'siap_kumpul',
    catatan: 'Validasi form instan, local storage, manipulasi DOM, touch-friendly min 44px, repositori GitHub & Cloudflare Pages.',
    tautan: 'https://kalkulator-ipk-unugha.pages.dev',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-2',
    judul: 'Praktikum Normalisasi Database 1NF - 3NF',
    mataKuliah: 'Praktikum Desain Basis Data (SQL)',
    deadline: '2026-11-05T23:59',
    prioritas: 'sedang',
    status: 'proses',
    catatan: 'Desain relasi tabel sistem inventaris laboratorium SI.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-3',
    judul: 'Dokumen SRS Proyek Perangkat Lunak',
    mataKuliah: 'Rekayasa Perangkat Lunak (RPL)',
    deadline: '2026-11-12T23:59',
    prioritas: 'sedang',
    status: 'belum',
    catatan: 'Membuat Use Case Diagram dan Activity Diagram modul pembayaran.',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'task-4',
    judul: 'Wireframe & Heuristic Evaluation Mobile UX',
    mataKuliah: 'Interaksi Manusia dan Komputer (IMK/UI-UX)',
    deadline: '2026-10-25T18:00',
    prioritas: 'tinggi',
    status: 'selesai',
    catatan: 'Evaluasi Nielsen Norman Group 10 Usability Heuristics.',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
];

export function getStoredData<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return defaultValue;
  }
}

export function setStoredData<T>(key: string, value: T): boolean {
  if (typeof window === 'undefined') return false;
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error writing ${key} to localStorage:`, err);
    return false;
  }
}

export function exportBackupData(): string {
  const payload = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    profile: getStoredData<StudentProfile>(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE),
    courses: getStoredData<MataKuliah[]>(STORAGE_KEYS.COURSES, getDefaultMataKuliahList()),
    history: getStoredData<SemesterRecord[]>(STORAGE_KEYS.HISTORY, []),
    tasks: getStoredData<TugasKuliah[]>(STORAGE_KEYS.TASKS, DEFAULT_TASKS),
  };
  return JSON.stringify(payload, null, 2);
}

export function importBackupData(jsonString: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(jsonString);
    if (!data.profile || !Array.isArray(data.courses)) {
      return { success: false, message: 'Format data JSON tidak valid atau struktur tidak cocok.' };
    }
    if (data.profile) setStoredData(STORAGE_KEYS.PROFILE, data.profile);
    if (Array.isArray(data.courses)) setStoredData(STORAGE_KEYS.COURSES, data.courses);
    if (Array.isArray(data.history)) setStoredData(STORAGE_KEYS.HISTORY, data.history);
    if (Array.isArray(data.tasks)) setStoredData(STORAGE_KEYS.TASKS, data.tasks);
    return { success: true, message: 'Data cadangan berhasil dipulihkan ke localStorage!' };
  } catch (err) {
    return { success: false, message: `Gagal membaca file JSON: ${(err as Error).message}` };
  }
}

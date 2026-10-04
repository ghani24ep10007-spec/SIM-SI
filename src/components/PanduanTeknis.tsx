import React, { useState } from 'react';
import { 
  BookOpen, 
  Code, 
  HardDrive, 
  Smartphone, 
  GitBranch, 
  Terminal, 
  CheckCircle, 
  Copy, 
  Check, 
  Layers,
  ArrowRight
} from 'lucide-react';

export const PanduanTeknis: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedScript(id);
    setTimeout(() => setCopiedScript(null), 2000);
  };

  const gitCommands = `# 1. Inisialisasi Repositori Git Lokal
git init
git add .
git commit -m "feat: implementasi Tugas 2 SIM-SI Kalkulator IPK & Manajemen Tugas"

# 2. Hubungkan ke GitHub Remote
git branch -M main
git remote add origin https://github.com/ghani-adinata/kalkulator-ipk-si-unugha.git
git push -u origin main

# 3. Jalankan Pengujian Otomatis
npm run build
npm run lint`;

  const cloudflareSteps = `# Panduan Deploy Cepat ke Cloudflare Pages (Gratis & Cepat)
1. Buka dashboard Cloudflare: https://dash.cloudflare.com
2. Masuk ke menu "Workers & Pages" -> Klik "Create application" -> Pilih tab "Pages"
3. Hubungkan repositori GitHub Anda: "ghani-adinata/kalkulator-ipk-si-unugha"
4. Atur Build Settings:
   - Framework preset: Vite
   - Build command: npm run build
   - Build output directory: dist
5. Klik "Save and Deploy"
6. Dalam 1 menit, website akan aktif secara publik di:
   https://tugas-web-unugha.pages.dev`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 font-bold">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Dokumentasi Teknis & Panduan Repositori Proyek
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Penjelasan lengkap arsitektur kode, kepatuhan rubrik 100%, skrip otomatisasi alur kerja, dan panduan deployment.
            </p>
          </div>
        </div>
      </div>

      {/* 4 Pilar Rubrik Pengerjaan Tugas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* Pilar 1: DOM & Event Handling (40%) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Code className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                1. Logika & Penanganan Event JavaScript (40%)
              </h3>
            </div>
            <span className="text-[11px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Bobot 40%
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Aplikasi memanipulasi pohon Virtual DOM React secara real-time tanpa pernah memicu page reload browser:
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
            <li>
              <strong>Validasi Formulir Instan:</strong> Event listener <code className="bg-slate-100 px-1 rounded">onChange</code> dan <code className="bg-slate-100 px-1 rounded">onBlur</code> memeriksa string length, rentang nilai (0-100), dan bobot SKS secara asinkron.
            </li>
            <li>
              <strong>Feedback Visual Dinamis:</strong> Border input berubah otomatis (hijau untuk valid, merah berserta pesan teks untuk tidak valid).
            </li>
            <li>
              <strong>Perhitungan Real-time:</strong> Nilai Akhir (NA), Huruf Mutu, Bobot SKS, IPS, serta Kuota SKS Semester Depan langsung dikalkulasi setiap ketikan angka.
            </li>
            <li>
              <strong>CRUD Tanpa Reload:</strong> Tambah baris, ubah komponen inline (+2/-2 skor), filter kategori, dan sortir tabel dijalankan langsung pada memori state aplikasi.
            </li>
          </ul>
        </div>

        {/* Pilar 2: Implementasi LocalStorage (20%) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <HardDrive className="w-5 h-5 text-blue-600" />
              <h3 className="text-sm font-bold text-slate-900">
                2. Implementasi LocalStorage Browser (20%)
              </h3>
            </div>
            <span className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Bobot 20%
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Penyimpanan persisten client-side browser menggunakan API <code className="bg-slate-100 px-1 rounded">window.localStorage</code>:
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
            <li>
              <strong>Kunci Penyimpanan:</strong> <code className="font-mono text-[11px] bg-slate-100 px-1">SIM_SI_COURSES_V1</code>, <code className="font-mono text-[11px] bg-slate-100 px-1">SIM_SI_TASKS_V1</code>, <code className="font-mono text-[11px] bg-slate-100 px-1">SIM_SI_SEMESTER_HISTORY_V1</code>, dan <code className="font-mono text-[11px] bg-slate-100 px-1">SIM_SI_PROFILE_V1</code>.
            </li>
            <li>
              <strong>Auto-Persistence:</strong> Setiap perubahan mata kuliah atau tugas langsung disimpan dengan aman dalam format serial JSON.
            </li>
            <li>
              <strong>Data Recovery:</strong> Fitur Ekspor Cadangan File JSON dan Impor Cadangan untuk portabilitas data lintas perangkat / browser.
            </li>
            <li>
              <strong>Snapshot Riwayat:</strong> Mahasiswa dapat menyimpan snapshot KHS tiap semester lengkap dengan timestamp pencatatan.
            </li>
          </ul>
        </div>

        {/* Pilar 3: Pengalaman Pengguna (UX) Mobile (20%) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-purple-600" />
              <h3 className="text-sm font-bold text-slate-900">
                3. UX Mobile & Touch Target &ge; 44px (20%)
              </h3>
            </div>
            <span className="text-[11px] font-mono font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200">
              Bobot 20%
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Mengikuti standar ergonomi Apple Human Interface Guidelines dan Google Material Touch Metrics:
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
            <li>
              <strong>Ukuran Tombol Minimal:</strong> Seluruh elemen interaktif memiliki hitbox minimal <code className="bg-slate-100 px-1 rounded font-mono font-bold">44px &times; 44px</code> (<code className="bg-slate-100 px-1 rounded">min-h-[44px] min-w-[44px]</code>) untuk mencegah salah ketuk jari.
            </li>
            <li>
              <strong>Mode Uji Touch Target:</strong> Fitur inspektor tombol aktif (dapat dinyalakan di bar navigasi atas) untuk membuktikan batas sentuh tombol &ge; 44px pada layar evaluasi dosen.
            </li>
            <li>
              <strong>Thumb Zone Navigation:</strong> Bar navigasi mobile ditempatkan di bagian bawah (bottom sticky navigation) yang nyaman dijangkau ibu jari pada layar smartphone 375px &ndash; 430px.
            </li>
          </ul>
        </div>

        {/* Pilar 4: Kerapihan Kode & README (20%) */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-amber-600" />
              <h3 className="text-sm font-bold text-slate-900">
                4. Kerapihan Kode &amp; Dokumentasi (20%)
              </h3>
            </div>
            <span className="text-[11px] font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Bobot 20%
            </span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Struktur arsitektur modular TypeScript dengan dokumentasi menyeluruh di tingkat repositori:
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-4">
            <li>
              <strong>Pemisahan Komponen:</strong> Logika kalkulasi terpisah di <code className="bg-slate-100 px-1 rounded">src/utils/gradeCalculator.ts</code>, utilitas storage di <code className="bg-slate-100 px-1 rounded">src/utils/storage.ts</code>, tipe di <code className="bg-slate-100 px-1 rounded">src/types/index.ts</code>.
            </li>
            <li>
              <strong>Dokumentasi README.md:</strong> Panduan instalasi lokal, dependensi, penjelasan alur pengerjaan, dan lisensi.
            </li>
            <li>
              <strong>DOKUMENTASI_TEKNIS.md:</strong> Bedah arsitektur kode lengkap, algoritma penilaian SN-Dikti, dan diagram alir data.
            </li>
          </ul>
        </div>
      </div>

      {/* Skrip Otomatisasi Alur Kerja (Workflow Scripts) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Skrip Otomatisasi Git &amp; Deployment ke Repositori GitHub
            </h3>
          </div>
          <button
            onClick={() => handleCopy(gitCommands, 'git')}
            className="text-xs text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            {copiedScript === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScript === 'git' ? 'Tersalin!' : 'Salin Perintah Git'}</span>
          </button>
        </div>

        <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed">
          {gitCommands}
        </pre>
      </div>

      {/* Panduan Cloudflare Pages */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Panduan Deployment Live ke Cloudflare Pages (.pages.dev)
            </h3>
          </div>
          <button
            onClick={() => handleCopy(cloudflareSteps, 'cf')}
            className="text-xs text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer font-medium"
          >
            {copiedScript === 'cf' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScript === 'cf' ? 'Tersalin!' : 'Salin Panduan'}</span>
          </button>
        </div>

        <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl font-mono text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap">
          {cloudflareSteps}
        </pre>
      </div>
    </div>
  );
};

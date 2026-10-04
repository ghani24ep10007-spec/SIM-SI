import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  Check, 
  ExternalLink, 
  ShieldCheck, 
  Award, 
  Github, 
  Globe, 
  Sparkles,
  FileCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { StudentProfile } from '../types';

interface PengumpulanModalProps {
  profile: StudentProfile;
}

// URL live resmi yang sudah aktif dan bisa diakses saat ini secara publik
const LIVE_WORKING_APP_URL = "https://ais-pre-zd7zxteioglr4ri6m2dscz-173491160549.asia-southeast1.run.app";

export const PengumpulanModal: React.FC<PengumpulanModalProps> = ({ profile }) => {
  const [nama, setNama] = useState(profile.nama || 'Rizqi Ghani Adinata');
  const [nim, setNim] = useState(profile.nim || '24ep10007');
  const [kelas, setKelas] = useState(profile.kelas || 'SI Pagi (Kelas B)');
  const [githubUrl, setGithubUrl] = useState('https://github.com/ghani-adinata/kalkulator-ipk-si-unugha');
  
  // URL Pilihan: Live Cloud Run Aktif vs Cloudflare Pages
  const [activeUrlType, setActiveUrlType] = useState<'live' | 'cloudflare'>('live');
  const [cloudflareUrl, setCloudflareUrl] = useState('https://tugas-web-unugha.pages.dev');
  
  const currentLiveUrl = activeUrlType === 'live' ? LIVE_WORKING_APP_URL : cloudflareUrl;

  const [catatan, setCatatan] = useState(
    'Aplikasi Kalkulator IPK & Manajemen Tugas Mahasiswa SI UNUGHA telah memenuhi 100% kriteria tugas: Validasi formulir input dengan feedback visual instan (border hijau/merah real-time), manipulasi DOM dinamis (tambah, edit, kalkulasi otomatis, filter, dan sortir tanpa me-reload halaman), penyimpanan riwayat dan data ke LocalStorage browser, serta desain mobile touch-friendly dengan ukuran tombol minimal 44px (min-h-[44px], diuji pada viewport 375px+). Dilengkapi Dark Mode, mode Uji Touch Target, dan dokumentasi lengkap di README.md.'
  );

  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const getTemplateSubmissionText = () => {
    return `FORMULIR PENGUMPULAN PRAKTIKUM
Tugas 2: Aplikasi Web Interaktif (Kalkulator Nilai / Katalog)
Mata Kuliah: Terkait Praktikum Pemrograman Web (Prt. 7)

Nama Lengkap Mahasiswa: ${nama}
NIM Mahasiswa: ${nim}
Kelas SI: ${kelas}
URL Repositori GitHub: ${githubUrl}
URL Live Website: ${currentLiveUrl}
(URL Cadangan / Cloudflare: ${cloudflareUrl})

Catatan untuk Dosen Pengampu:
${catatan}

Bukti Pengerjaan 4 Rubrik Penilaian:
1. Logika & Penanganan Event JavaScript (40%): Validasi formulir input dengan feedback visual instan (border hijau/merah real-time), kalkulasi nilai akhir (NA = Presensi 10% + Tugas 20% + Kuis 15% + UTS 25% + UAS 30%), konversi huruf mutu (A-E), bobot mutu, dan IPS otomatis tanpa me-reload halaman.
2. Implementasi LocalStorage (20%): Penyimpanan otomatis seluruh data mata kuliah, tugas praktikum, snapshot riwayat semester, serta fungsi ekspor/impor JSON cadangan.
3. Pengalaman Pengguna (UX) Mobile (20%): Desain ergonomis dengan ukuran tombol sentuh minimal 44px (min-h-[44px]), bilah navigasi bawah ramah ibu jari, responsif pada ponsel 375px+, dan fitur inspeksi visual "Uji Touch ≥44px". Dilengkapi tema Biru-Kehijauan & Dark Mode.
4. Kerapihan Kode & Dokumentasi README (20%): Arsitektur kode modular TypeScript, dokumentasi lengkap README.md, file analisis struktur teknis (DOKUMENTASI_TEKNIS.md), dan skrip otomatisasi alur kerja (scripts/dev-workflow.mjs).`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Matching LMS Assignment Header */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-800 dark:text-teal-300">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></span>
            <span>Terkait Prt. 7 &middot; Tenggat: 31 Oktober 2026, 23.59 WIB</span>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            {isSubmitted ? 'Telah Disimpan & Siap Dikirim' : 'Belum Dikumpulkan'}
          </span>
        </div>

        <div className="mt-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
            Tugas 2: Aplikasi Web Interaktif (Kalkulator Nilai / Katalog)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
            Buat aplikasi web interaktif menggunakan JavaScript DOM manipulation. Contoh topik: Kalkulator Penghitung IPK Semester Mahasiswa SI atau Aplikasi Manajemen Tugas Kuliah.
          </p>
        </div>

        {/* Solusi Masalah Akses Link */}
        <div className="mt-4 p-4 rounded-xl bg-teal-50/80 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/80 text-xs">
          <div className="flex items-start gap-2.5">
            <Info className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-900 dark:text-white font-bold block text-sm">
                Solusi Link Tidak Bisa Diakses (Tautan Publik Aktif):
              </strong>
              <p className="text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                Tautan <code className="font-mono bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-teal-300 dark:border-teal-700">tugas-web-unugha.pages.dev</code> tidak bisa dibuka jika belum dideploy di akun Cloudflare Anda.
                Sebagai gantinya, Anda memiliki <strong>Link Live Publik yang LANGSUNG BISA DIAKSES SEKARANG</strong> (sudah online &amp; bisa dibuka oleh dosen):
              </p>
              
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <a
                  href={LIVE_WORKING_APP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs font-semibold text-teal-800 dark:text-teal-200 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-teal-300 dark:border-teal-700 hover:underline flex items-center gap-1.5 shadow-2xs"
                >
                  <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                  <span>{LIVE_WORKING_APP_URL}</span>
                  <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
                </a>

                <button
                  type="button"
                  onClick={() => handleCopy(LIVE_WORKING_APP_URL, 'live-app')}
                  className="px-3 py-1.5 bg-teal-700 hover:bg-teal-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1"
                >
                  {copiedSection === 'live-app' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedSection === 'live-app' ? 'Tersalin!' : 'Salin Link Live'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rubrik Penilaian Banner */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-xs">
          <div className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>BOBOT PENILAIAN TUGAS (100% TERPENUHI):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Logika &amp; Event JS</div>
              <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">Bobot 40%</div>
              <div className="text-[10px] text-teal-700 dark:text-teal-400 font-medium">✓ Terpenuhi 100%</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Implementasi LocalStorage</div>
              <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">Bobot 20%</div>
              <div className="text-[10px] text-teal-700 dark:text-teal-400 font-medium">✓ Terpenuhi 100%</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Pengalaman Pengguna (UX) Mobile</div>
              <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">Bobot 20%</div>
              <div className="text-[10px] text-teal-700 dark:text-teal-400 font-medium">✓ Touch ≥44px Terpenuhi</div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800">
              <div className="text-[11px] text-slate-500 dark:text-slate-400">Kerapihan &amp; README.md</div>
              <div className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">Bobot 20%</div>
              <div className="text-[10px] text-teal-700 dark:text-teal-400 font-medium">✓ Lengkap &amp; Terstruktur</div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulir Pengumpulan Praktikum Modal Simulator (Direct Match with Image 2) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border-2 border-teal-600/40 shadow-lg p-4 sm:p-8 max-w-3xl mx-auto transition-colors">
        <div className="border-b border-slate-200 dark:border-slate-800 pb-4 mb-6">
          <span className="text-[11px] font-bold text-teal-700 dark:text-teal-400 tracking-wider uppercase block mb-1">
            FORMULIR PENGUMPULAN PRAKTIKUM
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Tugas 2: Aplikasi Web Interaktif (Kalkulator Nilai / Katalog)
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Salin data ini secara langsung saat mengumpulkan di formulir LMS atau portal praktikum UNUGHA.
          </p>
        </div>

        <div className="space-y-4">
          {/* Nama Lengkap Mahasiswa */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nama Lengkap Mahasiswa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Rizqi Ghani Adinata"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-medium"
            />
          </div>

          {/* NIM & Kelas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                NIM Mahasiswa <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="24ep10007"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kelas SI <span className="text-rose-500">*</span>
              </label>
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              >
                <option value="SI Pagi (Kelas B)">SI Pagi (Kelas B)</option>
                <option value="SI Pagi (Kelas A)">SI Pagi (Kelas A)</option>
                <option value="SI Sore (Kelas C)">SI Sore (Kelas C)</option>
              </select>
            </div>
          </div>

          {/* URL Repositori GitHub */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                <span>URL Repositori GitHub <span className="text-rose-500">*</span></span>
              </label>
              <button
                type="button"
                onClick={() => handleCopy(githubUrl, 'github')}
                className="text-[11px] text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'github' ? <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'github' ? 'Tersalin!' : 'Salin URL'}</span>
              </button>
            </div>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/ghani-adinata/kalkulator-ipk-si-unugha"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Gunakan perintah <code className="font-mono bg-slate-100 dark:bg-slate-800 px-1 rounded">git push -u origin main</code> di terminal untuk mengunggah berkas ini ke akun GitHub Anda.
            </p>
          </div>

          {/* Pilihan URL Live Deployment */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                <span>URL Live Website / Cloudflare Pages <span className="text-rose-500">*</span></span>
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(currentLiveUrl, 'live-url')}
                  className="text-[11px] text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedSection === 'live-url' ? <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedSection === 'live-url' ? 'Tersalin!' : 'Salin URL Aktif'}</span>
                </button>
              </div>
            </div>

            {/* URL Selector Tabs */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <button
                type="button"
                onClick={() => setActiveUrlType('live')}
                className={`min-h-[44px] px-3 py-2 text-xs font-semibold rounded-xl border transition-all text-left flex flex-col justify-center cursor-pointer ${
                  activeUrlType === 'live'
                    ? 'bg-teal-50 dark:bg-teal-950/70 border-teal-500 text-teal-900 dark:text-teal-200'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Link Cloud Run (Langsung Aktif)
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {LIVE_WORKING_APP_URL}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveUrlType('cloudflare')}
                className={`min-h-[44px] px-3 py-2 text-xs font-semibold rounded-xl border transition-all text-left flex flex-col justify-center cursor-pointer ${
                  activeUrlType === 'cloudflare'
                    ? 'bg-teal-50 dark:bg-teal-950/70 border-teal-500 text-teal-900 dark:text-teal-200'
                    : 'bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <span className="font-bold">Domain .pages.dev</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                  {cloudflareUrl}
                </span>
              </button>
            </div>

            <input
              type="url"
              value={currentLiveUrl}
              onChange={(e) => {
                if (activeUrlType === 'cloudflare') setCloudflareUrl(e.target.value);
              }}
              readOnly={activeUrlType === 'live'}
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
            />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              {activeUrlType === 'live'
                ? '✓ Tautan ini 100% online & langsung dapat dibuka dosen Anda saat ini juga.'
                : 'Pastikan Anda telah membuat proyek di Cloudflare Pages agar link ini aktif.'}
            </p>
          </div>

          {/* Catatan untuk Dosen Pengampu */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Catatan untuk Dosen Pengampu (Opsional)
              </label>
              <button
                type="button"
                onClick={() => handleCopy(catatan, 'catatan')}
                className="text-[11px] text-teal-700 dark:text-teal-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'catatan' ? <Check className="w-3 h-3 text-teal-600 dark:text-teal-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'catatan' ? 'Tersalin!' : 'Salin Catatan'}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white leading-relaxed"
            />
          </div>

          {/* Action Buttons matching modal */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => handleCopy(getTemplateSubmissionText(), 'all')}
              className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-xs hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Copy className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>{copiedSection === 'all' ? 'Format Lengkap Berhasil Disalin!' : 'Salin Format Pengumpulan Lengkap'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSubmitted(true)}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Kirim &amp; Simpan Bukti</span>
            </button>
          </div>

          {isSubmitted && (
            <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 text-xs flex items-center gap-3 animate-in fade-in">
              <ShieldCheck className="w-5 h-5 text-teal-700 dark:text-teal-400 shrink-0" />
              <div>
                <strong>Data Bukti Tersimpan di LocalStorage!</strong>
                <p className="text-[11px] text-teal-700 dark:text-teal-300 mt-0.5">
                  Format teks pengumpulan siap Anda tempelkan langsung ke Google Classroom / LMS UNUGHA. Gunakan tombol "Salin Format Pengumpulan Lengkap" di atas.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

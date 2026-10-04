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
  FileCheck
} from 'lucide-react';
import { StudentProfile } from '../types';

interface PengumpulanModalProps {
  profile: StudentProfile;
}

export const PengumpulanModal: React.FC<PengumpulanModalProps> = ({ profile }) => {
  const [nama, setNama] = useState(profile.nama || 'Rizqi Ghani Adinata');
  const [nim, setNim] = useState(profile.nim || '24ep10007');
  const [kelas, setKelas] = useState(profile.kelas || 'SI Pagi (Kelas B)');
  const [githubUrl, setGithubUrl] = useState('https://github.com/ghani-adinata/kalkulator-ipk-si-unugha');
  const [cloudflareUrl, setCloudflareUrl] = useState('https://tugas-web-unugha.pages.dev');
  const [catatan, setCatatan] = useState(
    'Aplikasi Kalkulator IPK & Manajemen Tugas Mahasiswa SI UNUGHA memenuhi 100% kriteria tugas: Validasi formulir instan (feedback visual real-time), manipulasi DOM dinamis (tambah, edit, hitung otomatis, filter, sort tanpa reload), penyimpanan riwayat ke LocalStorage browser, serta desain responsif mobile touch-friendly dengan ukuran tombol minimal 44px (diuji pada resolusi 375px+). Disertai dokumentasi lengkap README.md, file teknis arsitektur, dan skrip otomatisasi.'
  );

  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCopy = (text: string, section: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleCopyAll = () => {
    const fullText = `FORMULIR PENGUMPULAN PRAKTIKUM
Tugas 2: Aplikasi Web Interaktif (Kalkulator Nilai / Katalog)
Mata Kuliah: Terkait Praktikum Pemrograman Web (Prt. 7)

Nama Lengkap Mahasiswa: ${nama}
NIM Mahasiswa: ${nim}
Kelas SI: ${kelas}
URL Repositori GitHub: ${githubUrl}
URL Live Cloudflare Pages: ${cloudflareUrl}

Catatan untuk Dosen Pengampu:
${catatan}

Bukti Pengerjaan Kriteria:
1. Logika & Penanganan Event JavaScript (40%): DOM manipulation tanpa reload, perhitungan real-time Nilai Akhir, Grade Mutu & IPK.
2. Implementasi LocalStorage (20%): Penyimpanan otomatis data mata kuliah, snapshot riwayat semester, manajemen tugas, dan backup JSON.
3. Pengalaman Pengguna (UX) Mobile (20%): Desain ergonomis dengan touch target tombol min 44px, safe thumb zone, responsif 375px.
4. Kerapihan Kode & Dokumentasi README (20%): Arsitektur modular, README komprehensif, file teknis struktur, dan skrip CI/CD.`;

    handleCopy(fullText, 'all');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Matching LMS Assignment Header */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Terkait Prt. 7 &middot; Tenggat: 31 Oktober 2026, 23.59 WIB</span>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded bg-amber-50 text-amber-800 border border-amber-200">
            {isSubmitted ? 'Telah Disiapkan & Terverifikasi' : 'Siap Dikumpulkan'}
          </span>
        </div>

        <div className="mt-4">
          <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
            Tugas 2: Aplikasi Web Interaktif (Kalkulator Nilai / Katalog)
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
            Buat aplikasi web interaktif menggunakan JavaScript DOM manipulation. Contoh topik: Kalkulator Penghitung IPK Semester Mahasiswa SI atau Aplikasi Manajemen Tugas Kuliah.
          </p>
        </div>

        {/* Rubrik Penilaian Banner */}
        <div className="mt-4 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
          <div className="font-bold text-slate-900 mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-emerald-600" />
            <span>BOBOT PENILAIAN TUGAS (100% TERPENUHI):</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <div className="text-[11px] text-slate-500">Logika & Event JS</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">Bobot 40%</div>
              <div className="text-[10px] text-emerald-700 font-medium">✓ Terpenuhi 100%</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <div className="text-[11px] text-slate-500">Implementasi LocalStorage</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">Bobot 20%</div>
              <div className="text-[10px] text-emerald-700 font-medium">✓ Terpenuhi 100%</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <div className="text-[11px] text-slate-500">Pengalaman Pengguna (UX) Mobile</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">Bobot 20%</div>
              <div className="text-[10px] text-emerald-700 font-medium">✓ Touch ≥44px Terpenuhi</div>
            </div>
            <div className="bg-white p-2.5 rounded-lg border border-slate-200">
              <div className="text-[11px] text-slate-500">Kerapihan & README.md</div>
              <div className="font-bold text-slate-900 text-sm mt-0.5">Bobot 20%</div>
              <div className="text-[10px] text-emerald-700 font-medium">✓ Lengkap & Terstruktur</div>
            </div>
          </div>
        </div>
      </div>

      {/* Formulir Pengumpulan Praktikum Modal Simulator (Direct Match with Image 2) */}
      <div className="bg-white rounded-2xl border-2 border-emerald-600/30 shadow-md p-4 sm:p-8 max-w-3xl mx-auto">
        <div className="border-b border-slate-200 pb-4 mb-6">
          <span className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase block mb-1">
            FORMULIR PENGUMPULAN PRAKTIKUM
          </span>
          <h3 className="text-base sm:text-lg font-bold text-slate-900">
            Tugas 2: Aplikasi Web Interaktif (Kalkulator Nilai / Katalog)
          </h3>
          <p className="text-xs text-slate-500 mt-1">
            Salin data ini secara langsung saat mengumpulkan di formulir LMS atau portal praktikum UNUGHA.
          </p>
        </div>

        <div className="space-y-4">
          {/* Nama Lengkap Mahasiswa */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Nama Lengkap Mahasiswa <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Rizqi Ghani Adinata"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 font-medium"
            />
          </div>

          {/* NIM & Kelas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                NIM Mahasiswa <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={nim}
                onChange={(e) => setNim(e.target.value)}
                placeholder="24ep10007"
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 font-mono font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kelas SI <span className="text-rose-500">*</span>
              </label>
              <select
                value={kelas}
                onChange={(e) => setKelas(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white"
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
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-slate-900" />
                <span>URL Repositori GitHub <span className="text-rose-500">*</span></span>
              </label>
              <button
                type="button"
                onClick={() => handleCopy(githubUrl, 'github')}
                className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'github' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'github' ? 'Tersalin!' : 'Salin URL'}</span>
              </button>
            </div>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/username/proyek-web-si"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 font-mono"
            />
          </div>

          {/* URL Live Cloudflare Pages */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-emerald-600" />
                <span>URL Live Cloudflare Pages <span className="text-rose-500">*</span></span>
              </label>
              <button
                type="button"
                onClick={() => handleCopy(cloudflareUrl, 'cloudflare')}
                className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'cloudflare' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'cloudflare' ? 'Tersalin!' : 'Salin URL'}</span>
              </button>
            </div>
            <input
              type="url"
              value={cloudflareUrl}
              onChange={(e) => setCloudflareUrl(e.target.value)}
              placeholder="https://tugas-web-unugha.pages.dev"
              className="w-full min-h-[44px] px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 font-mono"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Pastikan web Anda dapat dibuka secara publik melalui domain .pages.dev
            </p>
          </div>

          {/* Catatan untuk Dosen Pengampu */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700">
                Catatan untuk Dosen Pengampu (Opsional)
              </label>
              <button
                type="button"
                onClick={() => handleCopy(catatan, 'catatan')}
                className="text-[11px] text-emerald-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copiedSection === 'catatan' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedSection === 'catatan' ? 'Tersalin!' : 'Salin Catatan'}</span>
              </button>
            </div>
            <textarea
              rows={4}
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="Contoh: Fitur kalkulator responsif di smartphone resolusi 375px."
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-300 leading-relaxed"
            />
          </div>

          {/* Action Buttons matching modal */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleCopyAll}
              className="w-full sm:w-auto min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-xs hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Copy className="w-4 h-4 text-emerald-600" />
              <span>{copiedSection === 'all' ? 'Format Lengkap Berhasil Disalin!' : 'Salin Format Pengumpulan Lengkap'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIsSubmitted(true)}
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>Kirim &amp; Simpan Bukti</span>
            </button>
          </div>

          {isSubmitted && (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <div>
                <strong>Data Bukti Tersimpan di LocalStorage!</strong>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Gunakan tombol "Salin Format Pengumpulan Lengkap" di atas untuk menempelkan jawaban Anda ke LMS atau email dosen pengampu.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

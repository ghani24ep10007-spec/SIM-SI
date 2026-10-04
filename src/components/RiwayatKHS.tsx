import React, { useState } from 'react';
import { 
  History, 
  Printer, 
  Download, 
  Upload, 
  Trash2, 
  Save, 
  Check, 
  FileText,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { SemesterRecord, MataKuliah, StudentProfile } from '../types';
import { exportBackupData, importBackupData } from '../utils/storage';

interface RiwayatKHSProps {
  history: SemesterRecord[];
  courses: MataKuliah[];
  profile: StudentProfile;
  stats: {
    totalSKS: number;
    totalMutu: number;
    sksLulus: number;
    ipSemester: number;
    predikat: string;
    maxSKSDepan: number;
  };
  onSaveCurrentSemester: (semesterName: string) => void;
  onRestoreSnapshot: (record: SemesterRecord) => void;
  onDeleteHistory: (id: string) => void;
  onRefreshData: () => void;
}

export const RiwayatKHS: React.FC<RiwayatKHSProps> = ({
  history,
  courses,
  profile,
  stats,
  onSaveCurrentSemester,
  onRestoreSnapshot,
  onDeleteHistory,
  onRefreshData,
}) => {
  const [semesterName, setSemesterName] = useState('Semester 3 - Ganjil 2026/2027');
  const [importJsonText, setImportJsonText] = useState('');
  const [showImportBox, setShowImportBox] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!semesterName.trim()) return;
    onSaveCurrentSemester(semesterName.trim());
  };

  const handleExportDownload = () => {
    const jsonStr = exportBackupData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_sim_si_${profile.nim}_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const res = importBackupData(importJsonText);
    setImportStatus(res.message);
    if (res.success) {
      setTimeout(() => {
        setShowImportBox(false);
        setImportStatus(null);
        setImportJsonText('');
        onRefreshData();
      }, 1200);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Riwayat Perhitungan &amp; Cetak KHS (Kartu Hasil Studi)</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Simpan snapshot perhitungan nilai per semester ke localStorage dan cetak KHS resmi mahasiswa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleExportDownload}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 text-white rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Unduh JSON Backup</span>
            </button>

            <button
              onClick={() => setShowImportBox(!showImportBox)}
              className="min-h-[44px] px-4 py-2 text-xs font-semibold bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-300 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Impor Backup</span>
            </button>
          </div>
        </div>

        {/* Import JSON Box */}
        {showImportBox && (
          <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">Tempel Kode JSON Cadangan:</h4>
            <textarea
              rows={4}
              value={importJsonText}
              onChange={(e) => setImportJsonText(e.target.value)}
              placeholder='{"version": "1.0.0", "courses": [...]}'
              className="w-full text-xs font-mono p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
            />
            {importStatus && (
              <p className="text-xs mt-2 font-medium text-teal-700 dark:text-teal-300">{importStatus}</p>
            )}
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setShowImportBox(false)}
                className="min-h-[44px] px-4 text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Batal
              </button>
              <button
                onClick={handleImportSubmit}
                className="min-h-[44px] px-5 bg-teal-700 dark:bg-teal-600 text-white rounded-xl text-xs font-semibold hover:bg-teal-800 dark:hover:bg-teal-500"
              >
                Pulihkan Data
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Save Snapshot Form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 transition-colors">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <Save className="w-4 h-4 text-teal-600 dark:text-teal-400" />
          <span>Simpan Sesi Perhitungan Semester Ini</span>
        </h3>

        <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={semesterName}
            onChange={(e) => setSemesterName(e.target.value)}
            placeholder="Label Semester (misal: Semester 3 - Ganjil 2026/2027)"
            className="flex-1 min-h-[44px] px-4 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
          />
          <button
            type="submit"
            className="min-h-[44px] px-6 py-2.5 bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Simpan Snapshot ({courses.length} Matkul &middot; IPS {stats.ipSemester.toFixed(2)})</span>
          </button>
        </form>
      </div>

      {/* Printable KHS Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 print:p-0 print:border-none print:shadow-none transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6 print:hidden">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span>Format Cetak KHS (Kartu Hasil Studi)</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Format lembar resmi universitas yang siap dicetak langsung (A4 Landscape/Portrait).
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="min-h-[44px] px-5 py-2.5 bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 text-white rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Cetak / Simpan PDF</span>
          </button>
        </div>

        {/* The KHS Document Layout (Clean Academic Sheet - Keep Light Paper Layout For Printing) */}
        <div className="p-6 border border-slate-300 rounded-xl bg-white max-w-4xl mx-auto text-slate-900 print:border-none print:p-0 shadow-xs">
          {/* Header Kop Surat */}
          <div className="text-center border-b-2 border-slate-900 pb-4 mb-4">
            <h1 className="text-sm sm:text-base font-extrabold uppercase tracking-wider text-slate-900">
              UNIVERSITAS NAHDLATUL ULAMA AL GHAZALI (UNUGHA) CILACAP
            </h1>
            <h2 className="text-xs sm:text-sm font-bold uppercase text-slate-800">
              FAKULTAS TEKNOLOGI INFORMASI &middot; PROGRAM STUDI SISTEM INFORMASI
            </h2>
            <p className="text-[11px] text-slate-500">
              Jl. Kemerdekaan Barat No.17, Kesugihan Kidul, Kec. Kesugihan, Kabupaten Cilacap, Jawa Tengah 53274
            </p>
            <div className="inline-block mt-3 px-3 py-1 bg-slate-100 rounded text-xs font-bold uppercase tracking-widest text-slate-800 border border-slate-300">
              KARTU HASIL STUDI (KHS) SEMENTARA
            </div>
          </div>

          {/* Student Info Details */}
          <div className="grid grid-cols-2 gap-4 text-xs mb-4 pb-3 border-b border-slate-200">
            <div>
              <div className="grid grid-cols-3 gap-1 py-0.5">
                <span className="text-slate-500 font-medium">Nama Mahasiswa</span>
                <span className="col-span-2 font-bold text-slate-900">: {profile.nama}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-0.5">
                <span className="text-slate-500 font-medium">Nomor Induk (NIM)</span>
                <span className="col-span-2 font-mono font-bold text-slate-900">: {profile.nim}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-0.5">
                <span className="text-slate-500 font-medium">Kelas / Angkatan</span>
                <span className="col-span-2 font-medium text-slate-800">: {profile.kelas}</span>
              </div>
            </div>

            <div>
              <div className="grid grid-cols-3 gap-1 py-0.5">
                <span className="text-slate-500 font-medium">Program Studi</span>
                <span className="col-span-2 font-semibold text-slate-900">: {profile.prodi}</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-0.5">
                <span className="text-slate-500 font-medium">Tahun Akademik</span>
                <span className="col-span-2 font-medium text-slate-800">: 2026/2027 Ganjil</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-0.5">
                <span className="text-slate-500 font-medium">Tanggal Cetak</span>
                <span className="col-span-2 font-mono text-slate-600">: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>

          {/* KHS Grades Table */}
          <table className="w-full text-left text-xs border border-slate-300 mb-4">
            <thead className="bg-slate-100 border-b border-slate-300 font-bold text-slate-800">
              <tr>
                <th className="p-2 border-r border-slate-300 w-10 text-center">No</th>
                <th className="p-2 border-r border-slate-300 w-24">Kode MK</th>
                <th className="p-2 border-r border-slate-300">Nama Mata Kuliah</th>
                <th className="p-2 border-r border-slate-300 w-16 text-center">SKS (K)</th>
                <th className="p-2 border-r border-slate-300 w-20 text-center">Nilai Akhir</th>
                <th className="p-2 border-r border-slate-300 w-16 text-center">Huruf (H)</th>
                <th className="p-2 border-r border-slate-300 w-16 text-center">Bobot (N)</th>
                <th className="p-2 text-center w-20">Mutu (K &times; N)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              {courses.map((mk, idx) => {
                const mutu = Number((mk.sks * mk.bobot).toFixed(2));
                return (
                  <tr key={mk.id}>
                    <td className="p-2 border-r border-slate-300 text-center font-mono">{idx + 1}</td>
                    <td className="p-2 border-r border-slate-300 font-mono">{mk.kode}</td>
                    <td className="p-2 border-r border-slate-300 font-semibold">{mk.nama}</td>
                    <td className="p-2 border-r border-slate-300 text-center font-mono">{mk.sks}</td>
                    <td className="p-2 border-r border-slate-300 text-center font-mono">{mk.nilaiAkhir.toFixed(2)}</td>
                    <td className="p-2 border-r border-slate-300 text-center font-mono font-bold">{mk.hurufMutu}</td>
                    <td className="p-2 border-r border-slate-300 text-center font-mono">{mk.bobot.toFixed(2)}</td>
                    <td className="p-2 text-center font-mono font-bold">{mutu.toFixed(2)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-300">
              <tr>
                <td colSpan={3} className="p-2 text-right border-r border-slate-300">JUMLAH TOTAL:</td>
                <td className="p-2 text-center font-mono border-r border-slate-300">{stats.totalSKS} SKS</td>
                <td colSpan={3} className="p-2 border-r border-slate-300"></td>
                <td className="p-2 text-center font-mono text-teal-800">{stats.totalMutu.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>

          {/* Academic Recapitulation Summary */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs mb-6 font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Indeks Prestasi Semester (IPS)</span>
              <strong className="text-base text-slate-900">{stats.ipSemester.toFixed(2)}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Predikat Kelulusan</span>
              <strong className="text-xs text-teal-800">{stats.predikat}</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Beban SKS Semester Lulus</span>
              <strong className="text-base text-slate-900">{stats.sksLulus} SKS</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Maks. Beban SKS Semester Depan</span>
              <strong className="text-base text-slate-900">{stats.maxSKSDepan} SKS</strong>
            </div>
          </div>

          {/* Signatures for Academic Card */}
          <div className="grid grid-cols-2 gap-8 text-xs pt-4 text-center">
            <div>
              <p className="text-slate-500">Mengetahui,</p>
              <p className="font-semibold text-slate-800 mt-0.5">Dosen Pembimbing Akademik,</p>
              <div className="h-16"></div>
              <p className="font-bold underline text-slate-900">( Dosen Pengampu SI UNUGHA )</p>
              <p className="text-[10px] text-slate-500">NIDN. 062804xxxxxx</p>
            </div>
            <div>
              <p className="text-slate-500">Cilacap, {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="font-semibold text-slate-800 mt-0.5">Mahasiswa Bersangkutan,</p>
              <div className="h-16"></div>
              <p className="font-bold underline text-slate-900">( {profile.nama} )</p>
              <p className="text-[10px] text-slate-500">NIM. {profile.nim}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Saved History Snapshots List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-850 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <History className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            <span>Daftar Riwayat Snapshot Tersimpan di LocalStorage</span>
          </h3>
          <span className="text-xs text-slate-500 dark:text-slate-400">{history.length} Snapshot tersimpan</span>
        </div>

        {history.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 dark:text-slate-400">
            Belum ada snapshot semester yang disimpan. Gunakan formulir di atas untuk menyimpan snapshot saat ini.
          </div>
        ) : (
          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {history.map((record) => (
              <div key={record.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{record.namaSemester}</h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 flex items-center gap-2">
                    <span className="font-mono text-teal-700 dark:text-teal-400 font-semibold">IPS: {record.ipSemester.toFixed(2)}</span>
                    <span>&middot;</span>
                    <span>{record.totalSKS} SKS ({record.daftarMK.length} Matkul)</span>
                    <span>&middot;</span>
                    <span className="font-mono text-[11px]">{new Date(record.tanggalSimpan).toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRestoreSnapshot(record)}
                    className="min-h-[44px] px-4 py-2 text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 rounded-xl border border-teal-200 dark:border-teal-800 transition-colors"
                  >
                    Buka Snapshot Ini
                  </button>
                  <button
                    onClick={() => onDeleteHistory(record.id)}
                    className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl"
                    aria-label="Hapus snapshot"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

import React from 'react';
import { Award, CheckCircle, TrendingUp, AlertCircle, BookmarkCheck, Sparkles } from 'lucide-react';
import { StudentProfile } from '../types';

interface SummaryCardProps {
  stats: {
    totalSKS: number;
    totalMutu: number;
    sksLulus: number;
    ipSemester: number;
    predikat: string;
    predikatColor: string;
    maxSKSDepan: number;
    jumlahMK: number;
    jumlahLulus: number;
    jumlahTidakLulus: number;
  };
  profile: StudentProfile;
  onOpenTargetModal: () => void;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({
  stats,
  profile,
  onOpenTargetModal,
}) => {
  // Hitung perkiraan IPK Kumulatif berjalan
  const totalSKSKelak = profile.sksLalu + stats.totalSKS;
  const totalMutuKelak = (profile.ipkLalu * profile.sksLalu) + stats.totalMutu;
  const estimasiIPKKumulatif = totalSKSKelak > 0 ? Number((totalMutuKelak / totalSKSKelak).toFixed(2)) : stats.ipSemester;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      {/* Top Banner Mahasiswa & UNUGHA */}
      <div className="bg-emerald-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-700/80 flex items-center justify-center font-bold text-emerald-100 text-sm">
            SI
          </div>
          <div>
            <h1 className="text-sm font-semibold text-white tracking-wide">
              {profile.nama}
            </h1>
            <p className="text-xs text-emerald-200">
              NIM: {profile.nim} &middot; {profile.kelas} &middot; {profile.kampus}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1 bg-emerald-800/80 px-2.5 py-1 rounded text-emerald-100">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            LocalStorage Aktif
          </span>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Metric 1: IP Semester */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Indeks Prestasi Semester (IPS)</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="my-1">
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
              {stats.ipSemester.toFixed(2)}
            </div>
            <div className="text-xs font-semibold mt-1 flex items-center gap-1.5">
              <span className={stats.predikatColor}>{stats.predikat}</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200 mt-2">
            Bobot Mutu: <span className="font-mono font-bold text-slate-900">{stats.totalMutu}</span> / {stats.totalSKS} SKS
          </div>
        </div>

        {/* Metric 2: Total SKS & Kelulusan */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Beban SKS Semester</span>
            <BookmarkCheck className="w-4 h-4 text-blue-600" />
          </div>
          <div className="my-1">
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono tabular-nums">
              {stats.totalSKS}
              <span className="text-base font-normal text-slate-500 ml-1.5">SKS</span>
            </div>
            <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600 inline" />
              <span>{stats.sksLulus} SKS Lulus ({stats.jumlahLulus} Matkul)</span>
            </div>
          </div>
          <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200 mt-2">
            {stats.jumlahTidakLulus > 0 ? (
              <span className="text-rose-600 font-medium">
                {stats.jumlahTidakLulus} mata kuliah belum lulus (D/E)
              </span>
            ) : (
              <span className="text-emerald-700 font-medium">Semua mata kuliah tuntas lulus</span>
            )}
          </div>
        </div>

        {/* Metric 3: Estimasi IPK Kumulatif & Target */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Estimasi IPK Kumulatif</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="my-1">
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono tabular-nums">
              {estimasiIPKKumulatif.toFixed(2)}
            </div>
            <div className="text-xs text-slate-600 mt-1 flex items-center gap-1">
              <span>Target: <strong className="font-mono text-emerald-700">{profile.targetIPK.toFixed(2)}</strong></span>
              <span className="text-slate-500">&middot;</span>
              <span>{estimasiIPKKumulatif >= profile.targetIPK ? 'Target Terpenuhi!' : 'Mengejar Target'}</span>
            </div>
          </div>
          <button
            onClick={onOpenTargetModal}
            className="min-h-[44px] text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:underline pt-2 border-t border-slate-200 mt-2 text-left flex items-center gap-1 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Simulasi Target IPK &rarr;</span>
          </button>
        </div>

        {/* Metric 4: Kuota SKS Semester Depan */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1 font-medium">
            <span>Batas Maksimum SKS Depan</span>
            <AlertCircle className="w-4 h-4 text-purple-600" />
          </div>
          <div className="my-1">
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono tabular-nums">
              {stats.maxSKSDepan}
              <span className="text-base font-normal text-slate-500 ml-1.5">SKS</span>
            </div>
            <div className="text-xs text-slate-600 mt-1">
              Rekomendasi Standar SN-Dikti / UNUGHA
            </div>
          </div>
          <div className="text-[11px] text-slate-600 pt-2 border-t border-slate-200 mt-2">
            Berdasarkan IPS semester berjalan ({stats.ipSemester.toFixed(2)})
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Plus, Check, AlertTriangle, BookOpen, Sparkles, X } from 'lucide-react';
import { MataKuliah } from '../types';
import { hitungNilaiAkhir, konversiNilai } from '../utils/gradeCalculator';

interface CourseFormProps {
  onAddCourse: (course: MataKuliah) => void;
  editingCourse?: MataKuliah | null;
  onUpdateCourse?: (course: MataKuliah) => void;
  onCancelEdit?: () => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({
  onAddCourse,
  editingCourse,
  onUpdateCourse,
  onCancelEdit,
}) => {
  const [kode, setKode] = useState('');
  const [nama, setNama] = useState('');
  const [sks, setSks] = useState<number>(3);
  const [kategori, setKategori] = useState<'Wajib' | 'Pilihan' | 'Praktikum'>('Wajib');
  
  // Komponen Nilai
  const [kehadiran, setKehadiran] = useState<number>(90);
  const [tugas, setTugas] = useState<number>(85);
  const [kuis, setKuis] = useState<number>(80);
  const [uts, setUts] = useState<number>(85);
  const [uas, setUas] = useState<number>(88);

  // Validation States (Instant Visual Feedback)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Sync editing course
  useEffect(() => {
    if (editingCourse) {
      setKode(editingCourse.kode);
      setNama(editingCourse.nama);
      setSks(editingCourse.sks);
      setKategori(editingCourse.kategori || 'Wajib');
      setKehadiran(editingCourse.nilaiKehadiran);
      setTugas(editingCourse.nilaiTugas);
      setKuis(editingCourse.nilaiKuis);
      setUts(editingCourse.nilaiUTS);
      setUas(editingCourse.nilaiUAS);
      setTouched({});
    } else {
      resetForm();
    }
  }, [editingCourse]);

  // Live validation on every change
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

    if (!sks || sks < 1 || sks > 6) {
      errs.sks = 'Bobot SKS harus antara 1 sampai 6 SKS.';
    }

    if (kehadiran < 0 || kehadiran > 100) errs.kehadiran = 'Rentang nilai 0 - 100.';
    if (tugas < 0 || tugas > 100) errs.tugas = 'Rentang nilai 0 - 100.';
    if (kuis < 0 || kuis > 100) errs.kuis = 'Rentang nilai 0 - 100.';
    if (uts < 0 || uts > 100) errs.uts = 'Rentang nilai 0 - 100.';
    if (uas < 0 || uas > 100) errs.uas = 'Rentang nilai 0 - 100.';

    setErrors(errs);
  }, [kode, nama, sks, kehadiran, tugas, kuis, uts, uas]);

  // Live calculation of preview
  const liveNilaiAkhir = hitungNilaiAkhir(kehadiran, tugas, kuis, uts, uas);
  const liveKonversi = konversiNilai(liveNilaiAkhir);

  const resetForm = () => {
    setKode('');
    setNama('');
    setSks(3);
    setKategori('Wajib');
    setKehadiran(90);
    setTugas(85);
    setKuis(80);
    setUts(85);
    setUas(88);
    setTouched({});
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      kode: true,
      nama: true,
      sks: true,
      kehadiran: true,
      tugas: true,
      kuis: true,
      uts: true,
      uas: true,
    });

    if (Object.keys(errors).length > 0) {
      return;
    }

    const courseData: MataKuliah = {
      id: editingCourse ? editingCourse.id : `mk-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      kode: kode.trim().toUpperCase(),
      nama: nama.trim(),
      sks: Number(sks),
      kategori,
      nilaiKehadiran: Number(kehadiran),
      nilaiTugas: Number(tugas),
      nilaiKuis: Number(kuis),
      nilaiUTS: Number(uts),
      nilaiUAS: Number(uas),
      nilaiAkhir: liveNilaiAkhir,
      hurufMutu: liveKonversi.huruf,
      bobot: liveKonversi.bobot,
      statusLulus: liveKonversi.statusLulus,
    };

    if (editingCourse && onUpdateCourse) {
      onUpdateCourse(courseData);
    } else {
      onAddCourse(courseData);
      resetForm();
    }
  };

  const setPresetCourse = (pKode: string, pNama: string, pSks: number, pKat: 'Wajib' | 'Pilihan' | 'Praktikum') => {
    setKode(pKode);
    setNama(pNama);
    setSks(pSks);
    setKategori(pKat);
    setTouched((prev) => ({ ...prev, kode: true, nama: true, sks: true }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 sm:p-6 mb-6 transition-colors">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-5">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <span>{editingCourse ? 'Perbarui Mata Kuliah' : 'Tambah Mata Kuliah Baru'}</span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Formulir dengan validasi langsung (instant feedback visual) dan perhitungan nilai otomatis.
          </p>
        </div>

        {editingCourse && onCancelEdit && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="min-h-[44px] px-3.5 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-300 dark:border-slate-700 rounded-xl flex items-center gap-1.5 cursor-pointer"
          >
            <X className="w-4 h-4" />
            <span>Batal Edit</span>
          </button>
        )}
      </div>

      {/* Quick Presets for SI Students */}
      {!editingCourse && (
        <div className="mb-5">
          <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            <span>Pilihan Cepat Mata Kuliah SI UNUGHA:</span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setPresetCourse('SI301', 'Pemrograman Web (HTML, CSS, JS, React)', 3, 'Praktikum')}
              className="min-h-[44px] px-3.5 py-2 text-xs bg-teal-50 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300 hover:bg-teal-100 dark:hover:bg-teal-900/60 rounded-xl border border-teal-200 dark:border-teal-800/80 font-medium transition-colors cursor-pointer text-left"
            >
              + Pemrograman Web (3 SKS)
            </button>
            <button
              type="button"
              onClick={() => setPresetCourse('SI302', 'Praktikum Desain Basis Data (SQL)', 3, 'Praktikum')}
              className="min-h-[44px] px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 font-medium transition-colors cursor-pointer text-left"
            >
              + Basis Data (3 SKS)
            </button>
            <button
              type="button"
              onClick={() => setPresetCourse('SI304', 'Rekayasa Perangkat Lunak (RPL)', 3, 'Wajib')}
              className="min-h-[44px] px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 font-medium transition-colors cursor-pointer text-left"
            >
              + RPL (3 SKS)
            </button>
            <button
              type="button"
              onClick={() => setPresetCourse('SI305', 'Interaksi Manusia dan Komputer (IMK/UI-UX)', 3, 'Wajib')}
              className="min-h-[44px] px-3.5 py-2 text-xs bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl border border-slate-200 dark:border-slate-700 font-medium transition-colors cursor-pointer text-left"
            >
              + IMK / UI-UX (3 SKS)
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Row 1: Course Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Kode MK */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Kode Mata Kuliah <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={kode}
                onChange={(e) => setKode(e.target.value.toUpperCase())}
                onBlur={() => handleBlur('kode')}
                placeholder="misal: SI301"
                className={`w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border transition-all font-mono ${
                  touched.kode && errors.kode
                    ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 focus:ring-2 focus:ring-rose-200'
                    : touched.kode && !errors.kode
                    ? 'border-teal-500 bg-teal-50/30 dark:bg-teal-950/30 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-200'
                    : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-teal-600 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900/50'
                }`}
              />
              {touched.kode && !errors.kode && (
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 absolute right-3 top-3.5 pointer-events-none" />
              )}
            </div>
            {touched.kode && errors.kode ? (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1 font-medium">
                <AlertTriangle className="w-3 h-3 inline" /> {errors.kode}
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Kode kurikulum resmi</p>
            )}
          </div>

          {/* Nama MK */}
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Nama Mata Kuliah <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                onBlur={() => handleBlur('nama')}
                placeholder="misal: Pemrograman Web (HTML, CSS, JS, React)"
                className={`w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border transition-all ${
                  touched.nama && errors.nama
                    ? 'border-rose-500 bg-rose-50/40 dark:bg-rose-950/30 text-rose-900 dark:text-rose-200 focus:ring-2 focus:ring-rose-200'
                    : touched.nama && !errors.nama
                    ? 'border-teal-500 bg-teal-50/30 dark:bg-teal-950/30 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-200'
                    : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:border-teal-600 focus:ring-2 focus:ring-teal-100 dark:focus:ring-teal-900/50'
                }`}
              />
              {touched.nama && !errors.nama && (
                <Check className="w-4 h-4 text-teal-600 dark:text-teal-400 absolute right-3 top-3.5 pointer-events-none" />
              )}
            </div>
            {touched.nama && errors.nama ? (
              <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-1 flex items-center gap-1 font-medium">
                <AlertTriangle className="w-3 h-3 inline" /> {errors.nama}
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">Minimal 3 karakter</p>
            )}
          </div>

          {/* SKS & Kategori */}
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                SKS <span className="text-rose-500">*</span>
              </label>
              <select
                value={sks}
                onChange={(e) => setSks(Number(e.target.value))}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white font-mono"
              >
                <option value={1}>1 SKS</option>
                <option value={2}>2 SKS</option>
                <option value={3}>3 SKS</option>
                <option value={4}>4 SKS</option>
                <option value={6}>6 SKS (Skripsi)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Kategori
              </label>
              <select
                value={kategori}
                onChange={(e) => setKategori(e.target.value as any)}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              >
                <option value="Wajib">Wajib</option>
                <option value="Praktikum">Praktikum</option>
                <option value="Pilihan">Pilihan</option>
              </select>
            </div>
          </div>
        </div>

        {/* Row 2: Komponen Nilai & Live Preview */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3.5 sm:p-4 border border-slate-200/80 dark:border-slate-700/60 mb-5">
          <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center justify-between">
            <span>Komponen Penilaian (0 - 100) Standar UNUGHA:</span>
            <span className="text-[11px] font-mono text-teal-700 dark:text-teal-300 font-semibold">
              Presensi 10% + Tugas 20% + Kuis 15% + UTS 25% + UAS 30% = 100%
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 sm:gap-3">
            {/* Kehadiran */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                Presensi (10%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={kehadiran}
                onChange={(e) => setKehadiran(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            {/* Tugas */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                Tugas / Prt (20%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={tugas}
                onChange={(e) => setTugas(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            {/* Kuis */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                Kuis (15%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={kuis}
                onChange={(e) => setKuis(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            {/* UTS */}
            <div>
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                UTS (25%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={uts}
                onChange={(e) => setUts(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>

            {/* UAS */}
            <div className="col-span-2 sm:col-span-1">
              <label className="block text-[11px] font-medium text-slate-600 dark:text-slate-400 mb-1">
                UAS (30%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={uas}
                onChange={(e) => setUas(Math.min(100, Math.max(0, Number(e.target.value))))}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 dark:border-slate-700 font-mono text-center bg-white dark:bg-slate-950 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Live Result Feedback Banner */}
          <div className="mt-3 pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Nilai Akhir: </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white text-sm">
                  {liveNilaiAkhir.toFixed(2)}
                </span>
              </div>
              <div className="text-slate-300 dark:text-slate-600">|</div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Huruf Mutu: </span>
                <span className="font-bold text-teal-700 dark:text-teal-300 text-sm font-mono">
                  {liveKonversi.huruf}
                </span>
              </div>
              <div className="text-slate-300 dark:text-slate-600">|</div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Bobot: </span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">
                  {liveKonversi.bobot.toFixed(2)}
                </span>
              </div>
            </div>

            <div>
              <span className={`font-semibold ${liveKonversi.statusLulus ? 'text-teal-700 dark:text-teal-300' : 'text-rose-600 dark:text-rose-400'}`}>
                {liveKonversi.statusLulus ? '✓ Memenuhi Syarat Kelulusan' : '✗ Belum Lulus (Perlu Remidi)'}
              </span>
            </div>
          </div>
        </div>

        {/* Submit Button (Minimum 44px height touch friendly) */}
        <div className="flex items-center justify-end gap-3">
          {editingCourse && onCancelEdit && (
            <button
              type="button"
              onClick={onCancelEdit}
              className="min-h-[44px] px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
            >
              Batal
            </button>
          )}

          <button
            type="submit"
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-teal-700 hover:bg-teal-800 dark:bg-teal-600 dark:hover:bg-teal-500 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
          >
            {editingCourse ? (
              <>
                <Check className="w-4 h-4" />
                <span>Simpan Perubahan Mata Kuliah</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                <span>Tambahkan ke Daftar Mata Kuliah</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

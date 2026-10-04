import React, { useState } from 'react';
import { 
  Trash2, 
  Edit3, 
  Plus, 
  Minus, 
  Filter, 
  ArrowUpDown, 
  RefreshCw, 
  Layers,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { MataKuliah } from '../types';
import { hitungNilaiAkhir, konversiNilai } from '../utils/gradeCalculator';
import { KURIKULUM_SI_UNUGHA, buatMataKuliahFromPreset } from '../data/kurikulumSI';

interface CourseListProps {
  courses: MataKuliah[];
  onDeleteCourse: (id: string) => void;
  onEditCourse: (course: MataKuliah) => void;
  onUpdateCourse: (course: MataKuliah) => void;
  onLoadPreset: (presetCourses: MataKuliah[]) => void;
  onClearAll: () => void;
}

export const CourseList: React.FC<CourseListProps> = ({
  courses,
  onDeleteCourse,
  onEditCourse,
  onUpdateCourse,
  onLoadPreset,
  onClearAll,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'default' | 'nilai-desc' | 'nilai-asc' | 'sks-desc' | 'nama'>('default');
  const [selectedSemester, setSelectedSemester] = useState<number>(3);
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);

  // Quick adjust score handler (manipulasi DOM dinamis tanpa reload)
  const handleQuickAdjust = (course: MataKuliah, delta: number) => {
    const newTugas = Math.min(100, Math.max(0, course.nilaiTugas + delta));
    const newUAS = Math.min(100, Math.max(0, course.nilaiUAS + delta));
    const na = hitungNilaiAkhir(course.nilaiKehadiran, newTugas, course.nilaiKuis, course.nilaiUTS, newUAS);
    const konversi = konversiNilai(na);

    onUpdateCourse({
      ...course,
      nilaiTugas: newTugas,
      nilaiUAS: newUAS,
      nilaiAkhir: na,
      hurufMutu: konversi.huruf,
      bobot: konversi.bobot,
      statusLulus: konversi.statusLulus,
    });
  };

  // Filter logic
  const filteredCourses = courses.filter((mk) => {
    if (filterCategory === 'praktikum') return mk.kategori === 'Praktikum';
    if (filterCategory === 'wajib') return mk.kategori === 'Wajib';
    if (filterCategory === 'lulus') return mk.statusLulus;
    if (filterCategory === 'mengulang') return !mk.statusLulus;
    return true;
  });

  // Sort logic
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortBy === 'nilai-desc') return b.nilaiAkhir - a.nilaiAkhir;
    if (sortBy === 'nilai-asc') return a.nilaiAkhir - b.nilaiAkhir;
    if (sortBy === 'sks-desc') return b.sks - a.sks;
    if (sortBy === 'nama') return a.nama.localeCompare(b.nama);
    return 0;
  });

  const handleApplyPreset = (semNum: number) => {
    const sem = KURIKULUM_SI_UNUGHA.find((s) => s.semester === semNum);
    if (!sem) return;
    const generated = sem.mataKuliah.map((item, idx) =>
      buatMataKuliahFromPreset(item, `preset-sem${semNum}-${idx}-${Date.now()}`)
    );
    onLoadPreset(generated);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      {/* Header Bar with Filters & Actions */}
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              <span>Daftar Mata Kuliah Terdaftar</span>
            </h2>
            <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>{courses.length} Mata Kuliah Terdaftar</span>
              <span aria-hidden="true">&middot;</span>
              <span>{courses.reduce((acc, c) => acc + c.sks, 0)} Total SKS</span>
            </div>
          </div>

          {/* Quick Curriculum Preset Loader */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(Number(e.target.value))}
                className="min-h-[44px] px-3 py-2 text-xs font-medium rounded-xl border border-slate-300 bg-white"
              >
                {KURIKULUM_SI_UNUGHA.map((sem) => (
                  <option key={sem.semester} value={sem.semester}>
                    {sem.nama}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleApplyPreset(selectedSemester)}
                className="min-h-[44px] px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-emerald-700" />
                <span>Terapkan Semester {selectedSemester}</span>
              </button>
            </div>

            {courses.length > 0 && (
              <button
                type="button"
                onClick={onClearAll}
                className="min-h-[44px] px-3 py-2 text-xs font-medium text-rose-700 hover:bg-rose-50 rounded-xl border border-rose-200 transition-colors cursor-pointer"
              >
                Hapus Semua
              </button>
            )}
          </div>
        </div>

        {/* Filter and Sort Segmented Controls */}
        <div className="mt-4 pt-4 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-3">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1">
            <button
              onClick={() => setFilterCategory('all')}
              className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterCategory === 'all'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Semua ({courses.length})
            </button>
            <button
              onClick={() => setFilterCategory('praktikum')}
              className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterCategory === 'praktikum'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Praktikum ({courses.filter((c) => c.kategori === 'Praktikum').length})
            </button>
            <button
              onClick={() => setFilterCategory('wajib')}
              className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterCategory === 'wajib'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Teori / Wajib ({courses.filter((c) => c.kategori === 'Wajib').length})
            </button>
            <button
              onClick={() => setFilterCategory('lulus')}
              className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterCategory === 'lulus'
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Lulus ({courses.filter((c) => c.statusLulus).length})
            </button>
            {courses.some((c) => !c.statusLulus) && (
              <button
                onClick={() => setFilterCategory('mengulang')}
                className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                  filterCategory === 'mengulang'
                    ? 'bg-rose-700 text-white font-semibold'
                    : 'bg-white text-rose-700 border border-rose-200 hover:bg-rose-50'
                }`}
              >
                Mengulang ({courses.filter((c) => !c.statusLulus).length})
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
              <ArrowUpDown className="w-3.5 h-3.5" /> Urutkan:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="min-h-[44px] px-3 py-2 text-xs font-medium rounded-lg border border-slate-300 bg-white"
            >
              <option value="default">Urutan Asal</option>
              <option value="nilai-desc">Nilai Tertinggi &darr;</option>
              <option value="nilai-asc">Nilai Terendah &uarr;</option>
              <option value="sks-desc">SKS Terbesar</option>
              <option value="nama">Nama Mata Kuliah (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Empty State */}
      {sortedCourses.length === 0 ? (
        <div className="p-12 text-center">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-slate-800">
            {courses.length === 0 ? 'Belum ada mata kuliah yang ditambahkan' : 'Tidak ada mata kuliah yang cocok dengan filter'}
          </h3>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            {courses.length === 0
              ? 'Tambahkan mata kuliah menggunakan form di atas, atau klik "Terapkan Semester" untuk memuat kurikulum otomatis.'
              : 'Ganti filter atau klik "Semua" untuk melihat seluruh mata kuliah.'}
          </p>
          {courses.length === 0 && (
            <button
              onClick={() => handleApplyPreset(3)}
              className="mt-4 min-h-[44px] px-4 py-2 bg-emerald-800 text-white rounded-xl text-xs font-semibold hover:bg-emerald-900 transition-colors inline-flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Muat Mata Kuliah Semester 3 UNUGHA</span>
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Kode & Mata Kuliah</th>
                  <th className="py-3 px-3 text-center">SKS</th>
                  <th className="py-3 px-3 text-center">Kategori</th>
                  <th className="py-3 px-3 text-center">Presensi (10%)</th>
                  <th className="py-3 px-3 text-center">Tugas (20%)</th>
                  <th className="py-3 px-3 text-center">Kuis (15%)</th>
                  <th className="py-3 px-3 text-center">UTS (25%)</th>
                  <th className="py-3 px-3 text-center">UAS (30%)</th>
                  <th className="py-3 px-3 text-center font-bold text-slate-900">Nilai Akhir</th>
                  <th className="py-3 px-3 text-center">Grade</th>
                  <th className="py-3 px-3 text-center">Bobot Mutu</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sortedCourses.map((mk) => {
                  const bobotSKS = Number((mk.sks * mk.bobot).toFixed(2));
                  return (
                    <tr key={mk.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{mk.nama}</div>
                        <div className="font-mono text-[11px] text-slate-500">{mk.kode}</div>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-medium">
                        {mk.sks}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-[11px] text-slate-600 font-medium">
                          {mk.kategori || 'Wajib'}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">
                        {mk.nilaiKehadiran}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">
                        {mk.nilaiTugas}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">
                        {mk.nilaiKuis}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">
                        {mk.nilaiUTS}
                      </td>
                      <td className="py-3 px-3 text-center font-mono text-slate-600">
                        {mk.nilaiUAS}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-slate-900 text-sm">
                        {mk.nilaiAkhir.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-bold text-sm">
                        <span className={mk.statusLulus ? 'text-emerald-700' : 'text-rose-600'}>
                          {mk.hurufMutu}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-center font-mono font-medium text-slate-700">
                        {bobotSKS.toFixed(2)}
                        <span className="text-[10px] text-slate-400 block font-normal">
                          ({mk.bobot.toFixed(2)} &times; {mk.sks})
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          {/* Quick Adjust +/- Buttons (44px min hitbox) */}
                          <div className="flex items-center mr-2 border border-slate-200 rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleQuickAdjust(mk, -2)}
                              title="Kurangi nilai -2 (Simulasi cepat)"
                              className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleQuickAdjust(mk, 2)}
                              title="Tambah nilai +2 (Simulasi cepat)"
                              className="min-h-[44px] min-w-[44px] flex items-center justify-center hover:bg-slate-100 text-slate-600 transition-colors border-l border-slate-200"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            onClick={() => onEditCourse(mk)}
                            title="Edit Komponen Nilai"
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => onDeleteCourse(mk.id)}
                            title="Hapus Mata Kuliah"
                            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile & Tablet Card Layout (Optimized for Thumb Zone & Touch >= 44px) */}
          <div className="lg:hidden divide-y divide-slate-200">
            {sortedCourses.map((mk) => {
              const bobotSKS = Number((mk.sks * mk.bobot).toFixed(2));
              const isExpanded = expandedCourseId === mk.id;

              return (
                <div key={mk.id} className="p-4 hover:bg-slate-50/60 transition-colors">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                          {mk.kode}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">
                          {mk.sks} SKS &middot; {mk.kategori || 'Wajib'}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 mt-1 leading-snug">
                        {mk.nama}
                      </h3>
                    </div>

                    <div className="text-right">
                      <div className="font-mono text-lg font-extrabold text-slate-900">
                        {mk.nilaiAkhir.toFixed(2)}
                      </div>
                      <div className={`font-mono text-xs font-bold ${mk.statusLulus ? 'text-emerald-700' : 'text-rose-600'}`}>
                        Grade {mk.hurufMutu} ({mk.bobot.toFixed(2)})
                      </div>
                    </div>
                  </div>

                  {/* Component Breakdown preview */}
                  <div className="mt-3 grid grid-cols-5 gap-1 text-center bg-slate-50 p-2 rounded-lg text-[10px] text-slate-600 font-mono">
                    <div>
                      <span className="text-slate-400 block text-[9px]">Hadir</span>
                      {mk.nilaiKehadiran}
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Tugas</span>
                      {mk.nilaiTugas}
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">Kuis</span>
                      {mk.nilaiKuis}
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">UTS</span>
                      {mk.nilaiUTS}
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">UAS</span>
                      {mk.nilaiUAS}
                    </div>
                  </div>

                  {/* Action buttons (Touch-Friendly: all >= 44px) */}
                  <div className="mt-3 flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
                    {/* Quick increment/decrement */}
                    <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => handleQuickAdjust(mk, -2)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 active:bg-slate-200 text-xs font-bold"
                        aria-label="Kurangi nilai 2 poin"
                      >
                        -2
                      </button>
                      <button
                        onClick={() => handleQuickAdjust(mk, 2)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-600 active:bg-slate-200 text-xs font-bold border-l border-slate-200"
                        aria-label="Tambah nilai 2 poin"
                      >
                        +2
                      </button>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onEditCourse(mk)}
                        className="min-h-[44px] px-3 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium flex items-center gap-1.5 active:bg-slate-100"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => onDeleteCourse(mk.id)}
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg border border-rose-200 text-rose-600 active:bg-rose-50"
                        aria-label="Hapus mata kuliah"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

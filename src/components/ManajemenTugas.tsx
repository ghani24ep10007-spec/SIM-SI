import React, { useState, useEffect } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Trash2, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Calendar, 
  Check, 
  Tag, 
  Filter,
  ExternalLink
} from 'lucide-react';
import { TugasKuliah, MataKuliah } from '../types';

interface ManajemenTugasProps {
  tasks: TugasKuliah[];
  courses: MataKuliah[];
  onAddTask: (task: TugasKuliah) => void;
  onUpdateTask: (task: TugasKuliah) => void;
  onDeleteTask: (id: string) => void;
}

export const ManajemenTugas: React.FC<ManajemenTugasProps> = ({
  tasks,
  courses,
  onAddTask,
  onUpdateTask,
  onDeleteTask,
}) => {
  // Form State
  const [judul, setJudul] = useState('');
  const [mataKuliah, setMataKuliah] = useState('');
  const [deadline, setDeadline] = useState('2026-10-31T23:59');
  const [prioritas, setPrioritas] = useState<'tinggi' | 'sedang' | 'rendah'>('tinggi');
  const [catatan, setCatatan] = useState('');
  const [tautan, setTautan] = useState('');

  // Validation States (Instant Visual Feedback)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Filter State
  const [filterStatus, setFilterStatus] = useState<'semua' | 'aktif' | 'selesai' | 'tinggi'>('semua');

  // Set default course when courses load
  useEffect(() => {
    if (courses.length > 0 && !mataKuliah) {
      setMataKuliah(courses[0].nama);
    }
  }, [courses, mataKuliah]);

  // Live Instant Validation
  useEffect(() => {
    const errs: Record<string, string> = {};
    if (!judul.trim()) {
      errs.judul = 'Judul tugas praktikum wajib diisi.';
    } else if (judul.trim().length < 4) {
      errs.judul = 'Judul tugas minimal 4 karakter.';
    }

    if (!mataKuliah.trim()) {
      errs.mataKuliah = 'Pilih mata kuliah terkait.';
    }

    if (!deadline) {
      errs.deadline = 'Tenggat waktu deadline harus ditentukan.';
    }

    setErrors(errs);
  }, [judul, mataKuliah, deadline]);

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ judul: true, mataKuliah: true, deadline: true });

    if (Object.keys(errors).length > 0) return;

    const newTask: TugasKuliah = {
      id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      judul: judul.trim(),
      mataKuliah: mataKuliah.trim(),
      deadline,
      prioritas,
      status: 'belum',
      catatan: catatan.trim() || undefined,
      tautan: tautan.trim() || undefined,
      createdAt: new Date().toISOString(),
    };

    onAddTask(newTask);
    setJudul('');
    setCatatan('');
    setTautan('');
    setTouched({});
  };

  // Status progression cycle
  const cycleStatus = (task: TugasKuliah) => {
    const sequence: TugasKuliah['status'][] = ['belum', 'proses', 'siap_kumpul', 'selesai'];
    const nextIdx = (sequence.indexOf(task.status) + 1) % sequence.length;
    const nextStatus = sequence[nextIdx];
    
    onUpdateTask({
      ...task,
      status: nextStatus,
      completedAt: nextStatus === 'selesai' ? new Date().toISOString() : undefined,
    });
  };

  // Helper for deadline countdown
  const getDeadlineInfo = (deadlineStr: string) => {
    const diff = new Date(deadlineStr).getTime() - new Date().getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (diff < 0) {
      return { label: 'Terlewat', color: 'text-rose-600 bg-rose-50 border-rose-200' };
    } else if (days === 0) {
      return { label: 'Hari Ini!', color: 'text-amber-700 bg-amber-50 border-amber-200 animate-pulse' };
    } else if (days <= 3) {
      return { label: `${days} hari lagi`, color: 'text-orange-700 bg-orange-50 border-orange-200' };
    } else {
      return { label: `${days} hari lagi`, color: 'text-slate-600 bg-slate-50 border-slate-200' };
    }
  };

  // Filter tasks
  const filteredTasks = tasks.filter((t) => {
    if (filterStatus === 'aktif') return t.status !== 'selesai';
    if (filterStatus === 'selesai') return t.status === 'selesai';
    if (filterStatus === 'tinggi') return t.prioritas === 'tinggi' && t.status !== 'selesai';
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-emerald-600" />
              <span>Manajemen Tugas & Praktikum Mahasiswa SI</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Pelacakan deadline tugas dengan validasi formulir instan, filter dinamis, dan sinkronisasi localStorage otomatis.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              {tasks.filter((t) => t.status === 'selesai').length} / {tasks.length} Selesai
            </span>
          </div>
        </div>
      </div>

      {/* Form Tambah Tugas with Instant Feedback */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Plus className="w-4 h-4 text-emerald-600" />
          <span>Tambah Tugas Baru</span>
        </h3>

        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {/* Judul Tugas */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Judul Tugas / Praktikum <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  onBlur={() => handleBlur('judul')}
                  placeholder="misal: Tugas 2: Pemrograman Web Interaktif DOM & LocalStorage"
                  className={`w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border transition-all ${
                    touched.judul && errors.judul
                      ? 'border-rose-500 bg-rose-50/40 text-rose-900 focus:ring-2 focus:ring-rose-200'
                      : touched.judul && !errors.judul
                      ? 'border-emerald-500 bg-emerald-50/30 text-slate-900 focus:ring-2 focus:ring-emerald-200'
                      : 'border-slate-300 focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100'
                  }`}
                />
                {touched.judul && !errors.judul && (
                  <Check className="w-4 h-4 text-emerald-600 absolute right-3 top-3.5 pointer-events-none" />
                )}
              </div>
              {touched.judul && errors.judul ? (
                <p className="text-[11px] text-rose-600 mt-1 flex items-center gap-1 font-medium">
                  <AlertCircle className="w-3 h-3 inline" /> {errors.judul}
                </p>
              ) : (
                <p className="text-[11px] text-slate-500 mt-1">Nama spesifik tugas praktikum</p>
              )}
            </div>

            {/* Mata Kuliah */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mata Kuliah Terkait <span className="text-rose-500">*</span>
              </label>
              <select
                value={mataKuliah}
                onChange={(e) => setMataKuliah(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
              >
                {courses.length > 0 ? (
                  courses.map((mk) => (
                    <option key={mk.id} value={mk.nama}>
                      {mk.kode} - {mk.nama}
                    </option>
                  ))
                ) : (
                  <option value="Pemrograman Web">Pemrograman Web</option>
                )}
              </select>
            </div>

            {/* Deadline */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tenggat Waktu (Deadline) <span className="text-rose-500">*</span>
              </label>
              <input
                type="datetime-local"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white font-mono"
              />
            </div>

            {/* Prioritas */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tingkat Prioritas
              </label>
              <select
                value={prioritas}
                onChange={(e) => setPrioritas(e.target.value as any)}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
              >
                <option value="tinggi">Prioritas Tinggi (Mendesak)</option>
                <option value="sedang">Prioritas Sedang</option>
                <option value="rendah">Prioritas Rendah</option>
              </select>
            </div>

            {/* Tautan URL / Repo */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tautan Repo / Drive (Opsional)
              </label>
              <input
                type="url"
                value={tautan}
                onChange={(e) => setTautan(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
              />
            </div>
          </div>

          {/* Catatan Tambahan */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Catatan Instruksi / Kebutuhan Praktikum (Opsional)
            </label>
            <input
              type="text"
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
              placeholder="misal: Format README lengkap, deploy Cloudflare Pages, tombol min 44px."
              className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 bg-white"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Simpan Tugas ke Database</span>
            </button>
          </div>
        </form>
      </div>

      {/* Task List Section with Filter Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Filter Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50/70 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setFilterStatus('semua')}
              className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'semua'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Semua ({tasks.length})
            </button>
            <button
              onClick={() => setFilterStatus('aktif')}
              className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'aktif'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Belum Selesai ({tasks.filter((t) => t.status !== 'selesai').length})
            </button>
            <button
              onClick={() => setFilterStatus('tinggi')}
              className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'tinggi'
                  ? 'bg-rose-700 text-white font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Prioritas Tinggi ({tasks.filter((t) => t.prioritas === 'tinggi' && t.status !== 'selesai').length})
            </button>
            <button
              onClick={() => setFilterStatus('selesai')}
              className={`min-h-[44px] px-3.5 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                filterStatus === 'selesai'
                  ? 'bg-emerald-700 text-white font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              Selesai ({tasks.filter((t) => t.status === 'selesai').length})
            </button>
          </div>

          <div className="text-xs text-slate-500 font-medium">
            Ketuk status tugas untuk mengubah status pengerjaan
          </div>
        </div>

        {/* Task Cards */}
        {filteredTasks.length === 0 ? (
          <div className="p-10 text-center text-slate-500 text-xs">
            Tidak ada tugas pada filter ini.
          </div>
        ) : (
          <div className="divide-y divide-slate-200">
            {filteredTasks.map((t) => {
              const deadlineInfo = getDeadlineInfo(t.deadline);
              const isCompleted = t.status === 'selesai';

              return (
                <div
                  key={t.id}
                  className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                    isCompleted ? 'bg-slate-50/50 opacity-80' : 'hover:bg-slate-50/80'
                  }`}
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-0.5 rounded">
                        {t.mataKuliah}
                      </span>
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${deadlineInfo.color}`}>
                        {deadlineInfo.label} &middot; {new Date(t.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </span>
                      {t.prioritas === 'tinggi' && (
                        <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          Prioritas Tinggi
                        </span>
                      )}
                    </div>

                    <h4 className={`text-sm sm:text-base font-bold text-slate-900 ${isCompleted ? 'line-through text-slate-500' : ''}`}>
                      {t.judul}
                    </h4>

                    {t.catatan && (
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        {t.catatan}
                      </p>
                    )}

                    {t.tautan && (
                      <a
                        href={t.tautan}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-emerald-700 hover:underline mt-1.5"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Buka Tautan Tugas</span>
                      </a>
                    )}
                  </div>

                  {/* Actions (Touch >= 44px) */}
                  <div className="flex items-center gap-2 shrink-0">
                    {/* Status Badge Button (1 Tap to Cycle) */}
                    <button
                      onClick={() => cycleStatus(t)}
                      className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border cursor-pointer ${
                        t.status === 'selesai'
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : t.status === 'siap_kumpul'
                          ? 'bg-blue-100 text-blue-900 border-blue-300'
                          : t.status === 'proses'
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200'
                      }`}
                      title="Klik untuk ubah status pengerjaan"
                    >
                      {t.status === 'selesai' && <CheckCircle className="w-4 h-4 text-emerald-700" />}
                      {t.status === 'siap_kumpul' && <Check className="w-4 h-4 text-blue-700" />}
                      {t.status === 'proses' && <Clock className="w-4 h-4 text-amber-700" />}
                      {t.status === 'belum' && <AlertCircle className="w-4 h-4 text-slate-600" />}
                      <span>
                        {t.status === 'selesai'
                          ? 'Selesai Dikirim'
                          : t.status === 'siap_kumpul'
                          ? 'Siap Kumpul'
                          : t.status === 'proses'
                          ? 'Sedang Dikerjakan'
                          : 'Belum Dimulai'}
                      </span>
                    </button>

                    <button
                      onClick={() => onDeleteTask(t.id)}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-rose-200"
                      aria-label="Hapus tugas"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

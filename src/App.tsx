import React, { useState, useEffect } from 'react';
import { 
  MataKuliah, 
  SemesterRecord, 
  TugasKuliah, 
  StudentProfile 
} from './types';
import { 
  STORAGE_KEYS, 
  DEFAULT_PROFILE, 
  DEFAULT_TASKS, 
  getStoredData, 
  setStoredData, 
  exportBackupData 
} from './utils/storage';
import { getDefaultMataKuliahList } from './data/kurikulumSI';
import { hitungStatistikSemester } from './utils/gradeCalculator';

import { TopNavigation } from './components/TopNavigation';
import { SummaryCard } from './components/SummaryCard';
import { CourseForm } from './components/CourseForm';
import { CourseList } from './components/CourseList';
import { ManajemenTugas } from './components/ManajemenTugas';
import { RiwayatKHS } from './components/RiwayatKHS';
import { PengumpulanModal } from './components/PengumpulanModal';
import { PanduanTeknis } from './components/PanduanTeknis';
import { TargetSimulatorModal } from './components/TargetSimulatorModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'kalkulator' | 'tugas' | 'riwayat' | 'pengumpulan' | 'dokumentasi'>('kalkulator');
  
  // Dark Mode State with LocalStorage Persistence
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('SIM_SI_THEME');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply dark class to <html>
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('SIM_SI_THEME', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('SIM_SI_THEME', 'light');
    }
  }, [darkMode]);

  // Persistent States
  const [courses, setCourses] = useState<MataKuliah[]>(() =>
    getStoredData<MataKuliah[]>(STORAGE_KEYS.COURSES, getDefaultMataKuliahList())
  );
  const [tasks, setTasks] = useState<TugasKuliah[]>(() =>
    getStoredData<TugasKuliah[]>(STORAGE_KEYS.TASKS, DEFAULT_TASKS)
  );
  const [history, setHistory] = useState<SemesterRecord[]>(() =>
    getStoredData<SemesterRecord[]>(STORAGE_KEYS.HISTORY, [])
  );
  const [profile, setProfile] = useState<StudentProfile>(() =>
    getStoredData<StudentProfile>(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE)
  );

  // Edit Course state
  const [editingCourse, setEditingCourse] = useState<MataKuliah | null>(null);

  // Target Simulator Modal
  const [isTargetModalOpen, setIsTargetModalOpen] = useState(false);

  // Touch Target visual inspector
  const [showTouchTargets, setShowTouchTargets] = useState(false);

  // Toast / Feedback State
  const [toast, setToast] = useState<{ message: string; undoAction?: () => void } | null>(null);

  // Toggle touch target highlight class on body
  useEffect(() => {
    if (showTouchTargets) {
      document.body.classList.add('show-touch-targets');
    } else {
      document.body.classList.remove('show-touch-targets');
    }
  }, [showTouchTargets]);

  // Synchronize courses to localStorage
  useEffect(() => {
    setStoredData(STORAGE_KEYS.COURSES, courses);
  }, [courses]);

  // Synchronize tasks to localStorage
  useEffect(() => {
    setStoredData(STORAGE_KEYS.TASKS, tasks);
  }, [tasks]);

  // Synchronize history to localStorage
  useEffect(() => {
    setStoredData(STORAGE_KEYS.HISTORY, history);
  }, [history]);

  // Synchronize profile to localStorage
  useEffect(() => {
    setStoredData(STORAGE_KEYS.PROFILE, profile);
  }, [profile]);

  // Toast auto-dismiss
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4500);
    return () => clearTimeout(timer);
  }, [toast]);

  // Calculated Stats for Current Semester
  const stats = hitungStatistikSemester(courses);

  // Handlers for Course CRUD
  const handleAddCourse = (course: MataKuliah) => {
    setCourses((prev) => [course, ...prev]);
    setToast({ message: `Mata kuliah "${course.nama}" berhasil ditambahkan.` });
  };

  const handleUpdateCourse = (updatedCourse: MataKuliah) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
    );
    setEditingCourse(null);
    setToast({ message: `Nilai "${updatedCourse.nama}" berhasil diperbarui.` });
  };

  const handleDeleteCourse = (id: string) => {
    const targetCourse = courses.find((c) => c.id === id);
    if (!targetCourse) return;
    const prevCourses = [...courses];
    setCourses((prev) => prev.filter((c) => c.id !== id));

    setToast({
      message: `Mata kuliah "${targetCourse.nama}" dihapus.`,
      undoAction: () => {
        setCourses(prevCourses);
        setToast({ message: `Penghapusan "${targetCourse.nama}" dibatalkan.` });
      },
    });
  };

  const handleLoadPreset = (presetCourses: MataKuliah[]) => {
    setCourses(presetCourses);
    setToast({ message: `${presetCourses.length} mata kuliah berhasil dimuat dari kurikulum.` });
  };

  const handleClearAllCourses = () => {
    if (window.confirm('Yakin ingin mengosongkan daftar mata kuliah semester ini?')) {
      const prev = [...courses];
      setCourses([]);
      setToast({
        message: 'Daftar mata kuliah dikosongkan.',
        undoAction: () => setCourses(prev),
      });
    }
  };

  // Handlers for Tasks CRUD
  const handleAddTask = (newTask: TugasKuliah) => {
    setTasks((prev) => [newTask, ...prev]);
    setToast({ message: `Tugas "${newTask.judul}" berhasil disimpan.` });
  };

  const handleUpdateTask = (updatedTask: TugasKuliah) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
  };

  const handleDeleteTask = (id: string) => {
    const target = tasks.find((t) => t.id === id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (target) {
      setToast({ message: `Tugas "${target.judul}" dihapus.` });
    }
  };

  // Handlers for History & Snapshots
  const handleSaveCurrentSemester = (name: string) => {
    const record: SemesterRecord = {
      id: `sem-${Date.now()}`,
      namaSemester: name,
      tahunAkademik: '2026/2027 Ganjil',
      tanggalSimpan: new Date().toISOString(),
      daftarMK: [...courses],
      totalSKS: stats.totalSKS,
      sksLulus: stats.sksLulus,
      ipSemester: stats.ipSemester,
      totalMutu: stats.totalMutu,
    };
    setHistory((prev) => [record, ...prev]);
    setToast({ message: `Snapshot "${name}" berhasil disimpan ke riwayat.` });
  };

  const handleRestoreSnapshot = (record: SemesterRecord) => {
    setCourses([...record.daftarMK]);
    setActiveTab('kalkulator');
    setToast({ message: `Snapshot "${record.namaSemester}" dibuka di kalkulator.` });
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((h) => h.id !== id));
    setToast({ message: 'Snapshot riwayat dihapus.' });
  };

  const handleExportBackup = () => {
    const jsonStr = exportBackupData();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `backup_sim_si_${profile.nim}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast({ message: 'File cadangan JSON berhasil diunduh.' });
  };

  const handleRefreshAllData = () => {
    setCourses(getStoredData(STORAGE_KEYS.COURSES, getDefaultMataKuliahList()));
    setTasks(getStoredData(STORAGE_KEYS.TASKS, DEFAULT_TASKS));
    setHistory(getStoredData(STORAGE_KEYS.HISTORY, []));
    setProfile(getStoredData(STORAGE_KEYS.PROFILE, DEFAULT_PROFILE));
    setToast({ message: 'Data lokal berhasil dimuat ulang.' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-20 md:pb-12 transition-colors duration-200">
      {/* Top Bar Contract Navigation with Dark Mode & Blue-Green Styling */}
      <TopNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showTouchTargets={showTouchTargets}
        setShowTouchTargets={setShowTouchTargets}
        onExportBackup={handleExportBackup}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'kalkulator' && (
          <div>
            <SummaryCard
              stats={stats}
              profile={profile}
              onOpenTargetModal={() => setIsTargetModalOpen(true)}
            />

            <CourseForm
              onAddCourse={handleAddCourse}
              editingCourse={editingCourse}
              onUpdateCourse={handleUpdateCourse}
              onCancelEdit={() => setEditingCourse(null)}
            />

            <CourseList
              courses={courses}
              onDeleteCourse={handleDeleteCourse}
              onEditCourse={(course) => {
                setEditingCourse(course);
                window.scrollTo({ top: 380, behavior: 'smooth' });
              }}
              onUpdateCourse={handleUpdateCourse}
              onLoadPreset={handleLoadPreset}
              onClearAll={handleClearAllCourses}
            />
          </div>
        )}

        {activeTab === 'tugas' && (
          <ManajemenTugas
            tasks={tasks}
            courses={courses}
            onAddTask={handleAddTask}
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        )}

        {activeTab === 'riwayat' && (
          <RiwayatKHS
            history={history}
            courses={courses}
            profile={profile}
            stats={stats}
            onSaveCurrentSemester={handleSaveCurrentSemester}
            onRestoreSnapshot={handleRestoreSnapshot}
            onDeleteHistory={handleDeleteHistory}
            onRefreshData={handleRefreshAllData}
          />
        )}

        {activeTab === 'pengumpulan' && (
          <PengumpulanModal profile={profile} />
        )}

        {activeTab === 'dokumentasi' && (
          <PanduanTeknis />
        )}
      </main>

      {/* Target Simulator Modal */}
      <TargetSimulatorModal
        isOpen={isTargetModalOpen}
        onClose={() => setIsTargetModalOpen(false)}
        profile={profile}
        onUpdateProfile={setProfile}
        currentSemesterSKS={stats.totalSKS}
      />

      {/* Floating Toast Notification with Undo */}
      {toast && (
        <div className="fixed bottom-20 md:bottom-6 right-4 left-4 sm:left-auto sm:right-6 z-50 max-w-md bg-slate-900 dark:bg-slate-800 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-800 dark:border-slate-700 flex items-center justify-between gap-3 text-xs animate-in fade-in slide-in-from-bottom-5">
          <span className="leading-snug">{toast.message}</span>
          {toast.undoAction && (
            <button
              onClick={toast.undoAction}
              className="min-h-[44px] px-3 py-1 font-bold text-teal-400 hover:text-teal-300 underline shrink-0 cursor-pointer"
            >
              Batalkan
            </button>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            Sistem Informasi Mahasiswa (SIM-SI) &middot; Universitas Nahdlatul Ulama Al Ghazali (UNUGHA) Cilacap
          </p>
          <p className="mt-1 text-[11px] text-slate-400 dark:text-slate-500">
            Tugas 2 Praktikum Pemrograman Web (Prt. 7) &middot; Mahasiswa: {profile.nama} ({profile.nim}) &middot; Kelas {profile.kelas}
          </p>
        </div>
      </footer>
    </div>
  );
}

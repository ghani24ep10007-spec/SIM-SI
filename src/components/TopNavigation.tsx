import React from 'react';
import { 
  Calculator, 
  CheckSquare, 
  History, 
  FileText, 
  Send, 
  Smartphone, 
  Download,
  BookOpen,
  Moon,
  Sun
} from 'lucide-react';

interface TopNavigationProps {
  activeTab: 'kalkulator' | 'tugas' | 'riwayat' | 'pengumpulan' | 'dokumentasi';
  setActiveTab: (tab: 'kalkulator' | 'tugas' | 'riwayat' | 'pengumpulan' | 'dokumentasi') => void;
  showTouchTargets: boolean;
  setShowTouchTargets: (val: boolean) => void;
  onExportBackup: () => void;
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  setActiveTab,
  showTouchTargets,
  setShowTouchTargets,
  onExportBackup,
  darkMode,
  setDarkMode,
}) => {
  return (
    <>
      {/* Desktop & Tablet Top Bar (Adhering to Top Bar Contract: 3 zones, single-line text brand) */}
      <header className="sticky top-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Single text wordmark with blue-green branding */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('kalkulator')}
              className="text-left group cursor-pointer focus:outline-none flex items-center gap-2.5"
            >
              <div className="w-8 h-8 rounded-lg bg-teal-600 dark:bg-teal-500 flex items-center justify-center font-bold text-white text-xs shadow-sm">
                SI
              </div>
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                SIM-SI <span className="text-teal-600 dark:text-teal-400">UNUGHA</span>
              </span>
            </button>
            <span className="hidden sm:inline-block text-xs font-mono text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800/60 px-2 py-0.5 rounded">
              Prt. 7 Tugas 2
            </span>
          </div>

          {/* Zone 2: Navigation Links (Biru Kehijauan / Teal theme) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <button
              onClick={() => setActiveTab('kalkulator')}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'kalkulator'
                  ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800/70'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Kalkulator IPK</span>
            </button>

            <button
              onClick={() => setActiveTab('tugas')}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'tugas'
                  ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800/70'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Manajemen Tugas</span>
            </button>

            <button
              onClick={() => setActiveTab('riwayat')}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'riwayat'
                  ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800/70'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <History className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Riwayat & KHS</span>
            </button>

            <button
              onClick={() => setActiveTab('pengumpulan')}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'pengumpulan'
                  ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800/70'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Send className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Form Pengumpulan</span>
            </button>

            <button
              onClick={() => setActiveTab('dokumentasi')}
              className={`min-h-[44px] px-3.5 py-2 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer ${
                activeTab === 'dokumentasi'
                  ? 'bg-teal-50 dark:bg-teal-950/70 text-teal-800 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800/70'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4 text-teal-600 dark:text-teal-400" />
              <span>Panduan Teknis</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Dark mode toggle, Touch mode inspector, and Export) */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle Button (Touch >= 44px) */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              title={darkMode ? 'Beralih ke Mode Terang (Light Mode)' : 'Beralih ke Mode Gelap (Dark Mode)'}
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center justify-center cursor-pointer shadow-xs"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-teal-600" />
              )}
            </button>

            <button
              onClick={() => setShowTouchTargets(!showTouchTargets)}
              title="Periksa Area Sentuh Touch >= 44px (Fitur Uji Dosen)"
              className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-colors cursor-pointer ${
                showTouchTargets
                  ? 'bg-teal-600 text-white border-teal-600 dark:bg-teal-500'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Uji Touch ≥44px</span>
            </button>

            <button
              onClick={onExportBackup}
              title="Ekspor Data JSON LocalStorage"
              className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 dark:bg-teal-600 hover:bg-slate-800 dark:hover:bg-teal-500 text-white transition-colors flex items-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cadangkan Data</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Thumb Zone Ergonomics, each tab min 44px hitbox) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg">
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
          <button
            onClick={() => setActiveTab('kalkulator')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'kalkulator' 
                ? 'text-teal-600 dark:text-teal-400 font-bold' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Calculator className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Kalkulator</span>
          </button>

          <button
            onClick={() => setActiveTab('tugas')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'tugas' 
                ? 'text-teal-600 dark:text-teal-400 font-bold' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <CheckSquare className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Tugas</span>
          </button>

          <button
            onClick={() => setActiveTab('riwayat')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'riwayat' 
                ? 'text-teal-600 dark:text-teal-400 font-bold' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <History className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Riwayat</span>
          </button>

          <button
            onClick={() => setActiveTab('pengumpulan')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'pengumpulan' 
                ? 'text-teal-600 dark:text-teal-400 font-bold' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <Send className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Form LMS</span>
          </button>

          <button
            onClick={() => setActiveTab('dokumentasi')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'dokumentasi' 
                ? 'text-teal-600 dark:text-teal-400 font-bold' 
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            <BookOpen className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Panduan</span>
          </button>
        </div>
      </div>
    </>
  );
};

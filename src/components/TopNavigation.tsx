import React from 'react';
import { 
  Calculator, 
  CheckSquare, 
  History, 
  FileText, 
  Send, 
  Smartphone, 
  Download,
  BookOpen
} from 'lucide-react';

interface TopNavigationProps {
  activeTab: 'kalkulator' | 'tugas' | 'riwayat' | 'pengumpulan' | 'dokumentasi';
  setActiveTab: (tab: 'kalkulator' | 'tugas' | 'riwayat' | 'pengumpulan' | 'dokumentasi') => void;
  showTouchTargets: boolean;
  setShowTouchTargets: (val: boolean) => void;
  onExportBackup: () => void;
}

export const TopNavigation: React.FC<TopNavigationProps> = ({
  activeTab,
  setActiveTab,
  showTouchTargets,
  setShowTouchTargets,
  onExportBackup,
}) => {
  return (
    <>
      {/* Desktop & Tablet Top Bar (Adhering to Top Bar Contract: 3 zones, single-line text brand) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Single text wordmark */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('kalkulator')}
              className="text-left group cursor-pointer focus:outline-none"
            >
              <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                SIM-SI UNUGHA
              </span>
            </button>
            <span className="hidden sm:inline-block text-xs font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              Prt. 7 Tugas 2
            </span>
          </div>

          {/* Zone 2: Navigation Links (Clean text links with active indicator) */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setActiveTab('kalkulator')}
              className={`min-h-[44px] px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'kalkulator'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Kalkulator IPK</span>
            </button>

            <button
              onClick={() => setActiveTab('tugas')}
              className={`min-h-[44px] px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'tugas'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <CheckSquare className="w-4 h-4 text-emerald-600" />
              <span>Manajemen Tugas</span>
            </button>

            <button
              onClick={() => setActiveTab('riwayat')}
              className={`min-h-[44px] px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'riwayat'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <History className="w-4 h-4 text-emerald-600" />
              <span>Riwayat & KHS</span>
            </button>

            <button
              onClick={() => setActiveTab('pengumpulan')}
              className={`min-h-[44px] px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'pengumpulan'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Send className="w-4 h-4 text-emerald-600" />
              <span>Form Pengumpulan</span>
            </button>

            <button
              onClick={() => setActiveTab('dokumentasi')}
              className={`min-h-[44px] px-3.5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                activeTab === 'dokumentasi'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Panduan Teknis</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions (Touch mode inspector & Export backup) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTouchTargets(!showTouchTargets)}
              title="Periksa Area Sentuh Touch >= 44px (Fitur Uji Dosen)"
              className={`min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                showTouchTargets
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Uji Touch ≥44px</span>
            </button>

            <button
              onClick={onExportBackup}
              title="Ekspor Data JSON LocalStorage"
              className="min-h-[44px] px-3 py-2 rounded-lg text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cadangkan Data</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fixed Bottom Navigation Bar (Thumb Zone Ergonomics, each tab min 44px hitbox) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-lg">
        <div className="grid grid-cols-5 h-16 max-w-md mx-auto items-center px-1">
          <button
            onClick={() => setActiveTab('kalkulator')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'kalkulator' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calculator className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Kalkulator</span>
          </button>

          <button
            onClick={() => setActiveTab('tugas')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'tugas' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckSquare className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Tugas</span>
          </button>

          <button
            onClick={() => setActiveTab('riwayat')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'riwayat' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <History className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Riwayat</span>
          </button>

          <button
            onClick={() => setActiveTab('pengumpulan')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'pengumpulan' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Send className="w-5 h-5 mb-0.5" />
            <span className="text-[10px] tracking-tight">Form LMS</span>
          </button>

          <button
            onClick={() => setActiveTab('dokumentasi')}
            className={`min-h-[44px] flex flex-col items-center justify-center rounded-lg transition-colors ${
              activeTab === 'dokumentasi' ? 'text-emerald-700 font-bold' : 'text-slate-600 hover:text-slate-900'
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

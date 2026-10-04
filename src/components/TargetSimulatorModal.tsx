import React, { useState } from 'react';
import { Sparkles, X, Target, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { StudentProfile } from '../types';
import { hitungTargetIPK } from '../utils/gradeCalculator';

interface TargetSimulatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile;
  onUpdateProfile: (updated: StudentProfile) => void;
  currentSemesterSKS: number;
}

export const TargetSimulatorModal: React.FC<TargetSimulatorModalProps> = ({
  isOpen,
  onClose,
  profile,
  onUpdateProfile,
  currentSemesterSKS,
}) => {
  const [ipkLalu, setIpkLalu] = useState<number>(profile.ipkLalu || 3.75);
  const [sksLalu, setSksLalu] = useState<number>(profile.sksLalu || 42);
  const [targetIPK, setTargetIPK] = useState<number>(profile.targetIPK || 3.85);

  if (!isOpen) return null;

  const result = hitungTargetIPK(ipkLalu, sksLalu, currentSemesterSKS, targetIPK);

  const handleSave = () => {
    onUpdateProfile({
      ...profile,
      ipkLalu,
      sksLalu,
      targetIPK,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-800">
              <Target className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                Simulator Target IPK Kumulatif
              </h3>
              <p className="text-[11px] text-slate-500">
                Hitung target nilai semester ini untuk meraih predikat impian
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="min-h-[44px] min-w-[44px] flex items-center justify-center text-slate-400 hover:text-slate-700 rounded-lg"
            aria-label="Tutup modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                IPK Semester Lalu
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={ipkLalu}
                onChange={(e) => setIpkLalu(Number(e.target.value))}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">Skala 0.00 - 4.00</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Total SKS Telah Ditempuh
              </label>
              <input
                type="number"
                min="0"
                max="160"
                value={sksLalu}
                onChange={(e) => setSksLalu(Number(e.target.value))}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-slate-300 font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">SKS kumulatif lalu</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                SKS Semester Ini (Aktif)
              </label>
              <div className="min-h-[44px] px-3 py-2.5 text-sm rounded-xl border border-slate-200 bg-slate-100 font-mono font-bold text-slate-800 flex items-center">
                {currentSemesterSKS} SKS
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Dari daftar mata kuliah aktif</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target IPK Kumulatif
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={targetIPK}
                onChange={(e) => setTargetIPK(Number(e.target.value))}
                className="w-full min-h-[44px] px-3 py-2 text-sm rounded-xl border border-emerald-500 bg-emerald-50/20 font-mono font-bold text-emerald-900"
              />
              <span className="text-[10px] text-emerald-700 mt-1 block">Target yang ingin dicapai</span>
            </div>
          </div>

          {/* Result Card */}
          <div className={`p-4 rounded-xl border ${result.dapatDicapai ? 'bg-emerald-50/70 border-emerald-200' : 'bg-rose-50/70 border-rose-200'}`}>
            <div className="flex items-start gap-3">
              {result.dapatDicapai ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div>
                <div className="text-xs font-semibold text-slate-700">Hasil Analisis Kebutuhan:</div>
                <div className="text-2xl font-black font-mono mt-0.5 text-slate-900">
                  IPS Minimal: {result.ipsDibutuhkan.toFixed(2)}
                </div>
                <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                  {result.pesan}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-xl"
          >
            Batal
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="min-h-[44px] px-5 py-2 text-xs font-semibold bg-emerald-800 hover:bg-emerald-900 text-white rounded-xl shadow-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            <span>Simpan Target ke Profil</span>
          </button>
        </div>
      </div>
    </div>
  );
};

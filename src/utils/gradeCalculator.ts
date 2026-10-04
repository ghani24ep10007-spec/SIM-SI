import { MataKuliah } from '../types';

export interface GradeConversion {
  huruf: 'A' | 'A-' | 'B+' | 'B' | 'B-' | 'C+' | 'C' | 'D' | 'E';
  bobot: number;
  statusLulus: boolean;
  keterangan: string;
}

export function hitungNilaiAkhir(
  kehadiran: number,
  tugas: number,
  kuis: number,
  uts: number,
  uas: number
): number {
  const na = (kehadiran * 0.10) + (tugas * 0.20) + (kuis * 0.15) + (uts * 0.25) + (uas * 0.30);
  return Number(Math.min(100, Math.max(0, na)).toFixed(2));
}

export function konversiNilai(nilaiAkhir: number): GradeConversion {
  if (nilaiAkhir >= 85) {
    return { huruf: 'A', bobot: 4.00, statusLulus: true, keterangan: 'Sangat Baik' };
  } else if (nilaiAkhir >= 80) {
    return { huruf: 'A-', bobot: 3.75, statusLulus: true, keterangan: 'Hampir Sangat Baik' };
  } else if (nilaiAkhir >= 75) {
    return { huruf: 'B+', bobot: 3.50, statusLulus: true, keterangan: 'Lebih dari Baik' };
  } else if (nilaiAkhir >= 70) {
    return { huruf: 'B', bobot: 3.00, statusLulus: true, keterangan: 'Baik' };
  } else if (nilaiAkhir >= 65) {
    return { huruf: 'B-', bobot: 2.75, statusLulus: true, keterangan: 'Cukup Baik' };
  } else if (nilaiAkhir >= 60) {
    return { huruf: 'C+', bobot: 2.50, statusLulus: true, keterangan: 'Lebih dari Cukup' };
  } else if (nilaiAkhir >= 55) {
    return { huruf: 'C', bobot: 2.00, statusLulus: true, keterangan: 'Cukup' };
  } else if (nilaiAkhir >= 40) {
    return { huruf: 'D', bobot: 1.00, statusLulus: false, keterangan: 'Kurang (Perlu Remidi)' };
  } else {
    return { huruf: 'E', bobot: 0.00, statusLulus: false, keterangan: 'Gagal (Mengulang)' };
  }
}

export function hitungStatistikSemester(daftarMK: MataKuliah[]) {
  const totalSKS = daftarMK.reduce((acc, mk) => acc + (Number(mk.sks) || 0), 0);
  const totalMutu = daftarMK.reduce((acc, mk) => acc + ((Number(mk.sks) || 0) * (Number(mk.bobot) || 0)), 0);
  const sksLulus = daftarMK
    .filter((mk) => mk.statusLulus)
    .reduce((acc, mk) => acc + (Number(mk.sks) || 0), 0);

  const ipSemester = totalSKS > 0 ? Number((totalMutu / totalSKS).toFixed(2)) : 0.00;

  // Predikat
  let predikat = 'Belum Ada Nilai';
  let predikatColor = 'text-slate-600';
  if (totalSKS > 0) {
    if (ipSemester >= 3.51) {
      predikat = 'Dengan Pujian (Cum Laude)';
      predikatColor = 'text-emerald-700';
    } else if (ipSemester >= 3.01) {
      predikat = 'Sangat Memuaskan';
      predikatColor = 'text-blue-700';
    } else if (ipSemester >= 2.76) {
      predikat = 'Memuaskan';
      predikatColor = 'text-cyan-700';
    } else if (ipSemester >= 2.00) {
      predikat = 'Cukup';
      predikatColor = 'text-amber-700';
    } else {
      predikat = 'Perlu Bimbingan Akademik';
      predikatColor = 'text-rose-700';
    }
  }

  // Maksimum SKS Semester Depan (Standar SN-Dikti / UNUGHA)
  let maxSKSDepan = 20;
  if (totalSKS > 0) {
    if (ipSemester >= 3.00) {
      maxSKSDepan = 24;
    } else if (ipSemester >= 2.50) {
      maxSKSDepan = 21;
    } else if (ipSemester >= 2.00) {
      maxSKSDepan = 18;
    } else {
      maxSKSDepan = 15;
    }
  }

  return {
    totalSKS,
    totalMutu: Number(totalMutu.toFixed(2)),
    sksLulus,
    ipSemester,
    predikat,
    predikatColor,
    maxSKSDepan,
    jumlahMK: daftarMK.length,
    jumlahLulus: daftarMK.filter(mk => mk.statusLulus).length,
    jumlahTidakLulus: daftarMK.filter(mk => !mk.statusLulus).length,
  };
}

export function hitungTargetIPK(
  ipkLalu: number,
  sksLalu: number,
  sksSemesterIni: number,
  targetIPKKumulatif: number
): { ipsDibutuhkan: number; dapatDicapai: boolean; pesan: string } {
  if (sksSemesterIni <= 0) {
    return {
      ipsDibutuhkan: 0,
      dapatDicapai: false,
      pesan: 'Masukkan mata kuliah semester ini terlebih dahulu.',
    };
  }

  const totalSKSKelak = sksLalu + sksSemesterIni;
  const totalMutuDiinginkan = targetIPKKumulatif * totalSKSKelak;
  const mutuLalu = ipkLalu * sksLalu;
  const mutuDibutuhkanSemesterIni = totalMutuDiinginkan - mutuLalu;
  const ipsDibutuhkan = Number((mutuDibutuhkanSemesterIni / sksSemesterIni).toFixed(2));

  if (ipsDibutuhkan <= 0) {
    return {
      ipsDibutuhkan: 0,
      dapatDicapai: true,
      pesan: `Target sangat aman! Kamu hanya butuh IPS minimal 0.00 untuk menjaga target IPK ${targetIPKKumulatif.toFixed(2)}.`,
    };
  } else if (ipsDibutuhkan > 4.00) {
    return {
      ipsDibutuhkan,
      dapatDicapai: false,
      pesan: `Target terlalu tinggi untuk 1 semester ini (butuh IPS ${ipsDibutuhkan.toFixed(2)} > 4.00). Cobalah tingkatkan jumlah SKS atau sesuaikan target.`,
    };
  } else {
    return {
      ipsDibutuhkan,
      dapatDicapai: true,
      pesan: `Untuk mencapai IPK Kumulatif ${targetIPKKumulatif.toFixed(2)}, kamu butuh IP Semester ini minimal ${ipsDibutuhkan.toFixed(2)} (Rata-rata grade ${konversiNilai(ipsDibutuhkan * 25).huruf}).`,
    };
  }
}

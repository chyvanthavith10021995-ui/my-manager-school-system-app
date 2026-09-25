import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  Heart,
  Activity,
  Plus,
  Search,
  Printer,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  X,
  Apple,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';

export type BMICategory = 'ស្គមពេក (Underweight)' | 'ធម្មតា (Normal)' | 'លើសទម្ងន់ (Overweight)' | 'ធាត់ (Obese)';

export interface StudentHealthRecord {
  id: string;
  studentId: string;
  studentName: string;
  grade: string;
  section: string;
  gender: 'ប្រុស' | 'ស្រី';
  dob: string;
  checkupDate: string;
  heightCm: number;
  weightKg: number;
  bmi: number;
  bmiCategory: BMICategory;
  visionStatus: 'ធម្មតា (Normal)' | 'មានបញ្ហាភ្នែក (Vision Impaired)';
  hearingStatus: 'ធម្មតា (Normal)' | 'មានបញ្ហាត្រចៀក (Hearing Impaired)';
  dentalStatus: 'ល្អ (Clean)' | 'មានពកធ្មេញ/ដង្កូវស៊ី (Cavities)';
  vaccinationComplete: boolean;
  dewormingReceived: boolean; // ថ្នាំទម្លាក់ព្រូន
  wfpMealBeneficiary: boolean; // អាហារ WFP
  chronicIllnessOrAllergy?: string;
  evaluatorName: string;
  notes?: string;
}

export const StudentHealthView: React.FC = () => {
  const { students, schoolInfo } = useApp();

  // Active Subtab
  const [activeTab, setActiveTab] = useState<'all' | 'wfp' | 'watchlist'>('all');
  const [search, setSearch] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');

  // Initial Mock Health Records based on students
  const [healthRecords, setHealthRecords] = useState<StudentHealthRecord[]>([
    {
      id: 'h1',
      studentId: 'ALT-2026-001',
      studentName: 'ចាន់ សុភា',
      grade: 'ថ្នាក់ទី ៤',
      section: 'ក',
      gender: 'ស្រី',
      dob: '2016-04-14',
      checkupDate: '2026-09-15',
      heightCm: 132,
      weightKg: 28,
      bmi: 16.1,
      bmiCategory: 'ធម្មតា (Normal)',
      visionStatus: 'ធម្មតា (Normal)',
      hearingStatus: 'ធម្មតា (Normal)',
      dentalStatus: 'ល្អ (Clean)',
      vaccinationComplete: true,
      dewormingReceived: true,
      wfpMealBeneficiary: true,
      chronicIllnessOrAllergy: 'អាឡែកហ្ស៊ីអាហារសមុទ្រ',
      evaluatorName: 'អ្នកគ្រូ គឹម ស្រីពៅ',
      notes: 'សុខភាពល្អបរិបូរណ៍ ការលូតលាស់ស្របតាមអាយុ'
    },
    {
      id: 'h2',
      studentId: 'ALT-2026-002',
      studentName: 'សុខ រតនា',
      grade: 'ថ្នាក់ទី ៤',
      section: 'ក',
      gender: 'ប្រុស',
      dob: '2016-08-22',
      checkupDate: '2026-09-15',
      heightCm: 128,
      weightKg: 24,
      bmi: 14.6,
      bmiCategory: 'ស្គមពេក (Underweight)',
      visionStatus: 'ធម្មតា (Normal)',
      hearingStatus: 'ធម្មតា (Normal)',
      dentalStatus: 'មានពកធ្មេញ/ដង្កូវស៊ី (Cavities)',
      vaccinationComplete: true,
      dewormingReceived: true,
      wfpMealBeneficiary: true,
      chronicIllnessOrAllergy: 'គ្មាន',
      evaluatorName: 'អ្នកគ្រូ គឹម ស្រីពៅ',
      notes: 'ត្រូវបានផ្តល់អាហារូបត្ថម្ភបន្ថែម WFP និងថ្នាំទម្លាក់ព្រូន'
    },
    {
      id: 'h3',
      studentId: 'ALT-2026-101',
      studentName: 'ឡុង សុវណ្ណារ៉ា',
      grade: 'ថ្នាក់ទី ១',
      section: 'ក',
      gender: 'ប្រុស',
      dob: '2019-03-15',
      checkupDate: '2026-09-18',
      heightCm: 115,
      weightKg: 20,
      bmi: 15.1,
      bmiCategory: 'ធម្មតា (Normal)',
      visionStatus: 'ធម្មតា (Normal)',
      hearingStatus: 'ធម្មតា (Normal)',
      dentalStatus: 'ល្អ (Clean)',
      vaccinationComplete: true,
      dewormingReceived: true,
      wfpMealBeneficiary: true,
      chronicIllnessOrAllergy: 'គ្មាន',
      evaluatorName: 'លោកគ្រូ លោកគ្រូ ឈិត',
      notes: 'ចាក់វ៉ាក់សាំងគ្រប់កម្រិត ភ្នែក និងត្រចៀកធម្មតា'
    }
  ]);

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingRecord, setEditingRecord] = useState<StudentHealthRecord | null>(null);
  const [selectedHealthForPrint, setSelectedHealthForPrint] = useState<StudentHealthRecord | null>(null);

  // Form State
  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [checkupDate, setCheckupDate] = useState('2026-09-24');
  const [heightCm, setHeightCm] = useState(130);
  const [weightKg, setWeightKg] = useState(26);
  const [visionStatus, setVisionStatus] = useState<'ធម្មតា (Normal)' | 'មានបញ្ហាភ្នែក (Vision Impaired)'>('ធម្មតា (Normal)');
  const [hearingStatus, setHearingStatus] = useState<'ធម្មតា (Normal)' | 'មានបញ្ហាត្រចៀក (Hearing Impaired)'>('ធម្មតា (Normal)');
  const [dentalStatus, setDentalStatus] = useState<'ល្អ (Clean)' | 'មានពកធ្មេញ/ដង្កូវស៊ី (Cavities)'>('ល្អ (Clean)');
  const [vaccinationComplete, setVaccinationComplete] = useState(true);
  const [dewormingReceived, setDewormingReceived] = useState(true);
  const [wfpMealBeneficiary, setWfpMealBeneficiary] = useState(true);
  const [chronicIllnessOrAllergy, setChronicIllnessOrAllergy] = useState('គ្មាន');
  const [notes, setNotes] = useState('សុខភាពល្អ និងទទួលបានការពិនិត្យទៀងទាត់');
  const [evaluatorName, setEvaluatorName] = useState('អ្នកគ្រូ គឹម ស្រីពៅ');

  // Toast State
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Compute BMI & Category Helper
  const computeBMI = (h: number, w: number): { bmi: number; category: BMICategory } => {
    const heightInMeters = h / 100;
    const bmiVal = Number((w / (heightInMeters * heightInMeters)).toFixed(1));
    let cat: BMICategory = 'ធម្មតា (Normal)';
    if (bmiVal < 15.0) cat = 'ស្គមពេក (Underweight)';
    else if (bmiVal >= 15.0 && bmiVal <= 18.5) cat = 'ធម្មតា (Normal)';
    else if (bmiVal > 18.5 && bmiVal <= 22.0) cat = 'លើសទម្ងន់ (Overweight)';
    else cat = 'ធាត់ (Obese)';
    return { bmi: bmiVal, category: cat };
  };

  // Handle Form Submit (Add or Edit)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const targetStudent = students.find(s => s.id === selectedStudentId) || students[0];
    const { bmi, category } = computeBMI(heightCm, weightKg);

    if (editingRecord) {
      const updated: StudentHealthRecord = {
        ...editingRecord,
        heightCm,
        weightKg,
        bmi,
        bmiCategory: category,
        visionStatus,
        hearingStatus,
        dentalStatus,
        vaccinationComplete,
        dewormingReceived,
        wfpMealBeneficiary,
        chronicIllnessOrAllergy,
        notes,
        evaluatorName,
        checkupDate
      };
      setHealthRecords(prev => prev.map(r => r.id === editingRecord.id ? updated : r));
      showToast('បានបច្ចុប្បន្នភាពទិន្នន័យសុខភាពសិស្សដោយជោគជ័យ!');
    } else {
      const newRec: StudentHealthRecord = {
        id: `h_${Date.now()}`,
        studentId: targetStudent.studentId,
        studentName: `${targetStudent.lastName} ${targetStudent.firstName}`,
        grade: targetStudent.grade,
        section: targetStudent.section,
        gender: targetStudent.gender === 'ស្រី' ? 'ស្រី' : 'ប្រុស',
        dob: targetStudent.dob,
        checkupDate,
        heightCm,
        weightKg,
        bmi,
        bmiCategory: category,
        visionStatus,
        hearingStatus,
        dentalStatus,
        vaccinationComplete,
        dewormingReceived,
        wfpMealBeneficiary,
        chronicIllnessOrAllergy,
        evaluatorName,
        notes
      };
      setHealthRecords([newRec, ...healthRecords]);
      showToast('បានបន្ថែមទិន្នន័យពិនិត្យសុខភាពសិស្សថ្មីដោយជោគជ័យ!');
    }

    setIsAddModalOpen(false);
    setEditingRecord(null);
  };

  const handleOpenEdit = (rec: StudentHealthRecord) => {
    setEditingRecord(rec);
    setHeightCm(rec.heightCm);
    setWeightKg(rec.weightKg);
    setVisionStatus(rec.visionStatus);
    setHearingStatus(rec.hearingStatus);
    setDentalStatus(rec.dentalStatus);
    setVaccinationComplete(rec.vaccinationComplete);
    setDewormingReceived(rec.dewormingReceived);
    setWfpMealBeneficiary(rec.wfpMealBeneficiary);
    setChronicIllnessOrAllergy(rec.chronicIllnessOrAllergy || 'គ្មាន');
    setNotes(rec.notes || '');
    setEvaluatorName(rec.evaluatorName);
    setCheckupDate(rec.checkupDate);
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('តើអ្នកពិតជាចង់លុបទិន្នន័យពិនិត្យសុខភាពនេះមែនទេ?')) {
      setHealthRecords(prev => prev.filter(r => r.id !== id));
      showToast('បានលុបទិន្នន័យពិនិត្យសុខភាពដោយជោគជ័យ!');
    }
  };

  // Filter records
  const filteredRecords = healthRecords.filter(rec => {
    const matchesSearch = rec.studentName.toLowerCase().includes(search.toLowerCase()) || rec.studentId.toLowerCase().includes(search.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || rec.grade.includes(selectedGrade);
    
    if (activeTab === 'wfp') {
      return matchesSearch && matchesGrade && rec.wfpMealBeneficiary;
    }
    if (activeTab === 'watchlist') {
      return matchesSearch && matchesGrade && (rec.bmiCategory.includes('ស្គម') || rec.dentalStatus.includes('ដង្កូវ') || (rec.chronicIllnessOrAllergy && !rec.chronicIllnessOrAllergy.includes('គ្មាន')));
    }
    return matchesSearch && matchesGrade;
  });

  return (
    <div className="space-y-6 font-sans">

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400 font-bold text-xs no-print">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Printable MoEYS Official Student Health Card (Modal Print Overlay) */}
      {selectedHealthForPrint && (
        <div className="printable-letter-container printable-area">
          <PrintHeader
            title="ប័ណ្ណតាមដានសុខភាព និងអាហារូបត្ថម្ភសិស្ស (STUDENT HEALTH CARD)"
            subtitle={`សាលាបឋមសិក្សា អន្លង់តាម៉ី (${schoolInfo.academicYear})`}
            dateInfo={`ថ្ងៃពិនិត្យ ៖ ${selectedHealthForPrint.checkupDate}`}
          />

          <div className="my-6 space-y-5 text-black text-xs font-serif leading-relaxed">
            <div className="border border-black p-4 rounded-xl space-y-3">
              <h4 className="font-extrabold text-sm border-b border-black pb-1">
                ១. ព័ត៌មានអត្តសញ្ញាណសិស្សានុសិស្ស ៖
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <p><strong>ឈ្មោះសិស្ស ៖</strong> {selectedHealthForPrint.studentName}</p>
                <p><strong>អត្តលេខសិស្ស ៖</strong> {selectedHealthForPrint.studentId}</p>
                <p><strong>កម្រិតថ្នាក់-បន្ទប់ ៖</strong> {selectedHealthForPrint.grade} ({selectedHealthForPrint.section})</p>
                <p><strong>ភេទ / ថ្ងៃកំណើត ៖</strong> {selectedHealthForPrint.gender} ({selectedHealthForPrint.dob})</p>
              </div>
            </div>

            <div className="border border-black p-4 rounded-xl space-y-3">
              <h4 className="font-extrabold text-sm border-b border-black pb-1">
                ២. លទ្ធផលពិនិត្យកាយសម្បទា និងសន្ទស្សន៍ម៉ាសរាងកាយ (BMI) ៖
              </h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 border border-black rounded-lg">
                  <p className="font-bold">កម្ពស់ (Height)</p>
                  <p className="text-base font-black mt-1">{selectedHealthForPrint.heightCm} cm</p>
                </div>
                <div className="p-2 border border-black rounded-lg">
                  <p className="font-bold">ទម្ងន់ (Weight)</p>
                  <p className="text-base font-black mt-1">{selectedHealthForPrint.weightKg} kg</p>
                </div>
                <div className="p-2 border border-black rounded-lg">
                  <p className="font-bold">សន្ទស្សន៍ BMI</p>
                  <p className="text-base font-black text-rose-700 mt-1">{selectedHealthForPrint.bmi} ({selectedHealthForPrint.bmiCategory})</p>
                </div>
              </div>
            </div>

            <div className="border border-black p-4 rounded-xl space-y-3">
              <h4 className="font-extrabold text-sm border-b border-black pb-1">
                ៣. លទ្ធផលពិនិត្យសុខភាពទូទៅ & អាហារូបត្ថម្ភ ៖
              </h4>
              <table className="w-full border-collapse border border-black text-xs">
                <tbody>
                  <tr className="border-b border-black">
                    <td className="p-2 font-bold border-r border-black">សុខភាពភ្នែក / ការមើលឃើញ ៖</td>
                    <td className="p-2">{selectedHealthForPrint.visionStatus}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-2 font-bold border-r border-black">សុខភាពត្រចៀក / ការស្តាប់ ៖</td>
                    <td className="p-2">{selectedHealthForPrint.hearingStatus}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-2 font-bold border-r border-black">សុខភាពមាត់ធ្មេញ ៖</td>
                    <td className="p-2">{selectedHealthForPrint.dentalStatus}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-2 font-bold border-r border-black">ការទទួលបានថ្នាំទម្លាក់ព្រូន ៖</td>
                    <td className="p-2">{selectedHealthForPrint.dewormingReceived ? '✓ បានទទួលរួចរាល់' : '✗ មិនទាន់ទទួលបាន'}</td>
                  </tr>
                  <tr className="border-b border-black">
                    <td className="p-2 font-bold border-r border-black">កម្មវិធីអាហារូបត្ថម្ភ WFP ៖</td>
                    <td className="p-2">{selectedHealthForPrint.wfpMealBeneficiary ? '✓ ទទួលបានអាហារពេលព្រឹកសាលារៀន' : '✗ គ្មាន'}</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold border-r border-black">ជំងឺប្រចាំកាយ / ការអាឡែកហ្ស៊ី ៖</td>
                    <td className="p-2 text-rose-700 font-bold">{selectedHealthForPrint.chronicIllnessOrAllergy || 'គ្មាន'}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-3 border border-black rounded-xl">
              <p><strong>ការសង្កេត និងអនុសាសន៍គ្រូពេទ្យ/គ្រូបន្ទុក ៖</strong> {selectedHealthForPrint.notes}</p>
            </div>
          </div>

          <PrintFooter />

          <div className="no-print pt-6 flex justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-extrabold text-xs shadow-lg"
            >
              បោះពុម្ពប័ណ្ណសុខភាព
            </button>
            <button
              onClick={() => setSelectedHealthForPrint(null)}
              className="px-6 py-2.5 rounded-xl bg-slate-200 text-slate-800 font-bold text-xs"
            >
              បិទវិញ
            </button>
          </div>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-rose-900 via-slate-900 to-indigo-950 p-6 sm:p-8 rounded-3xl border border-rose-800/40 text-white shadow-xl no-print">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-black bg-rose-500/20 text-rose-300 border border-rose-400/30 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" /> MoEYS Student Health & Wellbeing
            </span>
            <span className="text-xs text-rose-200 font-bold font-mono">ឆ្នាំសិក្សា ២០២៦ - ២០២៧</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            ប្រព័ន្ធតាមដាន និងគ្រប់គ្រងសុខភាពសិស្សានុសិស្ស
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            គ្រប់គ្រងកម្ពស់-ទម្ងន់-BMI, សុខភាពភ្នែក-ត្រចៀក-ធ្មេញ, ថ្នាំទម្លាក់ព្រូន, អាហារូបត្ថម្ភ WFP និងជំងឺប្រចាំកាយសិស្ស
          </p>
        </div>

        <button
          onClick={() => {
            setEditingRecord(null);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-black text-xs rounded-2xl shadow-lg transition-all shrink-0 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" /> បន្ថែមទិន្នន័យពិនិត្យសុខភាពសិស្ស
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        <div className="glass-card p-5 flex items-center gap-4 border-l-4 border-l-rose-500">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 flex items-center justify-center font-bold">
            <Stethoscope className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">សិស្សពិនិត្យសុខភាពសរុប</p>
            <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{healthRecords.length} នាក់</h3>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4 border-l-4 border-l-emerald-500">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">សន្ទស្សន៍ BMI ធម្មតា</p>
            <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              {Math.round((healthRecords.filter(r => r.bmiCategory.includes('ធម្មតា')).length / (healthRecords.length || 1)) * 100)}%
            </h3>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4 border-l-4 border-l-amber-500">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Apple className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">សិស្សទទួលអាហារ WFP</p>
            <h3 className="text-xl font-black text-amber-600 dark:text-amber-400">
              {healthRecords.filter(r => r.wfpMealBeneficiary).length} នាក់
            </h3>
          </div>
        </div>

        <div className="glass-card p-5 flex items-center gap-4 border-l-4 border-l-indigo-500">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400">បានទទួលថ្នាំទម្លាក់ព្រូន</p>
            <h3 className="text-xl font-black text-indigo-600 dark:text-indigo-400">
              {healthRecords.filter(r => r.dewormingReceived).length} នាក់ (100%)
            </h3>
          </div>
        </div>
      </div>

      {/* Subtab Selector & Search Filters */}
      <div className="glass-card p-4 space-y-3 no-print">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'all'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Stethoscope className="w-4 h-4" /> ១. បញ្ជីសុខភាព & BMI សិស្សទាំងអស់ ({healthRecords.length})
            </button>

            <button
              onClick={() => setActiveTab('wfp')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'wfp'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <Apple className="w-4 h-4" /> ២. អាហារូបត្ថម្ភ WFP & ថ្នាំទម្លាក់ព្រូន
            </button>

            <button
              onClick={() => setActiveTab('watchlist')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeTab === 'watchlist'
                  ? 'bg-purple-600 text-white shadow-md'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              <AlertTriangle className="w-4 h-4" /> ៣. សិស្សត្រូវតាមដានសុខភាព & អាឡែកហ្ស៊ី
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-rose-600 text-white font-bold text-xs shadow-md transition-all self-start sm:self-auto"
          >
            <Printer className="w-4 h-4" /> បោះពុម្ពបញ្ជីសុខភាព
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="ស្វែងរកឈ្មោះសិស្ស ឬអត្តលេខ..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <div>
            <select
              value={selectedGrade}
              onChange={e => setSelectedGrade(e.target.value)}
              className="w-full px-3 py-2 font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="all">គ្រប់កម្រិតថ្នាក់ទាំងអស់ (មត្តេយ្យ - ថ្នាក់ទី៦)</option>
              <option value="មត្តេយ្យ">ថ្នាក់មត្តេយ្យ</option>
              <option value="ថ្នាក់ទី ១">ថ្នាក់ទី ១</option>
              <option value="ថ្នាក់ទី ២">ថ្នាក់ទី ២</option>
              <option value="ថ្នាក់ទី ៣">ថ្នាក់ទី ៣</option>
              <option value="ថ្នាក់ទី ៤">ថ្នាក់ទី ៤</option>
              <option value="ថ្នាក់ទី ៥">ថ្នាក់ទី ៥</option>
              <option value="ថ្នាក់ទី ៦">ថ្នាក់ទី ៦</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Student Health Table */}
      <div className="glass-card p-6 space-y-4 no-print">
        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold border-b border-slate-200 dark:border-slate-700">
                <th className="p-3 text-center w-12">ល.រ</th>
                <th className="p-3">អត្តលេខ</th>
                <th className="p-3">ឈ្មោះសិស្ស</th>
                <th className="p-3 text-center">ថ្នាក់ទី</th>
                <th className="p-3 text-center">កម្ពស់ / ទម្ងន់</th>
                <th className="p-3 text-center">សន្ទស្សន៍ BMI</th>
                <th className="p-3 text-center">ភ្នែក / ត្រចៀក / ធ្មេញ</th>
                <th className="p-3 text-center">អាហារ WFP & ព្រូន</th>
                <th className="p-3">ជំងឺប្រចាំកាយ/អាឡែកហ្ស៊ី</th>
                <th className="p-3 text-right">សកម្មភាព</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
              {filteredRecords.map((rec, idx) => (
                <tr key={rec.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{idx + 1}</td>
                  <td className="p-3 font-mono font-bold text-slate-600 dark:text-slate-400">{rec.studentId}</td>
                  <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{rec.studentName}</td>
                  <td className="p-3 text-center font-bold">{rec.grade} ({rec.section})</td>
                  <td className="p-3 text-center font-mono font-bold">{rec.heightCm} cm / {rec.weightKg} kg</td>
                  <td className="p-3 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                      rec.bmiCategory.includes('ធម្មតា') ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' :
                      rec.bmiCategory.includes('ស្គម') ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-rose-100 text-rose-800 border border-rose-300'
                    }`}>
                      {rec.bmi} ({rec.bmiCategory.split(' ')[0]})
                    </span>
                  </td>
                  <td className="p-3 text-center text-[11px]">
                    <span className="block font-semibold">👁️ {rec.visionStatus.split(' ')[0]}</span>
                    <span className="block font-semibold">🦷 {rec.dentalStatus.split(' ')[0]}</span>
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex flex-col items-center gap-0.5">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-600">
                        {rec.wfpMealBeneficiary ? '🍎 អាហារ WFP' : 'គ្មាន'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/10 text-indigo-600">
                        {rec.dewormingReceived ? '✓ ថ្នាំទម្លាក់ព្រូន' : 'មិនទាន់ទទួល'}
                      </span>
                    </div>
                  </td>
                  <td className="p-3 font-bold text-rose-600 dark:text-rose-400 truncate max-w-xs">
                    {rec.chronicIllnessOrAllergy || 'គ្មាន'}
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedHealthForPrint(rec)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400"
                        title="បោះពុម្ពប័ណ្ណសុខភាព"
                      >
                        <Printer className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleOpenEdit(rec)}
                        className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300"
                        title="កែប្រែ"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(rec.id)}
                        className="p-1.5 rounded-lg bg-rose-100 hover:bg-rose-200 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                        title="លុប"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT HEALTH RECORD MODAL */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto font-sans no-print">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] flex flex-col">
            
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0">
              <div className="flex items-center gap-2.5">
                <Stethoscope className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                  {editingRecord ? 'កែប្រែទិន្នន័យពិនិត្យសុខភាពសិស្ស' : 'បន្ថែមទិន្នន័យពិនិត្យសុខភាពសិស្សថ្មី'}
                </h3>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-3.5 text-xs pr-1">
              {!editingRecord && (
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ជ្រើសរើសសិស្ស ៖</label>
                  <select
                    value={selectedStudentId}
                    onChange={e => setSelectedStudentId(e.target.value)}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  >
                    {students.map(s => (
                      <option key={s.id} value={s.id}>{s.studentId} - {s.lastName} {s.firstName} ({s.grade})</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">កម្ពស់ (Height in cm) ៖</label>
                  <input
                    type="number"
                    required
                    value={heightCm}
                    onChange={e => setHeightCm(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ទម្ងន់ (Weight in kg) ៖</label>
                  <input
                    type="number"
                    required
                    value={weightKg}
                    onChange={e => setWeightKg(Number(e.target.value))}
                    className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <span className="font-bold text-slate-600 dark:text-slate-400">សន្ទស្សន៍ BMI គណនាអូតូ ៖</span>
                <span className="font-black text-rose-600 dark:text-rose-400 text-sm font-mono">
                  {computeBMI(heightCm, weightKg).bmi} ({computeBMI(heightCm, weightKg).category})
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">សុខភាពភ្នែក ៖</label>
                  <select
                    value={visionStatus}
                    onChange={e => setVisionStatus(e.target.value as any)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  >
                    <option value="ធម្មតា (Normal)">ធម្មតា (Normal)</option>
                    <option value="មានបញ្ហាភ្នែក (Vision Impaired)">មានបញ្ហាភ្នែក</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">សុខភាពត្រចៀក ៖</label>
                  <select
                    value={hearingStatus}
                    onChange={e => setHearingStatus(e.target.value as any)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  >
                    <option value="ធម្មតា (Normal)">ធម្មតា (Normal)</option>
                    <option value="មានបញ្ហាត្រចៀក (Hearing Impaired)">មានបញ្ហាត្រចៀក</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">សុខភាពធ្មេញ ៖</label>
                  <select
                    value={dentalStatus}
                    onChange={e => setDentalStatus(e.target.value as any)}
                    className="w-full p-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                  >
                    <option value="ល្អ (Clean)">ល្អ (Clean)</option>
                    <option value="មានពកធ្មេញ/ដង្កូវស៊ី (Cavities)">មានដង្កូវស៊ី</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={dewormingReceived}
                    onChange={e => setDewormingReceived(e.target.checked)}
                    className="rounded text-rose-600"
                  />
                  <span>បានទទួលថ្នាំទម្លាក់ព្រូន</span>
                </label>

                <label className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={wfpMealBeneficiary}
                    onChange={e => setWfpMealBeneficiary(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>ទទួលអាហារូបត្ថម្ភ WFP</span>
                </label>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ជំងឺប្រចាំកាយ / ការអាឡែកហ្ស៊ី ៖</label>
                <input
                  type="text"
                  value={chronicIllnessOrAllergy}
                  onChange={e => setChronicIllnessOrAllergy(e.target.value)}
                  placeholder="ឧ. អាឡែកហ្ស៊ីអាហារសមុទ្រ, ជំងឺហឺត..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ការសង្កេត និងអនុសាសន៍ ៖</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="កត់ត្រាការសង្កេតបន្ថែម..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800 shrink-0">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black shadow-md"
                >
                  {editingRecord ? 'រក្សាទុកការកែប្រែ' : 'បន្ថែមទិន្នន័យសុខភាព'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentHealthView;

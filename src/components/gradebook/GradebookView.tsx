import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Student, SubjectScore, GradeRecord } from '../../types';
import { ReportCardModal } from './ReportCardModal';
import { CertificateOfHonorModal } from './CertificateOfHonorModal';
import {
  Award,
  Plus,
  FileText,
  Calendar,
  Medal,
  ChevronDown,
  ChevronUp,
  Edit3,
  CheckCircle,
  BookOpen,
  Sparkles,
  Printer,
  Download,
  ListOrdered
} from 'lucide-react';

const EXAM_PERIODS = [
  'ខែវិច្ឆិកា ២០២៦ (ចូលរៀន)',
  'ខែធ្នូ ២០២៦',
  'ខែមករា ២០២៧',
  'ខែកុម្ភៈ ២០២៧',
  'ខែមីនា ២០២៧',
  'ឆមាសទី ១ (Sem 1)',
  'ខែមេសា ២០២៧',
  'ខែឧសភា ២០២៧',
  'ខែមិថុនា ២០២៧',
  'ខែកក្កដា ២០២៧',
  'ខែសីហា ២០២៧',
  'ឆមាសទី ២ (Sem 2)',
  'ដំណាច់ឆ្នាំ (Annual Final)'
];

const DEFAULT_13_SUBJECTS: { subjectName: string; subjectNameEn: string; maxScore: number }[] = [
  { subjectName: 'អំណាន', subjectNameEn: 'Reading', maxScore: 10 },
  { subjectName: 'ការស្ដាប់', subjectNameEn: 'Listening', maxScore: 10 },
  { subjectName: 'សរសេរតាមអាន', subjectNameEn: 'Dictation', maxScore: 10 },
  { subjectName: 'តែងសេចក្ដី', subjectNameEn: 'Composition', maxScore: 10 },
  { subjectName: 'គណិតវិទ្យា', subjectNameEn: 'Mathematics', maxScore: 10 },
  { subjectName: 'វិទ្យាសាស្ត្រ', subjectNameEn: 'Science', maxScore: 10 },
  { subjectName: 'សីលធម៌', subjectNameEn: 'Ethics & Civics', maxScore: 10 },
  { subjectName: 'ភូមិវិទ្យា', subjectNameEn: 'Geography', maxScore: 10 },
  { subjectName: 'ប្រវត្តិវិទ្យា', subjectNameEn: 'History', maxScore: 10 },
  { subjectName: 'គេហវិទ្យា', subjectNameEn: 'Home Economics', maxScore: 10 },
  { subjectName: 'អប់រំកាយ', subjectNameEn: 'Physical Education', maxScore: 10 },
  { subjectName: 'អប់រំបំណិនជីវិត', subjectNameEn: 'Life Skills', maxScore: 10 },
  { subjectName: 'ភាសាបរទេស', subjectNameEn: 'Foreign Language (English)', maxScore: 10 }
];

export const GradebookView: React.FC = () => {
  const { students, grades, addGrade, batchSaveClassScores, userRole, language, classes, teachers, schoolInfo } = useApp();
  const [activeTab, setActiveTab] = useState<'rankings' | 'honor_roll' | 'matrix'>('rankings');
  const [selectedMonth, setSelectedMonth] = useState<string>('ឆមាសទី ១ (Sem 1)');
  const [selectedClassId, setSelectedClassId] = useState<string>('All');
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<Student | null>(null);
  const [selectedHonorCertificate, setSelectedHonorCertificate] = useState<{
    student: Student;
    periodName: string;
    rank: number;
    averageScore: number;
  } | null>(null);

  const [showAddGradeModal, setShowAddGradeModal] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);
  const [batchClassId, setBatchClassId] = useState<string>(classes[0]?.id || 'c1');
  const [batchMonth, setBatchMonth] = useState<string>('ឆមាសទី ១ (Sem 1)');
  const [batchScores, setBatchScores] = useState<Record<string, Record<string, number>>>({});
  const [expandedStudentId, setExpandedStudentId] = useState<string | null>(null);

  // Form state for 13 subject score entry modal
  const [targetStudentId, setTargetStudentId] = useState<string>(students[0]?.id || '');
  const [formScores, setFormScores] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    DEFAULT_13_SUBJECTS.forEach(s => {
      initial[s.subjectName] = 9.0;
    });
    return initial;
  });

  const getLetter = (score: number): GradeRecord['letterGrade'] => {
    if (score >= 9.0) return 'ល្អប្រសើរ (A)';
    if (score >= 8.0) return 'ល្អ (B)';
    if (score >= 7.0) return 'ល្អបង្គួរ (C)';
    if (score >= 6.0) return 'មធ្យម (D)';
    return 'ខ្សោយ (F)';
  };

  const handleOpenScoreEntryModal = (studentId?: string) => {
    if (studentId) {
      setTargetStudentId(studentId);
      // Load existing scores for student if available
      const record = grades.find(g => g.studentId === studentId && (g.month === selectedMonth || g.examName.includes(selectedMonth)));
      if (record && record.subjectScores) {
        const loaded: Record<string, number> = {};
        record.subjectScores.forEach(s => {
          loaded[s.subjectName] = s.score;
        });
        setFormScores(loaded);
      } else {
        const reset: Record<string, number> = {};
        DEFAULT_13_SUBJECTS.forEach(s => {
          reset[s.subjectName] = 9.0;
        });
        setFormScores(reset);
      }
    }
    setShowAddGradeModal(true);
  };

  const handleScoreChange = (subjectName: string, value: number) => {
    const clamped = Math.max(0, Math.min(10, value));
    setFormScores(prev => ({ ...prev, [subjectName]: clamped }));
  };

  const handleSaveScoresSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === targetStudentId);
    if (!st) return;

    const subjectScoresList: SubjectScore[] = DEFAULT_13_SUBJECTS.map(s => {
      const score = Number(formScores[s.subjectName] ?? 9.0);
      return {
        ...s,
        score,
        letterGrade: getLetter(score)
      };
    });

    const marksObtained = subjectScoresList.reduce((acc, s) => acc + s.score, 0);
    const maxMarks = subjectScoresList.length * 10;
    const avg = marksObtained / subjectScoresList.length;

    addGrade({
      studentId: st.id,
      studentName: `${st.lastName} ${st.firstName}`,
      subject: '១៣ មុខវិជ្ជាសរុប',
      className: `${st.grade}-${st.section}`,
      examName: `ប្រឡងប្រចាំ${selectedMonth}`,
      month: selectedMonth,
      marksObtained,
      maxMarks,
      letterGrade: getLetter(avg),
      subjectScores: subjectScoresList,
      date: new Date().toISOString().split('T')[0]
    });

    setShowAddGradeModal(false);
  };

  const handleOpenBatchModal = (classId?: string, month?: string) => {
    const targetClass = classId || selectedClassId || classes[0]?.id || 'c1';
    const targetMonth = month || selectedMonth;
    setBatchClassId(targetClass);
    setBatchMonth(targetMonth);

    // Find class group
    const clsGroup = classes.find(c => c.id === targetClass || c.name === targetClass);
    const targetStudents = students.filter(s => {
      if (clsGroup) {
        return s.grade === `ថ្នាក់ទី ${clsGroup.gradeLevel}` && s.section === clsGroup.section;
      }
      return true;
    });

    const initialBatchScores: Record<string, Record<string, number>> = {};
    targetStudents.forEach(st => {
      const existingGrade = grades.find(g => g.studentId === st.id && (g.month === targetMonth || g.examName.includes(targetMonth)));
      const scoresMap: Record<string, number> = {};
      DEFAULT_13_SUBJECTS.forEach(sub => {
        if (existingGrade && existingGrade.subjectScores) {
          const match = existingGrade.subjectScores.find(ss => ss.subjectName === sub.subjectName);
          scoresMap[sub.subjectName] = match ? match.score : 8.5;
        } else {
          scoresMap[sub.subjectName] = 8.5;
        }
      });
      initialBatchScores[st.id] = scoresMap;
    });

    setBatchScores(initialBatchScores);
    setShowBatchModal(true);
  };

  const handleBatchScoreChange = (studentId: string, subjectName: string, val: number) => {
    const clamped = Math.max(0, Math.min(10, val));
    setBatchScores(prev => ({
      ...prev,
      [studentId]: {
        ...(prev[studentId] || {}),
        [subjectName]: clamped
      }
    }));
  };

  const handleSaveBatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clsGroup = classes.find(c => c.id === batchClassId || c.name === batchClassId);
    const targetStudents = students.filter(s => {
      if (clsGroup) {
        return s.grade === `ថ្នាក់ទី ${clsGroup.gradeLevel}` && s.section === clsGroup.section;
      }
      return true;
    });

    const classGrades: Omit<GradeRecord, 'id'>[] = targetStudents.map(st => {
      const studentMap = batchScores[st.id] || {};
      const subjectScoresList: SubjectScore[] = DEFAULT_13_SUBJECTS.map(sub => {
        const sc = Number(studentMap[sub.subjectName] ?? 8.5);
        return {
          ...sub,
          score: sc,
          letterGrade: getLetter(sc)
        };
      });

      const marksObtained = subjectScoresList.reduce((acc, s) => acc + s.score, 0);
      const maxMarks = subjectScoresList.length * 10;
      const avg = marksObtained / subjectScoresList.length;

      return {
        studentId: st.id,
        studentName: `${st.lastName} ${st.firstName}`,
        subject: '១៣ មុខវិជ្ជាសរុប',
        className: `${st.grade}-${st.section}`,
        examName: `ប្រឡងប្រចាំ${batchMonth}`,
        month: batchMonth,
        marksObtained,
        maxMarks,
        letterGrade: getLetter(avg),
        subjectScores: subjectScoresList,
        date: new Date().toISOString().split('T')[0]
      };
    });

    batchSaveClassScores(classGrades);
    setShowBatchModal(false);
  };

  // Find active class group if filtered
  const activeClassGroup = classes.find(c => c.id === selectedClassId || c.name === selectedClassId);
  const activeHomeroomTeacher = activeClassGroup ? teachers.find(t => t.id === activeClassGroup.classTeacherId) : null;

  // Filter students based on selected class
  const filteredStudentsForGradebook = students.filter(st => {
    if (selectedClassId === 'All') return true;
    if (activeClassGroup) {
      return st.grade === `ថ្នាក់ទី ${activeClassGroup.gradeLevel}` && st.section === activeClassGroup.section;
    }
    return true;
  });

  // Process students list for current month ranking
  const monthGradesMap = new Map<string, any>();
  grades.forEach(g => {
    if (g.month === selectedMonth || g.examName.includes(selectedMonth)) {
      monthGradesMap.set(g.studentId, g);
    }
  });

  const studentsWithGrades = filteredStudentsForGradebook.map(st => {
    const gradeRec = monthGradesMap.get(st.id);
    const totalScore = gradeRec?.marksObtained ?? 115.0;
    const avgScore = (totalScore / 13).toFixed(1);
    const letterGrade = gradeRec?.letterGrade || getLetter(Number(avgScore));
    return {
      student: st,
      gradeRec,
      totalScore,
      avgScore,
      letterGrade,
      rank: gradeRec?.rankInClass ?? st.rankInClass ?? 1
    };
  });

  // CSV Export helper function
  const exportToCSV = (filename: string, headers: string[], rows: (string | number)[][]) => {
    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map(e => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportRankingsCSV = () => {
    const selectedClassName = selectedClassId === 'All' ? 'គ្រប់ថ្នាក់' : (classes.find(c => c.id === selectedClassId)?.name || selectedClassId);
    const headers = ['ល.រ', 'អត្តលេខ (ID)', 'ត្រកូល', 'ឈ្មោះ', 'ភេទ', 'ថ្នាក់រៀន', 'ពិន្ទុសរុប (១៣០)', 'ពិន្ទុមធ្យម (១០)', 'និទ្ទេស', 'លទ្ធផល', 'ចំណាត់ថ្នាក់ (Rank)'];
    const rows = studentsWithGrades.map((item, idx) => [
      idx + 1,
      item.student.studentId,
      item.student.lastName,
      item.student.firstName,
      item.student.gender,
      `${item.student.grade}-${item.student.section}`,
      item.totalScore,
      item.avgScore,
      item.letterGrade,
      Number(item.avgScore) >= 5.0 ? 'ជាប់' : 'ធ្លាក់',
      `ទី ${idx + 1}`
    ]);
    exportToCSV(`តារាងចំណាត់ថ្នាក់_${selectedClassName}_${selectedMonth}.csv`, headers, rows);
  };

  const handleExportHonorRollCSV = () => {
    const headers = ['ជ័យលាភី (Honor Rank)', 'អត្តលេខសិស្ស', 'ឈ្មោះសិស្ស', 'ថ្នាក់រៀន', 'ពិន្ទុសរុប (១៣០)', 'ពិន្ទុមធ្យម (១០)', 'និទ្ទេស'];
    const rows = studentsWithGrades.slice(0, 5).map((item, idx) => [
      `ជ័យលាភីលេខ ${idx + 1}`,
      item.student.studentId,
      `${item.student.lastName} ${item.student.firstName}`,
      `${item.student.grade}-${item.student.section}`,
      item.totalScore,
      item.avgScore,
      item.letterGrade
    ]);
    exportToCSV(`តារាងកិត្តិយសសិស្សពូកែ_${selectedMonth}.csv`, headers, rows);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Page Banner Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-brand-900 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-brand-800/40 text-white shadow-xl print:hidden">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-amber-400 text-slate-950 border border-amber-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> {schoolInfo.schoolName}
            </span>
            <span className="text-xs text-amber-200 font-bold">ឆ្នាំសិក្សា ២០២៦ - ២០២៧ (ចូលរៀនខែ១១ ឆ្នាំ២០២៦)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {language === 'km' ? 'ប្រព័ន្ធគ្រប់គ្រងចំណាត់ថ្នាក់ & តារាងកិត្តិយសសិស្ស' : 'Student Rankings & Wall of Honor'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            គ្រប់គ្រងតារាងចំណាត់ថ្នាក់សិស្សប្រចាំថ្នាក់, តារាងកិត្តិយសសិស្សពូកែ និងបោះពុម្ពប័ណ្ណសរសើរផ្លូវការ MoEYS
          </p>
        </div>

        {(userRole === 'admin' || userRole === 'teacher') && (
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0">
            <button
              onClick={() => handleOpenBatchModal()}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all"
            >
              <Edit3 className="w-4 h-4 text-slate-950" /> {language === 'km' ? 'បញ្ចូលពិន្ទុរហ័សប្រចាំថ្នាក់ (Batch Entry)' : 'Batch Enter Class Scores'}
            </button>
            <button
              onClick={() => handleOpenScoreEntryModal()}
              className="flex items-center gap-2 px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-100 font-bold text-xs rounded-2xl border border-slate-700 transition-all"
            >
              <Plus className="w-4 h-4" /> {language === 'km' ? 'បញ្ចូលពិន្ទុសិស្សម្នាក់ៗ' : 'Single Student Entry'}
            </button>
          </div>
        )}
      </div>

      {/* Subtab Selector: Rankings vs Honor Roll vs 13 Subjects Matrix */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 self-start print:hidden">
        <button
          onClick={() => setActiveTab('rankings')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === 'rankings'
              ? 'bg-brand-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <ListOrdered className="w-4 h-4" /> ១. តារាងចំណាត់ថ្នាក់សិស្ស (Rankings Sheet)
        </button>
        <button
          onClick={() => setActiveTab('honor_roll')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === 'honor_roll'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md'
              : 'text-amber-400 hover:text-amber-300'
          }`}
        >
          <Sparkles className="w-4 h-4 text-slate-950 fill-slate-950" /> ២. តារាងកិត្តិយស (Wall of Honor)
        </button>
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeTab === 'matrix'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" /> ៣. បញ្ជីពិន្ទុលម្អិត ១៣ មុខវិជ្ជា (13 Subjects Matrix)
        </button>
      </div>

      {/* Month & Class Selection Filters */}
      <div className="glass-card p-4 space-y-3">
        {/* Month Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2 shrink-0">
            <Calendar className="w-4 h-4 text-brand-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ជ្រើសរើសខែប្រឡង៖</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {EXAM_PERIODS.map(m => {
              const active = selectedMonth === m;
              const isSpecial = m.includes('ឆមាស') || m.includes('ដំណាច់ឆ្នាំ');
              return (
                <button
                  key={m}
                  onClick={() => setSelectedMonth(m)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all ${
                    active
                      ? isSpecial
                        ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 shadow-md ring-2 ring-amber-300'
                        : 'bg-brand-600 text-white shadow-md ring-2 ring-brand-400'
                      : isSpecial
                      ? 'bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30 hover:bg-amber-500/20'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {isSpecial ? `🎓 ${m}` : m}
                </button>
              );
            })}
          </div>
        </div>

        {/* Class Filter selector */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="flex items-center gap-2 shrink-0">
            <BookOpen className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">តម្រងតាមថ្នាក់រៀន៖</span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setSelectedClassId('All')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedClassId === 'All'
                  ? 'bg-purple-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              គ្រប់ថ្នាក់ (ថ្នាក់ទី១ - ទី៦)
            </button>
            {classes.map(c => {
              const active = selectedClassId === c.id || selectedClassId === c.name;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedClassId(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-purple-600 text-white shadow-sm ring-2 ring-purple-400'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dedicated Homeroom Teacher Banner */}
      {activeClassGroup && activeHomeroomTeacher && (
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-900/40 via-indigo-900/40 to-slate-900/40 border border-purple-500/30 flex items-center justify-between gap-4 text-white">
          <div className="flex items-center gap-3">
            <img
              src={activeHomeroomTeacher.avatar}
              alt={activeHomeroomTeacher.firstName}
              className="w-12 h-12 rounded-xl object-cover ring-2 ring-purple-400"
            />
            <div>
              <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-purple-500/30 text-purple-300 border border-purple-400/30">
                គ្រូបន្ទុកថ្នាក់ (Form Teacher)
              </span>
              <h4 className="text-sm font-extrabold mt-0.5">
                {activeHomeroomTeacher.lastName} {activeHomeroomTeacher.firstName}
              </h4>
              <p className="text-xs text-purple-200">
                បង្រៀនបន្ទុក {activeClassGroup.name} • {activeClassGroup.roomNumber}
              </p>
            </div>
          </div>

          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-slate-300">ចំនួនសិស្សប្រចាំថ្នាក់</p>
            <p className="text-lg font-black text-amber-400">{studentsWithGrades.length} នាក់</p>
          </div>
        </div>
      )}

      {/* VIEW 1: STANDALONE CLASS RANKING SHEET */}
      {activeTab === 'rankings' && (
        <div className="space-y-4">
          
          {/* Action Bar for Download & Print (Hidden on Print) */}
          <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
            <div className="flex items-center gap-2">
              <ListOrdered className="w-5 h-5 text-brand-500" />
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">
                  តារាងចំណាត់ថ្នាក់សិស្សប្រចាំ ៖ {selectedMonth}
                </h3>
                <p className="text-[11px] text-slate-500">
                  ឆ្នាំសិក្សា ២០២៦-២០២៧ (ចូលរៀនខែ១១ ឆ្នាំ២០២៦) • {selectedClassId === 'All' ? 'គ្រប់ថ្នាក់រៀន' : selectedClassId}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* CSV Export Button */}
              <button
                onClick={handleExportRankingsCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                title="ទាញយកតារាងចំណាត់ថ្នាក់ជា CSV / Excel"
              >
                <Download className="w-4 h-4" /> ទាញយកជា CSV
              </button>

              {/* Native Print Button */}
              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all"
                title="បោះពុម្ពតារាងចំណាត់ថ្នាក់"
              >
                <Printer className="w-4 h-4" /> បោះពុម្ពតារាងចំណាត់ថ្នាក់
              </button>
            </div>
          </div>

          {/* Printable Class Ranking Sheet Document */}
          <div className="printable-area glass-card p-6 space-y-4">
            
            {/* MoEYS Official School Document Header */}
            <div className="text-center space-y-1 pb-4 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">
                ព្រះរាជាណាចក្រកម្ពុជា ជាតិ សាសនា ព្រះមហាក្សត្រ
              </h3>
              <p className="text-[11px] font-bold text-slate-600 dark:text-slate-400">
                ក្រសួងអប់រំ យុវជន និងកីឡា • មន្ទីរអប់រំ {schoolInfo.province} • {schoolInfo.schoolName}
              </p>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 pt-2 uppercase tracking-wide">
                តារាងបញ្ជីចំណាត់ថ្នាក់សិស្សប្រចាំ{selectedMonth} (ឆ្នាំសិក្សា ២០២៦ - ២០២៧)
              </h2>
              <p className="text-xs font-extrabold text-brand-600 dark:text-brand-400 font-mono">
                ថ្នាក់សិក្សា៖ {selectedClassId === 'All' ? 'គ្រប់ថ្នាក់ (១-៦)' : selectedClassId} | ថ្ងៃចូលរៀន៖ ខែវិច្ឆិកា ឆ្នាំ២០២៦
              </p>
            </div>

            {/* Ranking Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black border-b border-slate-200 dark:border-slate-700">
                    <th className="p-3 text-center w-12">ល.រ</th>
                    <th className="p-3">អត្តលេខ</th>
                    <th className="p-3">គោត្តនាម - នាម</th>
                    <th className="p-3 text-center">ភេទ</th>
                    <th className="p-3 text-center">ថ្នាក់រៀន</th>
                    <th className="p-3 text-center">ពិន្ទុសរុប (១៣០)</th>
                    <th className="p-3 text-center">មធ្យមភាគ (១០)</th>
                    <th className="p-3 text-center">និទ្ទេស</th>
                    <th className="p-3 text-center">លទ្ធផល</th>
                    <th className="p-3 text-center text-red-600 dark:text-red-400 font-black">ចំណាត់ថ្នាក់</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {studentsWithGrades.map((item, idx) => {
                    const st = item.student;
                    const rank = idx + 1;
                    const passed = Number(item.avgScore) >= 5.0;

                    return (
                      <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">
                          {idx + 1}
                        </td>
                        <td className="p-3 font-mono font-bold text-slate-600 dark:text-slate-400">{st.studentId}</td>
                        <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">
                          <div className="flex items-center gap-2">
                            <img src={st.avatar} alt={st.firstName} className="w-6 h-6 rounded-full object-cover print:hidden" />
                            <span>{st.lastName} {st.firstName}</span>
                          </div>
                        </td>
                        <td className="p-3 text-center font-bold text-slate-600 dark:text-slate-400">{st.gender}</td>
                        <td className="p-3 text-center font-bold text-slate-800 dark:text-slate-200">{st.grade}-{st.section}</td>
                        <td className="p-3 text-center font-mono font-bold">{item.totalScore} / 130</td>
                        <td className="p-3 text-center font-mono font-black text-brand-600 dark:text-brand-400 text-sm">{item.avgScore}</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            {item.letterGrade}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-black ${passed ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' : 'bg-rose-100 text-rose-800'}`}>
                            {passed ? 'ជាប់' : 'ធ្លាក់'}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <span className="font-black text-red-600 dark:text-red-400 text-sm" style={{ color: 'red' }}>
                            ទី {rank}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Document Signatures */}
            <div className="grid grid-cols-2 gap-8 pt-8 font-sans text-xs border-t border-slate-200 dark:border-slate-800">
              <div className="text-center space-y-12">
                <div>
                  <p className="font-bold text-slate-600 dark:text-slate-400">គ្រូបន្ទុកថ្នាក់</p>
                  <p className="text-[10px] text-slate-400">Homeroom Teacher</p>
                </div>
                <p className="font-black text-slate-900 dark:text-slate-100">
                  {activeHomeroomTeacher ? `${activeHomeroomTeacher.lastName} ${activeHomeroomTeacher.firstName}` : 'គ្រូបន្ទុកថ្នាក់'}
                </p>
              </div>

              <div className="text-center space-y-12">
                <div>
                  <p className="font-medium text-slate-400">ថ្ងៃទី.........ខែ.........ឆ្នាំ២០២៦</p>
                  <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-1">នាយកសាលា</p>
                  <p className="text-[10px] text-slate-400">School Principal</p>
                </div>
                <p className="font-black text-slate-900 dark:text-slate-100">
                  {schoolInfo.principalName}
                </p>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* VIEW 2: STANDALONE HONOR ROLL WALL & CERTIFICATES */}
      {activeTab === 'honor_roll' && (
        <div className="space-y-5">
          
          {/* Action Bar for Honor Roll Download & Print */}
          <div className="glass-card p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500 fill-amber-500" />
              <div>
                <h3 className="text-sm font-black text-slate-900 dark:text-slate-100">
                  តារាងកិត្តិយសសិស្សពូកែ ៖ {selectedMonth}
                </h3>
                <p className="text-[11px] text-slate-500">
                  សិស្សទទួលបានជ័យលាភី និងលទ្ធផលសិក្សាឆ្នើម ឆ្នាំសិក្សា ២០២៦-២០២៧ (ចូលរៀនខែ១១)
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleExportHonorRollCSV}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                title="ទាញយកតារាងកិត្តិយសជា CSV"
              >
                <Download className="w-4 h-4" /> ទាញយកជា CSV
              </button>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all"
                title="បោះពុម្ពតារាងកិត្តិយស"
              >
                <Printer className="w-4 h-4" /> បោះពុម្ពតារាងកិត្តិយស
              </button>
            </div>
          </div>

          {/* Honor Roll Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-900 text-white shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-400/40">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shadow-lg shrink-0">
                <Sparkles className="w-8 h-8 fill-slate-950" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-amber-300 text-slate-950 uppercase tracking-widest">
                  MoEYS Wall of Honor
                </span>
                <h3 className="text-xl font-black mt-1">
                  តារាងកិត្តិយសសិស្សពូកែ ៖ {selectedMonth}
                </h3>
                <p className="text-xs text-amber-100">
                  សិស្សដែលមានស្នាដៃ និងលទ្ធផលសិក្សាឆ្នើម ចំណាត់ថ្នាក់លេខ ១ ដល់ ទី ៥ សម្រាប់{selectedMonth}
                </p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="px-4 py-2 rounded-2xl bg-slate-950/40 border border-amber-300/40 text-amber-200 text-xs font-extrabold font-mono">
                {selectedMonth}
              </span>
            </div>
          </div>

          {/* Top Outstanding Students Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {studentsWithGrades.slice(0, 6).map((item, index) => {
              const rank = index + 1;
              const medalColor =
                rank === 1 ? 'from-amber-400 to-amber-600 text-slate-950 ring-2 ring-amber-300' :
                rank === 2 ? 'from-slate-300 to-slate-400 text-slate-900' :
                rank === 3 ? 'from-amber-700 to-amber-800 text-white' : 'from-indigo-600 to-purple-600 text-white';

              const rankLabel = rank === 1 ? '🥇 ជ័យលាភីលេខ ១' : rank === 2 ? '🥈 ជ័យលាភីលេខ ២' : rank === 3 ? '🥉 ជ័យលាភីលេខ ៣' : `🏅 ចំណាត់ថ្នាក់លេខ ${rank}`;

              return (
                <div key={item.student.id} className="glass-card p-5 relative overflow-hidden flex flex-col justify-between space-y-4 hover:border-amber-400/50 transition-all shadow-md group">
                  
                  {/* Top Rank Header */}
                  <div className="flex items-center justify-between">
                    <span className={`px-3.5 py-1 rounded-xl text-xs font-black bg-gradient-to-r ${medalColor} shadow-md flex items-center gap-1.5`}>
                      <Medal className="w-4 h-4" /> {rankLabel}
                    </span>
                    <span className="text-xs font-black px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      {item.letterGrade}
                    </span>
                  </div>

                  {/* Student Profile */}
                  <div className="flex items-center gap-4">
                    <img
                      src={item.student.avatar}
                      alt={item.student.firstName}
                      className="w-16 h-16 rounded-2xl object-cover ring-4 ring-amber-400/40 shadow-lg group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <span className="text-[10px] font-extrabold text-slate-400 uppercase">
                        {item.student.grade}-{item.student.section} | {item.student.studentId}
                      </span>
                      <h4 className="text-base font-black text-slate-900 dark:text-slate-100 mt-0.5">
                        {item.student.lastName} {item.student.firstName}
                      </h4>
                      <p className="text-xs font-bold text-brand-600 dark:text-brand-400 mt-0.5">
                        ពិន្ទុមធ្យម៖ <span className="font-mono text-sm">{item.avgScore}</span> / 10
                      </p>
                    </div>
                  </div>

                  {/* Score Stats */}
                  <div className="grid grid-cols-2 gap-2 text-center p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">ពិន្ទុសរុប (១៣ មុខ)</span>
                      <span className="font-black text-slate-800 dark:text-slate-200">{item.totalScore} / 130</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block font-sans">កម្រិតសមត្ថភាព</span>
                      <span className="font-black text-amber-600 dark:text-amber-400">{item.letterGrade.split(' ')[0]}</span>
                    </div>
                  </div>

                  {/* Action Button: Print Honor Certificate */}
                  <button
                    onClick={() => setSelectedHonorCertificate({
                      student: item.student,
                      periodName: selectedMonth,
                      rank,
                      averageScore: Number(item.avgScore)
                    })}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Award className="w-4 h-4" /> មើល / បោះពុម្ព ប័ណ្ណសរសើរ
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 3: DETAILED 13-SUBJECT SCORE MATRIX */}
      {activeTab === 'matrix' && (
        <div className="glass-card overflow-hidden">
          
          {/* Table Title Bar */}
          <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-500" />
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                បញ្ជីពិន្ទុលម្អិត ១៣ មុខវិជ្ជាប្រចាំ <span className="text-brand-600 dark:text-brand-400 font-black">{selectedMonth}</span>
              </h3>
            </div>
            
            <span className="text-xs font-bold px-3 py-1 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 rounded-full border border-purple-200 dark:border-purple-800 self-start sm:self-auto">
              សរុប {studentsWithGrades.length} នាក់ • ១៣ មុខវិជ្ជាពេញលេញ
            </span>
          </div>

          {/* Student Score Ranking Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-100/70 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 text-center w-12">ល.រ</th>
                  <th className="py-3.5 px-4 font-mono">អត្តលេខ</th>
                  <th className="py-3.5 px-4">ឈ្មោះសិស្ស</th>
                  <th className="py-3.5 px-4 text-center">ថ្នាក់ទី</th>
                  <th className="py-3.5 px-4 text-center">ពិន្ទុសរុប (១៣ មុខវិជ្ជា)</th>
                  <th className="py-3.5 px-4 text-center">មធ្យមភាគប្រចាំ{selectedMonth}</th>
                  <th className="py-3.5 px-4 text-center">និទ្ទេស</th>
                  <th className="py-3.5 px-4 text-right">សកម្មភាព</th>
                  <th className="py-3.5 px-4 text-center text-red-600 dark:text-red-400 font-black">ចំណាត់ថ្នាក់</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
                {studentsWithGrades.map(({ student: st, gradeRec, totalScore, avgScore, letterGrade }, index) => {
                  const calculatedRank = index + 1;
                  const isExpanded = expandedStudentId === st.id;
                  const scoresList: SubjectScore[] = gradeRec?.subjectScores || DEFAULT_13_SUBJECTS.map(s => ({
                    ...s,
                    score: 9.0,
                    letterGrade: 'ល្អប្រសើរ (A)'
                  }));

                  return (
                    <React.Fragment key={st.id}>
                      <tr className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors">
                        <td className="py-3.5 px-4 text-center font-bold text-slate-700 dark:text-slate-300">
                          {index + 1}
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-slate-600 dark:text-slate-400">
                          {st.studentId}
                        </td>

                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={st.avatar}
                              alt={st.firstName}
                              className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                            />
                            <div>
                              <p className="font-extrabold text-slate-900 dark:text-slate-100">{st.lastName} {st.firstName}</p>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center font-bold text-slate-700 dark:text-slate-300">
                          {st.grade}-{st.section}
                        </td>

                        <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-900 dark:text-slate-100">
                          {totalScore} / 130
                        </td>

                        <td className="py-3.5 px-4 text-center font-mono font-black text-brand-600 dark:text-brand-400 text-sm">
                          {avgScore} / 10
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                            {letterGrade}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setExpandedStudentId(isExpanded ? null : st.id)}
                              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs transition-colors inline-flex items-center gap-1"
                              title="មើលពិន្ទុ ១៣ មុខវិជ្ជា"
                            >
                              <BookOpen className="w-3.5 h-3.5 text-brand-500" />
                              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                            </button>

                            {(userRole === 'admin' || userRole === 'teacher') && (
                              <button
                                onClick={() => handleOpenScoreEntryModal(st.id)}
                                className="px-2.5 py-1.5 rounded-xl bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 font-bold text-xs transition-colors inline-flex items-center gap-1"
                                title="កែប្រែពិន្ទុ"
                              >
                                <Edit3 className="w-3.5 h-3.5" /> កែពិន្ទុ
                              </button>
                            )}

                            <button
                              onClick={() => setSelectedStudentForReport(st)}
                              className="px-2.5 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs transition-colors inline-flex items-center gap-1 shadow-sm"
                            >
                              <FileText className="w-3.5 h-3.5" /> ព្រឹត្តិបត្រពិន្ទុ
                            </button>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          <span className="font-black text-red-600 dark:text-red-400 text-sm" style={{ color: 'red' }}>
                            ទី {calculatedRank}
                          </span>
                        </td>
                      </tr>

                      {/* Collapsible 13 Subjects Score Breakdown Row */}
                      {isExpanded && (
                        <tr className="bg-slate-50/90 dark:bg-slate-900/60">
                          <td colSpan={7} className="p-4 border-y border-slate-200 dark:border-slate-800">
                            <div className="space-y-2">
                              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                                ពិន្ទុលម្អិត ១៣ មុខវិជ្ជា របស់សិស្ស {st.lastName} {st.firstName} សម្រាប់ {selectedMonth}
                              </h4>

                              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                                {scoresList.map((s, sIdx) => (
                                  <div key={sIdx} className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                                    <p className="text-[10px] font-bold text-slate-500 truncate" title={s.subjectName}>
                                      {s.subjectName}
                                    </p>
                                    <p className="text-xs font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                                      {s.score} / 10
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Official Monthly Report Card Printable Modal */}
      {selectedStudentForReport && (
        <ReportCardModal
          student={selectedStudentForReport}
          grades={grades}
          selectedMonth={selectedMonth}
          onClose={() => setSelectedStudentForReport(null)}
        />
      )}

      {/* Printable Certificate of Honor Modal */}
      {selectedHonorCertificate && (
        <CertificateOfHonorModal
          student={selectedHonorCertificate.student}
          periodName={selectedHonorCertificate.periodName}
          rank={selectedHonorCertificate.rank}
          averageScore={selectedHonorCertificate.averageScore}
          onClose={() => setSelectedHonorCertificate(null)}
        />
      )}

      {/* Enter / Edit 13 Subjects Score Form Modal */}
      {showAddGradeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl p-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-brand-500" /> បញ្ចូលពិន្ទុ ១៣ មុខវិជ្ជា (ប្រចាំ{selectedMonth})
                </h3>
                <p className="text-xs text-slate-500">សាលាបឋមសិក្សា អន្លង់តាម៉ី • គណនាចំណាត់ថ្នាក់ស្វ័យប្រវត្តិ</p>
              </div>
              <button onClick={() => setShowAddGradeModal(false)} className="p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSaveScoresSubmit} className="space-y-4 text-xs">
              
              {/* Target Student Selection */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ជ្រើសរើសសិស្ស</label>
                <select
                  value={targetStudentId}
                  onChange={(e) => setTargetStudentId(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-slate-900 dark:text-slate-100"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id}>{s.lastName} {s.firstName} ({s.studentId}) - ថ្នាក់ទី {s.grade}-{s.section}</option>
                  ))}
                </select>
              </div>

              {/* 13 Subject Inputs Matrix */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-2">
                  ពិន្ទុតាមមុខវិជ្ជាទាំង ១៣ (ពិន្ទុអតិបរមា ១០ ក្នុងមួយមុខវិជ្ជា)
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto p-1">
                  {DEFAULT_13_SUBJECTS.map((s, idx) => (
                    <div key={idx} className="p-2.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-xl">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-extrabold text-slate-800 dark:text-slate-200">{s.subjectName}</span>
                        <span className="text-[10px] text-slate-400">{s.subjectNameEn}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="10"
                          value={formScores[s.subjectName] ?? 9.0}
                          onChange={(e) => handleScoreChange(s.subjectName, parseFloat(e.target.value) || 0)}
                          className="w-full p-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg font-black text-brand-600 dark:text-brand-400 text-right"
                          required
                        />
                        <span className="font-bold text-slate-500">/10</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddGradeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-extrabold shadow-md"
                >
                  រក្សាទុកពិន្ទុ & គណនាចំណាត់ថ្នាក់
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Batch Class Grade Input Modal */}
      {showBatchModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-amber-400/60 dark:border-amber-700/60 rounded-3xl w-full max-w-6xl overflow-hidden shadow-2xl p-6 my-6 flex flex-col max-h-[92vh]">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-4 gap-3 shrink-0">
              <div>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-black bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  MoEYS 13 Primary Subjects Batch Grade Entry System
                </span>
                <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1 flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-amber-500" />
                  ទម្រង់បញ្ចូល និងកែប្រែពិន្ទុរហ័សប្រចាំថ្នាក់ (គណនា និងលោតចូលតារាងស្វ័យប្រវត្តិ)
                </h3>
              </div>
              <button onClick={() => setShowBatchModal(false)} className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white self-end sm:self-auto">
                ✕
              </button>
            </div>

            {/* Selectors Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 mb-4 text-xs font-bold shrink-0">
              <div className="flex flex-wrap items-center gap-3">
                <span>ថ្នាក់រៀន ៖</span>
                <select
                  value={batchClassId}
                  onChange={(e) => handleOpenBatchModal(e.target.value, batchMonth)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-extrabold text-brand-600 dark:text-brand-400"
                >
                  {classes.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.roomNumber})</option>
                  ))}
                </select>

                <span>សម័យប្រឡង / ឆមាស ៖</span>
                <select
                  value={batchMonth}
                  onChange={(e) => handleOpenBatchModal(batchClassId, e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 font-extrabold text-amber-600 dark:text-amber-400"
                >
                  {EXAM_PERIODS.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              <span className="text-slate-500">
                បញ្ចូលពិន្ទុ ១៣ មុខវិជ្ជា (ពិន្ទុអតិបរមា ១០ / មុខវិជ្ជា)
              </span>
            </div>

            {/* Batch Table Container */}
            <form onSubmit={handleSaveBatchSubmit} className="flex-1 flex flex-col min-h-0">
              <div className="flex-1 overflow-x-auto overflow-y-auto border border-slate-200 dark:border-slate-800 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
                      <th className="p-3 w-10 text-center">ល.រ</th>
                      <th className="p-3">ឈ្មោះសិស្ស</th>
                      {DEFAULT_13_SUBJECTS.map((s, idx) => (
                        <th key={idx} className="p-2 text-center min-w-[75px]" title={s.subjectNameEn}>
                          {s.subjectName}
                        </th>
                      ))}
                      <th className="p-3 text-center bg-brand-500/10 text-brand-600 dark:text-brand-300">ពិន្ទុសរុប (/១៣០)</th>
                      <th className="p-3 text-center bg-brand-500/10 text-brand-600 dark:text-brand-300">មធ្យមភាគ (/១០)</th>
                      <th className="p-3 text-center bg-amber-500/10 text-amber-600 dark:text-amber-400">និទ្ទេស</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {(() => {
                      const clsGroup = classes.find(c => c.id === batchClassId || c.name === batchClassId);
                      const targetStudents = students.filter(s => {
                        if (clsGroup) {
                          return s.grade === `ថ្នាក់ទី ${clsGroup.gradeLevel}` && s.section === clsGroup.section;
                        }
                        return true;
                      });

                      if (targetStudents.length === 0) {
                        return (
                          <tr>
                            <td colSpan={18} className="py-12 text-center text-slate-400 font-bold">
                              មិនមានទិន្នន័យសិស្សក្នុងថ្នាក់នេះទេ។
                            </td>
                          </tr>
                        );
                      }

                      return targetStudents.map((st, sIdx) => {
                        const studentMap = batchScores[st.id] || {};
                        const total = DEFAULT_13_SUBJECTS.reduce((acc, sub) => acc + (studentMap[sub.subjectName] ?? 8.5), 0);
                        const avg = (total / 13).toFixed(1);
                        const letter = getLetter(Number(avg));

                        return (
                          <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                            <td className="p-3 text-center font-bold text-slate-500">{sIdx + 1}</td>
                            <td className="p-3 font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                              {st.lastName} {st.firstName}
                              <p className="text-[10px] text-slate-400 font-mono font-normal">{st.studentId}</p>
                            </td>
                            {DEFAULT_13_SUBJECTS.map((sub, subIdx) => (
                              <td key={subIdx} className="p-1.5 text-center">
                                <input
                                  type="number"
                                  step="0.1"
                                  min="0"
                                  max="10"
                                  value={studentMap[sub.subjectName] ?? 8.5}
                                  onChange={(e) => handleBatchScoreChange(st.id, sub.subjectName, parseFloat(e.target.value) || 0)}
                                  className="w-14 p-1.5 text-center bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg font-black text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                                />
                              </td>
                            ))}
                            <td className="p-3 text-center font-black text-slate-900 dark:text-slate-100 bg-brand-500/5 font-mono">
                              {total.toFixed(1)}
                            </td>
                            <td className="p-3 text-center font-black text-brand-600 dark:text-brand-400 bg-brand-500/5 font-mono text-sm">
                              {avg}
                            </td>
                            <td className="p-3 text-center bg-amber-500/5 font-bold">
                              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-purple-500/10 text-purple-600 dark:text-purple-300">
                                {letter}
                              </span>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>

              {/* Action Footer */}
              <div className="pt-4 mt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
                <span className="text-slate-500 font-medium">
                  ✨ ចុះ "រក្សាទុក" ដើម្បីរៀបចំណាត់ថ្នាក់ និងលោតចូលតារាងចំណាត់ថ្នាក់/តារាងកិត្តិយស/របាយការណ៍ MoEYS ដោយស្វ័យប្រវត្តិ។
                </span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowBatchModal(false)}
                    className="px-4 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300"
                  >
                    បោះបង់
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-lg"
                  >
                    💾 រក្សាទុក និងគណនាស្វ័យប្រវត្តិ
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

import React from 'react';
import type { Student, GradeRecord } from '../../types';
import { useApp } from '../../context/AppContext';
import { X, Printer, Award, BookOpen, CheckCircle } from 'lucide-react';

interface ReportCardModalProps {
  student: Student;
  grades: GradeRecord[];
  selectedMonth?: string;
  onClose: () => void;
}

export const ReportCardModal: React.FC<ReportCardModalProps> = ({
  student,
  grades,
  selectedMonth = 'ខែកញ្ញា',
  onClose
}) => {
  const { language } = useApp();

  // Find record for this student for the selected month or fallback to student's latest record
  const studentGradeRecord = grades.find(
    g => (g.studentId === student.id || g.studentName.includes(student.firstName)) &&
         (g.month === selectedMonth || g.examName.includes(selectedMonth))
  ) || grades.find(g => g.studentId === student.id || g.studentName.includes(student.firstName));

  const subjectScores = studentGradeRecord?.subjectScores || [
    { subjectName: 'អំណាន', subjectNameEn: 'Reading', score: 9.5, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'ការស្ដាប់', subjectNameEn: 'Listening', score: 9.0, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'សរសេរតាមអាន', subjectNameEn: 'Dictation', score: 8.5, maxScore: 10, letterGrade: 'ល្អ (B)' },
    { subjectName: 'តែងសេចក្ដី', subjectNameEn: 'Composition', score: 9.0, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'គណិតវិទ្យា', subjectNameEn: 'Mathematics', score: 9.8, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'វិទ្យាសាស្ត្រ', subjectNameEn: 'Science', score: 9.2, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'សីលធម៌', subjectNameEn: 'Ethics & Civics', score: 9.5, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'ភូមិវិទ្យា', subjectNameEn: 'Geography', score: 8.8, maxScore: 10, letterGrade: 'ល្អ (B)' },
    { subjectName: 'ប្រវត្តិវិទ្យា', subjectNameEn: 'History', score: 9.0, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'គេហវិទ្យា', subjectNameEn: 'Home Economics', score: 9.5, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'អប់រំកាយ', subjectNameEn: 'Physical Education', score: 10.0, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'អប់រំបំណិនជីវិត', subjectNameEn: 'Life Skills', score: 9.5, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' },
    { subjectName: 'ភាសាបរទេស', subjectNameEn: 'Foreign Language (English)', score: 9.2, maxScore: 10, letterGrade: 'ល្អប្រសើរ (A)' }
  ];

  const totalObtained = studentGradeRecord?.marksObtained ?? subjectScores.reduce((acc, s) => acc + s.score, 0);
  const totalMax = studentGradeRecord?.maxMarks ?? (subjectScores.length * 10);
  const overallAvg = (totalObtained / subjectScores.length).toFixed(1);
  const rank = studentGradeRecord?.rankInClass ?? student.rankInClass ?? 1;
  const monthName = studentGradeRecord?.month || selectedMonth;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-4xl overflow-hidden shadow-2xl relative my-8">
        
        {/* Action Header - Hidden when printing */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between no-print">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <h3 className="text-sm font-bold">
              {language === 'km' ? `ព្រឹត្តិបត្រពិន្ទុ និងការវាយតម្លៃលទ្ធផលសិក្សា ${monthName}` : `Official Report Card - ${monthName}`}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-brand-600 hover:bg-brand-500 text-white text-xs font-bold rounded-xl transition-colors shadow"
            >
              <Printer className="w-3.5 h-3.5" /> {language === 'km' ? 'បោះពុម្ពព្រឹត្តិបត្រពិន្ទុ' : 'Print Report Card'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Cambodian Primary School Transcript Body */}
        <div className="p-8 space-y-6 printable-area bg-white text-slate-900 font-sans">
          
          {/* Kingdom of Cambodia MoEYS Header */}
          <div className="text-center space-y-1 border-b-2 border-slate-900 pb-5">
            <h2 className="text-lg font-black tracking-tight text-slate-900">ព្រះរាជាណាចក្រកម្ពុជា</h2>
            <h3 className="text-sm font-extrabold text-slate-800">ជាតិ សាសនា ព្រះមហាក្សត្រ</h3>
            <div className="flex justify-center my-1">
              <span className="w-24 h-0.5 bg-slate-800 block" />
            </div>
            <p className="text-xs font-bold text-slate-700">ក្រសួងអប់រំ យុវជន និងកីឡា • មន្ទីរអប់រំ យុវជន និងកីឡា ខេត្តបាត់ដំបង</p>
            <h1 className="text-xl font-black text-brand-700 uppercase mt-2">សាលាបឋមសិក្សា អន្លង់តាម៉ី</h1>
            <p className="text-xs text-slate-500 font-bold">ANLONG TAMEY PRIMARY SCHOOL (BATTAMBANG, CAMBODIA)</p>
          </div>

          {/* Title Badge */}
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-lg bg-amber-100 text-amber-900 text-sm font-black uppercase tracking-wide border border-amber-300">
              បញ្ជីពិន្ទុ និងចំណាត់ថ្នាក់សិស្សប្រចាំ {monthName}
            </span>
            <p className="text-xs font-semibold text-slate-600 mt-1">ឆ្នាំសិក្សា ២០២៥ - ២០២៦ • កម្រិតបឋមសិក្សា</p>
          </div>

          {/* Student Info Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-300 text-xs">
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">ឈ្មោះសិស្ស / Student Name</p>
              <p className="font-extrabold text-slate-900 text-sm">{student.lastName} {student.firstName}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">អត្តលេខ & ថ្នាក់ទី / Grade</p>
              <p className="font-bold text-slate-800">{student.studentId} • {student.grade}-{student.section}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">ចំណាត់ថ្នាក់ប្រចាំ{monthName}</p>
              <p className="font-extrabold text-emerald-600 text-sm">ចំណាត់ថ្នាក់ទី {rank}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-500 uppercase">មធ្យមភាគពិន្ទុ / Monthly Avg</p>
              <p className="font-extrabold text-brand-600 text-sm">{overallAvg} / ១០</p>
            </div>
          </div>

          {/* Full 13 Subject Breakdown Table */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-800 mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5"><BookOpen className="w-4 h-4 text-slate-700" /> បញ្ជីពិន្ទុ ១៣ មុខវិជ្ជា ផ្លូវការ (១៣ មុខវិជ្ជាបឋមសិក្សា)</span>
              <span className="text-[11px] font-bold text-slate-500">ពិន្ទុអតិបរមា ១០ ក្នុងមួយមុខវិជ្ជា</span>
            </h4>
            
            <table className="w-full text-left border-collapse border border-slate-400 text-xs">
              <thead>
                <tr className="bg-slate-100 text-slate-900 font-bold border-b border-slate-400">
                  <th className="p-2 border-r border-slate-400 text-center w-10">ល.រ</th>
                  <th className="p-2 border-r border-slate-400">មុខវិជ្ជាសិក្សា (Subject Name)</th>
                  <th className="p-2 border-r border-slate-400 text-center">ពិន្ទុទទួលបាន (Score / 10)</th>
                  <th className="p-2 text-center">និទ្ទេស (Grade)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-300">
                {subjectScores.map((s, idx) => (
                  <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}>
                    <td className="p-2 border-r border-slate-300 text-center font-bold text-slate-600">{idx + 1}</td>
                    <td className="p-2 border-r border-slate-300 font-bold text-slate-900">
                      {s.subjectName} <span className="text-[10px] font-normal text-slate-500">({s.subjectNameEn})</span>
                    </td>
                    <td className="p-2 border-r border-slate-300 text-center font-extrabold text-slate-900">{s.score} / 10</td>
                    <td className="p-2 text-center font-black text-brand-700">{s.letterGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Transcript Overall Summary */}
          <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">សរុបពិន្ទុ ១៣ មុខវិជ្ជា (Total Score)</p>
              <p className="text-base font-extrabold">{totalObtained.toFixed(1)} / {totalMax}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">មធ្យមភាគប្រចាំ{monthName}</p>
              <p className="text-base font-extrabold text-emerald-400">{overallAvg} / ១០</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">ចំណាត់ថ្នាក់ប្រចាំថ្នាក់</p>
              <p className="text-base font-extrabold text-amber-400">ចំណាត់ថ្នាក់ទី {rank}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400">លទ្ធផលរួម (Overall Result)</p>
              <p className="text-base font-extrabold text-emerald-300 flex items-center gap-1 justify-end">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> ជាប់ជោគជ័យ
              </p>
            </div>
          </div>

          {/* Signature & Official Seal Block */}
          <div className="pt-6 grid grid-cols-2 gap-8 text-center text-xs">
            <div>
              <p className="text-slate-500 font-medium">ថ្ងៃពុធ ៥កើត ខែភទ្របទ ឆ្នាំរោង</p>
              <p className="font-bold text-slate-900 mt-1">បានឃើញ និងឯកភាព</p>
              <p className="font-bold text-slate-900">នាយកសាលាបឋមសិក្សា អន្លង់តាម៉ី</p>
              <div className="h-16 flex items-end justify-center">
                <span className="text-slate-400 italic text-[11px]">(ហត្ថលេខា និងត្រាសាលា)</span>
              </div>
              <p className="font-extrabold text-slate-900">លោក គង់ សំអាត</p>
            </div>

            <div>
              <p className="text-slate-500 font-medium">ស្រុកសង្កែ, ថ្ងៃទី២៣ ខែកញ្ញា ឆ្នាំ២០២៦</p>
              <p className="font-bold text-slate-900 mt-1">គ្រូបន្ទុកថ្នាក់</p>
              <div className="h-16 flex items-end justify-center">
                <span className="font-serif italic text-slate-700 text-sm">អ្នកគ្រូ គឹម ស្រីពៅ</span>
              </div>
              <p className="font-extrabold text-slate-900">អ្នកគ្រូ គឹម ស្រីពៅ</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  FileText,
  Printer,
  Download,
  X,
  Building2,
  Users,
  Award,
  BookOpen
} from 'lucide-react';

interface MoEYSStandardReportsModalProps {
  onClose: () => void;
}

export const MoEYSStandardReportsModal: React.FC<MoEYSStandardReportsModalProps> = ({ onClose }) => {
  const { schoolInfo, students, teachers, classes, grades } = useApp();
  const [reportType, setReportType] = useState<'enrollment' | 'equity' | 'academic' | 'honor' | 'teachers'>('enrollment');

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // CSV Export function for official report
  const handleExportReportCSV = () => {
    let csvContent = '';
    let fileName = '';

    if (reportType === 'enrollment') {
      fileName = `របាយការណ៍ស្ថិតិសិស្ស_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['កម្រិតថ្នាក់', 'បន្ទប់', 'សិស្សសរុប', 'សិស្សស្រី', 'សិស្សប្រុស', 'គ្រូបន្ទុកថ្នាក់'];
      const rows = classes.map(cls => {
        const clsStudents = students.filter(s => s.grade.includes(cls.gradeLevel) && s.section === cls.section);
        const femaleCount = clsStudents.filter(s => s.gender === 'ស្រី' || s.gender === 'Female').length;
        const maleCount = clsStudents.length - femaleCount;
        const teacher = teachers.find(t => t.id === cls.classTeacherId);
        return [
          `ថ្នាក់ទី ${cls.gradeLevel}`,
          `បន្ទប់ ${cls.section}`,
          clsStudents.length,
          femaleCount,
          maleCount,
          teacher ? `"${teacher.lastName} ${teacher.firstName}"` : 'មិនទាន់ចាត់តាំង'
        ];
      });
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportType === 'equity') {
      fileName = `របាយការណ៍បណ្ណសមធម៌_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['អត្តលេខ', 'គោត្តនាម', 'នាម', 'ភេទ', 'ថ្នាក់ទី', 'បន្ទប់', 'ប្រភេទបណ្ណសមធម៌', 'អាស័យដ្ឋាន'];
      const rows = students
        .filter(s => s.equityCard && !s.equityCard.includes('គ្មាន'))
        .map(s => [
          s.studentId,
          s.lastName,
          s.firstName,
          s.gender,
          s.grade,
          s.section,
          `"${s.equityCard}"`,
          `"${s.address.replace(/"/g, '""')}"`
        ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportType === 'academic') {
      fileName = `របាយការណ៍លទ្ធផលសិក្សា_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['អត្តលេខ', 'ឈ្មោះសិស្ស', 'ថ្នាក់ទី-បន្ទប់', 'ប្រឡងខែ', 'ពិន្ទុសរុប (១៣០)', 'ចំណាត់ថ្នាក់', 'និទ្ទេស'];
      const rows = grades.map(g => [
        g.studentId,
        `"${g.studentName}"`,
        g.className,
        g.month,
        g.marksObtained,
        g.rankInClass || 1,
        g.letterGrade
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else if (reportType === 'honor') {
      fileName = `របាយការណ៍តារាងកិត្តិយសសិស្សពូកែ_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['អត្តលេខ', 'ឈ្មោះសិស្សពូកែ', 'ភេទ', 'ថ្នាក់ទី-បន្ទប់', 'មធ្យមភាគ', 'ចំណាត់ថ្នាក់', 'និទ្ទេស'];
      const topStudents = students.filter(s => s.rankInClass <= 3).sort((a, b) => a.rankInClass - b.rankInClass);
      const rows = topStudents.map(s => [
        s.studentId,
        `"${s.lastName} ${s.firstName}"`,
        s.gender,
        `"${s.grade} (${s.section})"`,
        s.gpa.toFixed(1),
        `ទី${s.rankInClass}`,
        'ល្អប្រសើរ (A)'
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    } else {
      fileName = `បញ្ជីគ្រូបន្ទុកថ្នាក់_${schoolInfo.schoolName}_${new Date().toISOString().split('T')[0]}.csv`;
      const headers = ['អត្តលេខបុគ្គលិក', 'ឈ្មោះគ្រូបង្រៀន', 'ភេទ', 'ជំនាញ/កម្រិតវប្បធម៌', 'លេខទូរស័ព្ទ', 'ថ្នាក់បន្ទុក'];
      const rows = teachers.map(t => [
        t.employeeId,
        `"${t.lastName} ${t.firstName}"`,
        'គ្រូបង្រៀន',
        `"${t.qualification}"`,
        t.phone,
        `"${t.assignedClasses.join('; ')}"`
      ]);
      csvContent = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    }

    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto font-sans">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6 max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 flex items-center justify-center font-bold">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  MoEYS Standard Reports
                </span>
                <span className="text-xs text-slate-400">ឆ្នាំសិក្សា {schoolInfo.academicYear}</span>
              </div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-slate-100 mt-0.5">
                មជ្ឈមណ្ឌលរបាយការណ៍ និងស្ថិតិស្ដង់ដារសាលារៀន
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportReportCSV}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <Download className="w-4 h-4" /> ទាញយក CSV
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs rounded-xl shadow-sm transition-all"
            >
              <Printer className="w-4 h-4" /> បោះពុម្ព
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Category Subtabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <button
            onClick={() => setReportType('enrollment')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              reportType === 'enrollment'
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Users className="w-4 h-4" /> ស្ថិតិសិស្សតាមថ្នាក់ (ក/ខ)
          </button>
          <button
            onClick={() => setReportType('equity')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              reportType === 'equity'
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Building2 className="w-4 h-4" /> ស្ថិតិបណ្ណសមធម៌ (ក្រ១/ក្រ២)
          </button>
          <button
            onClick={() => setReportType('academic')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              reportType === 'academic'
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Award className="w-4 h-4" /> ស្ថិតិលទ្ធផលសិក្សាប្រចាំខែ
          </button>
          <button
            onClick={() => setReportType('honor')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              reportType === 'honor'
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" /> តារាងកិត្តិយសសិស្សពូកែ
          </button>
          <button
            onClick={() => setReportType('teachers')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
              reportType === 'teachers'
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
            }`}
          >
            <BookOpen className="w-4 h-4" /> បញ្ជីគ្រូបន្ទុកថ្នាក់
          </button>
        </div>

        {/* Printable Official Document Content */}
        <div className="flex-1 overflow-y-auto space-y-6 pr-1 font-serif text-slate-900 dark:text-slate-100">
          
          {/* Official MoEYS Document Header Header */}
          <div className="text-center space-y-1 py-2 border-b-2 border-slate-900 dark:border-slate-100">
            <h3 className="font-extrabold text-sm sm:text-base tracking-widest text-amber-700 dark:text-amber-400">
              ព្រះរាជាណាចក្រកម្ពុជា ជាតិ សាសនា ព្រះមហាក្សត្រ
            </h3>
            <p className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              ក្រសួងអប់រំ យុវជន និងកីឡា • មន្ទីរអប់រំ យុវជន និងកីឡា {schoolInfo.province}
            </p>
            <h2 className="text-base sm:text-xl font-black text-slate-900 dark:text-slate-100 pt-2 font-sans">
              {schoolInfo.schoolName} (កូដ៖ {schoolInfo.schoolCode})
            </h2>
            <p className="text-xs font-medium text-slate-500 font-sans">
              អាស័យដ្ឋាន៖ {schoolInfo.village}, {schoolInfo.commune}, {schoolInfo.district}, {schoolInfo.province}
            </p>
          </div>

          {/* Report Content 1: Enrolment Roster */}
          {reportType === 'enrollment' && (
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                  តារាងស្ថិតិសិស្សានុសិស្ស តាមកម្រិតថ្នាក់ និងបន្ទប់សិក្សា (មត្តេយ្យទាប, មធ្យម, ខ្ពស់ និងថ្នាក់ទី១ ដល់ ទី៦)
                </h4>
                <span className="font-bold text-slate-500">សិស្សសរុប {students.length} នាក់</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3">ថ្នាក់រៀន</th>
                      <th className="p-3 text-center">បន្ទប់ (Section)</th>
                      <th className="p-3 text-center">សិស្សសរុប</th>
                      <th className="p-3 text-center text-pink-600 dark:text-pink-400">ស្រី</th>
                      <th className="p-3 text-center text-blue-600 dark:text-blue-400">ប្រុស</th>
                      <th className="p-3">គ្រូបន្ទុកថ្នាក់ (Homeroom Teacher)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {classes.map(cls => {
                      const clsStudents = students.filter(s => s.grade.includes(cls.gradeLevel) && s.section === cls.section);
                      const femaleCount = clsStudents.filter(s => s.gender === 'ស្រី' || s.gender === 'Female').length;
                      const maleCount = clsStudents.length - femaleCount;
                      const teacher = teachers.find(t => t.id === cls.classTeacherId);

                      return (
                        <tr key={cls.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{cls.name}</td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 rounded font-extrabold bg-brand-500/10 text-brand-600">
                              បន្ទប់ {cls.section}
                            </span>
                          </td>
                          <td className="p-3 text-center font-bold">{clsStudents.length} នាក់</td>
                          <td className="p-3 text-center font-bold text-pink-600 dark:text-pink-400">{femaleCount} នាក់</td>
                          <td className="p-3 text-center font-bold text-blue-600 dark:text-blue-400">{maleCount} នាក់</td>
                          <td className="p-3 font-bold text-purple-600 dark:text-purple-400">
                            {teacher ? `${teacher.lastName} ${teacher.firstName}` : 'មិនទាន់ចាត់តាំង'}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report Content 2: Equity IDPoor Report */}
          {reportType === 'equity' && (
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                  តារាងបញ្ជីឈ្មោះសិស្សទទួលបានបណ្ណសមធម៌ (ក្រ១ និង ក្រ២)
                </h4>
                <span className="font-bold text-rose-600">
                  សរុប {students.filter(s => s.equityCard && !s.equityCard.includes('គ្មាន')).length} នាក់
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3">អត្តលេខ</th>
                      <th className="p-3">ឈ្មោះសិស្ស</th>
                      <th className="p-3 text-center">ភេទ</th>
                      <th className="p-3 text-center">ថ្នាក់ទី-បន្ទប់</th>
                      <th className="p-3 text-center">ប្រភេទបណ្ណសមធម៌</th>
                      <th className="p-3">អាស័យដ្ឋានបច្ចុប្បន្ន</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {students
                      .filter(s => s.equityCard && !s.equityCard.includes('គ្មាន'))
                      .map(s => (
                        <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-mono text-[11px]">{s.studentId}</td>
                          <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{s.lastName} {s.firstName}</td>
                          <td className="p-3 text-center">{s.gender}</td>
                          <td className="p-3 text-center font-bold">{s.grade} ({s.section})</td>
                          <td className="p-3 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold ${
                              s.equityCard?.includes('ក្រ១') ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-amber-100 text-amber-700 border border-amber-300'
                            }`}>
                              {s.equityCard}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600 dark:text-slate-400 truncate max-w-xs">{s.address}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report Content 3: Academic Results */}
          {reportType === 'academic' && (
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                  តារាងលទ្ធផលប្រឡង និងចំណាត់ថ្នាក់សិស្សប្រចាំខែកញ្ញា (១៣ មុខវិជ្ជា)
                </h4>
                <span className="font-bold text-brand-600">សរុប {grades.length} កំណត់ត្រា</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3 text-center w-12">ល.រ</th>
                      <th className="p-3">អត្តលេខ</th>
                      <th className="p-3">ឈ្មោះសិស្ស</th>
                      <th className="p-3 text-center">ថ្នាក់ទី-បន្ទប់</th>
                      <th className="p-3 text-center">ប្រឡងខែ</th>
                      <th className="p-3 text-center">ពិន្ទុសរុប (១៣០)</th>
                      <th className="p-3 text-center">និទ្ទេស</th>
                      <th className="p-3 text-center text-red-600 dark:text-red-400 font-black">ចំណាត់ថ្នាក់</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {grades.map((g, idx) => (
                      <tr key={g.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{idx + 1}</td>
                        <td className="p-3 font-mono text-[11px] font-bold">{g.studentId}</td>
                        <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{g.studentName}</td>
                        <td className="p-3 text-center font-bold">{g.className}</td>
                        <td className="p-3 text-center">{g.month}</td>
                        <td className="p-3 text-center font-black text-brand-600">{g.marksObtained} / 130</td>
                        <td className="p-3 text-center">
                          <span className="px-2 py-0.5 rounded font-extrabold bg-emerald-100 text-emerald-700">
                            {g.letterGrade}
                          </span>
                        </td>
                        <td className="p-3 text-center font-extrabold text-red-600 dark:text-red-400" style={{ color: 'red' }}>
                          លេខ {g.rankInClass || 1}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report Content 4: Honor Roll / Top Students */}
          {reportType === 'honor' && (
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                  តារាងកិត្តិយសសិស្សពូកែប្រចាំសាលា (ចំណាត់ថ្នាក់ទី១, ទី២, ទី៣ តាមថ្នាក់)
                </h4>
                <span className="font-bold text-amber-600">
                  សរុប {students.filter(s => s.rankInClass <= 3).length} នាក់
                </span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-200 font-extrabold border-b border-amber-200 dark:border-amber-800">
                      <th className="p-3 text-center w-12">ល.រ</th>
                      <th className="p-3 font-mono">អត្តលេខ</th>
                      <th className="p-3">ឈ្មោះសិស្សពូកែ</th>
                      <th className="p-3 text-center">ភេទ</th>
                      <th className="p-3 text-center">ថ្នាក់ទី-បន្ទប់</th>
                      <th className="p-3 text-center">មធ្យមភាគ (/១០)</th>
                      <th className="p-3 text-center">និទ្ទេស</th>
                      <th className="p-3 text-center text-red-600 dark:text-red-400 font-black">ចំណាត់ថ្នាក់</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {students
                      .filter(s => s.rankInClass <= 3)
                      .sort((a, b) => a.rankInClass - b.rankInClass)
                      .map((s, idx) => (
                        <tr key={s.id} className="hover:bg-amber-50/50 dark:hover:bg-amber-950/20">
                          <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{idx + 1}</td>
                          <td className="p-3 font-mono text-[11px] font-bold">{s.studentId}</td>
                          <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{s.lastName} {s.firstName}</td>
                          <td className="p-3 text-center">{s.gender}</td>
                          <td className="p-3 text-center font-bold">{s.grade} ({s.section})</td>
                          <td className="p-3 text-center font-black text-brand-600">{s.gpa.toFixed(1)}</td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 rounded font-extrabold bg-emerald-100 text-emerald-800">
                              ល្អប្រសើរ (A)
                            </span>
                          </td>
                          <td className="p-3 text-center font-extrabold text-red-600 dark:text-red-400" style={{ color: 'red' }}>
                            🏆 ទី{s.rankInClass}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Report Content 4: Teacher Homeroom Assignments */}
          {reportType === 'teachers' && (
            <div className="space-y-4 font-sans text-xs">
              <div className="flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200">
                  បញ្ជីឈ្មោះលោកគ្រូ អ្នកគ្រូបង្រៀន និងការចាត់តាំងថ្នាក់បន្ទុក (Homeroom Faculty Roster)
                </h4>
                <span className="font-bold text-purple-600">សរុប {teachers.length} នាក់</span>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-extrabold border-b border-slate-200 dark:border-slate-700">
                      <th className="p-3">កូដបុគ្គលិក</th>
                      <th className="p-3">គោត្តនាម & នាម</th>
                      <th className="p-3">កម្រិតវប្បធម៌/គរុកោសល្យ</th>
                      <th className="p-3">លេខទូរស័ព្ទ</th>
                      <th className="p-3">ថ្នាក់បន្ទុក (Assigned Classes)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                    {teachers.map(t => (
                      <tr key={t.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                        <td className="p-3 font-mono text-[11px]">{t.employeeId}</td>
                        <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{t.lastName} {t.firstName}</td>
                        <td className="p-3 text-center">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                            t.teacherCategory === 'គ្រូក្របខ័ណ្ឌ' ? 'bg-purple-100 text-purple-700' :
                            t.teacherCategory === 'គ្រូកិច្ចសន្យា' ? 'bg-blue-100 text-blue-700' :
                            'bg-emerald-100 text-emerald-700'
                          }`}>
                            {t.teacherCategory || 'គ្រូក្របខ័ណ្ឌ'}
                          </span>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">{t.qualification}</td>
                        <td className="p-3 font-mono">{t.phone}</td>
                        <td className="p-3">
                          <div className="flex flex-wrap gap-1">
                            {t.assignedClasses.map(ac => (
                              <span key={ac} className="px-2 py-0.5 rounded font-extrabold bg-purple-100 text-purple-700">
                                {ac}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Official Signature Footer */}
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-sans">
            <div>
              <p className="font-bold text-slate-500">បានឃើញ និងពិនិត្យត្រឹមត្រូវ</p>
              <p className="font-black text-slate-800 dark:text-slate-200 mt-1">នាយកសាលា</p>
              <p className="text-slate-400 mt-10 font-bold">{schoolInfo.principalName}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-slate-500">
                ធ្វើនៅ {schoolInfo.village}, ថ្ងៃទី {new Date().getDate()} ខែកញ្ញា ឆ្នាំ ២០២៦
              </p>
              <p className="font-black text-slate-800 dark:text-slate-200 mt-1">អ្នករៀបចំរបាយការណ៍</p>
              <p className="text-slate-400 mt-10 font-bold">គណៈគ្រប់គ្រងរដ្ឋបាលសាលា</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

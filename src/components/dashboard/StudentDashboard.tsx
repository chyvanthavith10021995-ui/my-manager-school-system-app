import React from 'react';
import { useApp } from '../../context/AppContext';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  Award,
  CalendarCheck,
  FileText,
  TrendingUp,
  Clock,
  Sparkles,
  Printer
} from 'lucide-react';

interface StudentDashboardProps {
  onNavigate: (tab: any) => void;
  onOpenReportCard: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ onOpenReportCard }) => {
  const { students, grades, announcements, userRole, language } = useApp();

  // Select target student based on role (Chan Sophea)
  const student = students[0]; 
  const studentGrades = grades.filter(g => g.studentId === student.id || g.studentName.includes(student.firstName));

  return (
    <div className="space-y-6 font-sans">

      {/* Printable Student Profile Summary (Only visible when printing) */}
      <div className="hidden print:block">
        <PrintHeader
          title={`ប័ណ្ណលទ្ធផលសិក្សា និងជីវប្រវត្តិសង្ខេប - ${student.lastName} ${student.firstName}`}
          subtitle={`អត្តលេខសិស្ស ៖ ${student.studentId} | ថ្នាក់ទី ៖ ${student.grade} (${student.section})`}
          classNameInfo={`${student.grade} - បន្ទប់ ${student.section}`}
          dateInfo={`កាលបរិច្ឆេទ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <div className="space-y-4 text-black">
          <table className="w-full text-left border-collapse border border-slate-400 text-xs">
            <thead>
              <tr className="bg-slate-100 font-extrabold">
                <th className="p-2 border border-slate-400">ព័ត៌មានលម្អិតសិស្ស</th>
                <th className="p-2 border border-slate-400">ទិន្នន័យ</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border border-slate-300">
                <td className="p-2 border border-slate-300 font-bold">គោត្តនាម និងនាម</td>
                <td className="p-2 border border-slate-300 font-extrabold">{student.lastName} {student.firstName} ({student.gender})</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="p-2 border border-slate-300 font-bold">ថ្ងៃខែឆ្នាំកំណើត</td>
                <td className="p-2 border border-slate-300 font-mono">{student.dob || '14/04/2018'}</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="p-2 border border-slate-300 font-bold">មធ្យមភាគពិន្ទុ និងចំណាត់ថ្នាក់</td>
                <td className="p-2 border border-slate-300 font-bold text-blue-900">{student.gpa.toFixed(1)} / ១០ (ចំណាត់ថ្នាក់ {student.rankInClass})</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="p-2 border border-slate-300 font-bold">អត្រាវត្តមានសិក្សា</td>
                <td className="p-2 border border-slate-300 font-bold text-emerald-800">{student.attendancePercentage}%</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="p-2 border border-slate-300 font-bold">អាណាព្យាបាលសិស្ស</td>
                <td className="p-2 border border-slate-300">{student.guardian.name} ({student.guardian.phone})</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PrintFooter />
      </div>
      
      {/* Student Welcome Banner (Screen view) */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-6 sm:p-8 text-white shadow-xl no-print">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={student.avatar}
              alt={student.firstName}
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
            />
            <div>
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-white/20 text-white mb-1">
                <Sparkles className="w-3 h-3" /> {userRole === 'parent' ? (language === 'km' ? 'គណនីមាតាបិតាសិស្ស' : 'Parent Portal') : (language === 'km' ? 'គណនីសិស្សានុសិស្ស' : 'Student Portal')}
              </div>
              <h2 className="text-2xl font-extrabold">
                {userRole === 'parent' ? `ព័ត៌មានសិក្សារបស់កូន៖ ${student.lastName} ${student.firstName}` : `សូមស្វាគមន៍ ក្មួយស្រី ${student.lastName} ${student.firstName}!`}
              </h2>
              <p className="text-xs text-emerald-100 mt-0.5">
                {student.grade} - បន្ទប់ {student.section} • អត្តលេខសិស្ស៖ {student.studentId}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-600 text-white font-extrabold text-xs shadow transition-colors flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> បោះពុម្ភលទ្ធផល
            </button>
            <button
              onClick={onOpenReportCard}
              className="px-4 py-2.5 rounded-xl bg-white text-emerald-700 font-bold text-xs shadow hover:bg-emerald-50 transition-colors flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-emerald-600" /> មើលព្រឹត្តិបត្រពិន្ទុ
            </button>
          </div>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">មធ្យមភាគពិន្ទុរួម</p>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{student.gpa.toFixed(1)} / ១០</h3>
            <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> ចំណាត់ថ្នាក់ {student.rankInClass} ប្រចាំថ្នាក់
            </span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">អត្រាវត្តមានសិក្សា</p>
            <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100 mt-1">{student.attendancePercentage}%</h3>
            <span className="text-[11px] font-bold text-emerald-500 mt-1">វត្តមានទៀងទាត់</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="glass-card p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-400">ប្រភេទបណ្ណសមធម៌</p>
            <h3 className="text-lg font-extrabold text-slate-800 dark:text-slate-100 mt-1">
              {student.equityCard || 'គ្មាន (None)'}
            </h3>
            <span className="text-[11px] text-slate-400 mt-1">អាទិភាពគាំទ្រសង្គម MoEYS</span>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Grade Results & Upcoming Exams */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Midterm Grades */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-brand-500" /> លទ្ធផលពិន្ទុប្រឡងប្រចាំខែកញ្ញា
            </h3>
            <button onClick={onOpenReportCard} className="text-xs font-bold text-brand-500 hover:underline">
              បោះពុម្ពព្រឹត្តិបត្រពិន្ទុ
            </button>
          </div>

          <div className="space-y-3">
            {studentGrades.map(g => (
              <div key={g.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{g.subject}</h4>
                  <p className="text-[11px] text-slate-400">{g.examName} • {g.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{g.marksObtained}/{g.maxMarks}</span>
                  <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-brand-500 text-white">
                    {g.letterGrade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* School Bulletins & Upcoming Exams */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-500" /> សេចក្តីជូនដំណឹងសាលាបឋមសិក្សា
            </h3>
          </div>

          <div className="space-y-3">
            {announcements.slice(0, 3).map(a => (
              <div key={a.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/10 text-purple-600 dark:text-purple-300">
                    {a.category}
                  </span>
                  <span className="text-[10px] text-slate-400">{a.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1">{a.title}</h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{a.content}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};

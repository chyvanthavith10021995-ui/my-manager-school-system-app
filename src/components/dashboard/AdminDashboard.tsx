import React from 'react';
import { useApp } from '../../context/AppContext';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  Users,
  GraduationCap,
  CalendarCheck,
  TrendingUp,
  UserPlus,
  Award,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileText,
  Settings,
  Printer
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

interface AdminDashboardProps {
  onNavigate: (tab: any) => void;
  onOpenAddStudent: () => void;
  onOpenAddTeacher: () => void;
  onOpenReports?: () => void;
  onOpenSettings?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onNavigate,
  onOpenAddStudent,
  onOpenAddTeacher,
  onOpenReports,
  onOpenSettings
}) => {
  const { students, teachers, grades, announcements, language, schoolInfo } = useApp();

  // Metrics calculation
  const totalStudents = students.length;
  const totalTeachers = teachers.length;

  const avgAttendance = students.length > 0
    ? (students.reduce((acc, s) => acc + s.attendancePercentage, 0) / students.length).toFixed(1)
    : '0.0';

  const idPoorStudents = students.filter(s => s.equityCard && !s.equityCard.includes('គ្មាន')).length;

  // Charts Data
  const attendanceTrendData = [
    { month: 'ឧសភា', attendance: 94.2, enrollment: 150 },
    { month: 'មិថុនា', attendance: 95.8, enrollment: 155 },
    { month: 'កក្កដា', attendance: 93.5, enrollment: 160 },
    { month: 'សីហា', attendance: 97.1, enrollment: 170 },
    { month: 'កញ្ញា', attendance: parseFloat(avgAttendance), enrollment: 180 }
  ];

  const equityBreakdownData = [
    { name: 'ក្រ១ (IDPoor 1)', value: students.filter(s => s.equityCard?.includes('ក្រ១')).length, color: '#ef4444' },
    { name: 'ក្រ២ (IDPoor 2)', value: students.filter(s => s.equityCard?.includes('ក្រ២')).length, color: '#f59e0b' },
    { name: 'គ្មាន (None)', value: students.filter(s => !s.equityCard || s.equityCard.includes('គ្មាន')).length, color: '#10b981' }
  ];

  const gradeDistData = [
    { grade: 'ល្អប្រសើរ (A)', count: grades.filter(g => g.letterGrade === 'ល្អប្រសើរ (A)').length + 4 },
    { grade: 'ល្អ (B)', count: grades.filter(g => g.letterGrade === 'ល្អ (B)').length + 8 },
    { grade: 'ល្អបង្គួរ (C)', count: grades.filter(g => g.letterGrade === 'ល្អបង្គួរ (C)').length + 5 },
    { grade: 'មធ្យម (D)', count: grades.filter(g => g.letterGrade === 'មធ្យម (D)').length + 2 },
    { grade: 'ខ្សោយ (F)', count: grades.filter(g => g.letterGrade === 'ខ្សោយ (F)').length + 1 }
  ];

  return (
    <div className="space-y-6 font-sans">

      {/* Printable Executive Dashboard Summary (Only visible when printing) */}
      <div className="hidden print:block">
        <PrintHeader
          title="របាយការណ៍សង្ខេបប្រតិបត្តិការសាលារៀន (សាលាបឋមសិក្សារដ្ឋ)"
          subtitle={`សាលាបឋមសិក្សា អន្លង់តាម៉ី (ឆ្នាំសិក្សា ៖ ${schoolInfo.academicYear})`}
          dateInfo={`កាលបរិច្ឆេទ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <div className="space-y-4 text-black">
          <table className="w-full text-left border-collapse border border-slate-400 text-xs">
            <thead>
              <tr className="bg-slate-100 font-extrabold">
                <th className="p-2 border border-slate-400">ទិន្នន័យសង្ខេប</th>
                <th className="p-2 border border-slate-400 text-center">បរិមាណសរុប</th>
                <th className="p-2 border border-slate-400">កំណត់ចំណាំ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-300">
              <tr className="border border-slate-300">
                <td className="p-2 border border-slate-300 font-bold">ចំនួនសិស្សសរុប (ថ្នាក់ទី១ ដល់ទី៦)</td>
                <td className="p-2 border border-slate-300 text-center font-bold">{totalStudents} នាក់</td>
                <td className="p-2 border border-slate-300 text-slate-600">ចែកតាមបន្ទប់ ក និង ខ</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="p-2 border border-slate-300 font-bold">ចំនួនលោកគ្រូ អ្នកគ្រូ</td>
                <td className="p-2 border border-slate-300 text-center font-bold">{totalTeachers} នាក់</td>
                <td className="p-2 border border-slate-300 text-slate-600">គ្រូបន្ទុកថ្នាក់ & គ្រូឯកទេស</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="p-2 border border-slate-300 font-bold">អត្រាវត្តមានសិស្សមធ្យម</td>
                <td className="p-2 border border-slate-300 text-center font-bold">{avgAttendance}%</td>
                <td className="p-2 border border-slate-300 text-slate-600">ប្រចាំខែកញ្ញា</td>
              </tr>
              <tr className="border border-slate-300">
                <td className="p-2 border border-slate-300 font-bold">សិស្សទទួលបានបណ្ណសមធម៌ (IDPoor)</td>
                <td className="p-2 border border-slate-300 text-center font-bold">{idPoorStudents} នាក់</td>
                <td className="p-2 border border-slate-300 text-slate-600">ក្រ១ និង ក្រ២</td>
              </tr>
            </tbody>
          </table>
        </div>

        <PrintFooter />
      </div>
      
      {/* Top Banner (Screen view) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 p-6 sm:p-8 text-white shadow-xl shadow-brand-500/10 no-print">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/20 backdrop-blur-md border border-white/30 text-white">
                ឆ្នាំសិក្សា {schoolInfo.academicYear}
              </span>
              <span className="text-xs font-medium text-brand-100">{schoolInfo.schoolName} (MoEYS Code: {schoolInfo.schoolCode})</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {language === 'km' ? `សូមស្វាគមន៍ ${schoolInfo.principalName} 👋` : `Welcome, ${schoolInfo.principalName} 👋`}
            </h2>
            <p className="text-sm text-brand-100 mt-1 max-w-xl">
              ប្រព័ន្ធគ្រប់គ្រងសាលារៀនស្ដង់ដារ៖ ថ្នាក់រៀនកម្រិតបឋម (ថ្នាក់ទី១ ដល់ ថ្នាក់ទី៦) ត្រូវបានញែកតាមបន្ទប់ (ក/ខ) និងចាត់តាំងគ្រូបន្ទុកថ្នាក់រួចរាល់។
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs shadow-md transition-colors"
            >
              <Printer className="w-4 h-4" /> បោះពុម្ភរបាយការណ៍
            </button>

            {onOpenReports && (
              <button
                onClick={onOpenReports}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-xs shadow-md transition-colors"
              >
                <FileText className="w-4 h-4" /> របាយការណ៍ស្ដង់ដារ MoEYS
              </button>
            )}
            <button
              onClick={onOpenAddStudent}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-brand-700 font-bold text-xs shadow-md hover:bg-brand-50 transition-colors"
            >
              <UserPlus className="w-4 h-4 text-brand-600" /> ចុះឈ្មោះសិស្សថ្មី
            </button>
            <button
              onClick={onOpenAddTeacher}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-bold text-xs shadow-md transition-colors"
            >
              <GraduationCap className="w-4 h-4" /> ចុះឈ្មោះគ្រូថ្មី
            </button>
            {onOpenSettings && (
              <button
                onClick={onOpenSettings}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-brand-700/50 hover:bg-brand-700/80 backdrop-blur-md border border-white/20 text-white font-bold text-xs transition-colors"
                title="ការកំណត់សាលារៀន"
              >
                <Settings className="w-4 h-4" /> ការកំណត់
              </button>
            )}
          </div>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1 */}
        <div className="glass-card-hover p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">ចំនួនសិស្សបឋមសិក្សាសរុប</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{totalStudents} នាក់</h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> +១២.៥% <span className="text-slate-400 font-normal">ធៀបនឹងឆ្នាំមុន</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-brand-500/10 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="glass-card-hover p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">លោកគ្រូ អ្នកគ្រូបង្រៀន</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{totalTeachers} នាក់</h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> គ្រូបម្រើការងារពេញម៉ោង
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <GraduationCap className="w-6 h-6" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="glass-card-hover p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">អត្រាវត្តមានសិស្សសរុប</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{avgAttendance}%</h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 mt-2">
              <TrendingUp className="w-3.5 h-3.5" /> កម្រិតល្អប្រសើរ
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Card 4 */}
        <div className="glass-card-hover p-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">សិស្សទទួលបានបណ្ណសមធម៌ (IDPoor)</p>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
              {idPoorStudents} នាក់
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-2">
              <AlertCircle className="w-3.5 h-3.5" /> ក្រ១ និង ក្រ២ ទទួលបានការឧបត្ថម្ភ
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* Analytics Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Attendance & Enrollment Chart */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">អត្រាវត្តមានសិស្សបឋមសិក្សាប្រចាំខែ</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">ទិន្នន័យវត្តមានសិស្សថ្នាក់ទី១ ដល់ ថ្នាក់ទី៦</p>
            </div>
            <button
              onClick={() => onNavigate('attendance')}
              className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
            >
              មើលបញ្ជីវត្តមាន <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="attendanceColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0c87eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0c87eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} domain={[80, 100]} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', border: '1px solid #1e293b', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="attendance" stroke="#0c87eb" strokeWidth={3} fillOpacity={1} fill="url(#attendanceColor)" name="វត្តមាន (%)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Equity Cards Breakdown Chart */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">ស្ថិតិបណ្ណសមធម៌សិស្ស (IDPoor)</h3>
              {onOpenReports && (
                <button
                  onClick={onOpenReports}
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  មើលរបាយការណ៍ <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">ការបែងចែកប្រភេទកាត (ក្រ១, ក្រ២, គ្មាន)</p>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={equityBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {equityBreakdownData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => `${Number(val)} នាក់`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> ក្រ១ (IDPoor 1)
              </span>
              <span className="text-slate-800 dark:text-slate-200">{students.filter(s => s.equityCard?.includes('ក្រ១')).length} នាក់</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> ក្រ២ (IDPoor 2)
              </span>
              <span className="text-slate-800 dark:text-slate-200">{students.filter(s => s.equityCard?.includes('ក្រ២')).length} នាក់</span>
            </div>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> គ្មាន (None)
              </span>
              <span className="text-slate-800 dark:text-slate-200">{students.filter(s => !s.equityCard || s.equityCard.includes('គ្មាន')).length} នាក់</span>
            </div>
          </div>
        </div>

      </div>

      {/* Grade Distribution & Recent Bulletins Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Grade Distribution Bar Chart */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">លទ្ធផលពិន្ទុ និងនិទ្ទេសសិស្សប្រឡងប្រចាំខែ</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">ការបែងចែកនិទ្ទេស (A, B, C, D, F) របស់សិស្ស</p>
            </div>
            <Award className="w-5 h-5 text-brand-500" />
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={gradeDistData}>
                <XAxis dataKey="grade" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} name="ចំនួនសិស្ស" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Latest School Announcements */}
        <div className="glass-card p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">ព័ត៌មាន និងសេចក្តីជូនដំណឹងសាលា</h3>
              <button
                onClick={() => onNavigate('notices')}
                className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                មើលទាំងអស់
              </button>
            </div>

            <div className="space-y-3">
              {announcements.slice(0, 3).map(ann => (
                <div key={ann.id} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-start gap-3">
                  <div className={`p-2 rounded-lg shrink-0 ${
                    ann.priority === 'ខ្ពស់' ? 'bg-rose-500/10 text-rose-500' :
                    ann.priority === 'មធ្យម' ? 'bg-amber-500/10 text-amber-500' : 'bg-brand-500/10 text-brand-500'
                  }`}>
                    <Clock className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{ann.title}</h4>
                      <span className="text-[10px] text-slate-400">{ann.date}</span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{ann.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

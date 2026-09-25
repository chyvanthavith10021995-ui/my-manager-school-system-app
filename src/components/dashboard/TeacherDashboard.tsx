import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  BookOpen,
  CalendarCheck,
  Award,
  Users,
  Clock,
  MapPin,
  AlertTriangle,
  ArrowRight,
  Printer,
  ShieldCheck,
  Home,
  CheckCircle2,
  X,
  Plus,
  Search,
  Phone,
  Edit3,
  Sparkles
} from 'lucide-react';

interface TeacherDashboardProps {
  onNavigate: (tab: any) => void;
}

interface DisciplineRecord {
  id: string;
  studentId: string;
  studentName: string;
  date: string;
  category: 'សរសើរ (Commendation)' | 'ណែនាំ (Advice)' | 'កិច្ចសន្យា (Commitment)';
  description: string;
  status: 'ដោះស្រាយរួច' | 'កំពុងតាមដាន';
}

interface HomeVisitRecord {
  id: string;
  studentId: string;
  studentName: string;
  visitDate: string;
  purpose: string;
  findings: string;
  visitorName: string;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onNavigate }) => {
  const { timetable, students, schoolInfo, language } = useApp();

  // Active Homeroom Administration Section Tab
  const [activeAdminTab, setActiveAdminTab] = useState<'overview' | 'roster' | 'attendance' | 'grades' | 'conduct' | 'homeVisits'>('overview');

  // Filter Homeroom Class Students (e.g., ថ្នាក់ទី ៤-ក)
  const homeroomStudents = students.filter(s => s.grade === 'ថ្នាក់ទី ៤' || s.grade.includes('៤'));

  // Search filter inside homeroom administration tables
  const [searchQuery, setSearchQuery] = useState('');

  // Discipline & Conduct Mock Data State
  const [disciplineRecords, setDisciplineRecords] = useState<DisciplineRecord[]>([
    {
      id: 'd1',
      studentId: 'ALT-2026-001',
      studentName: 'ចាន់ សុភា',
      date: '2026-09-20',
      category: 'សរសើរ (Commendation)',
      description: 'ទទួលបានជ័យលាភីលេខ ១ ប្រចាំខែ និងជួយសម្អាតថ្នាក់រៀន',
      status: 'ដោះស្រាយរួច'
    },
    {
      id: 'd2',
      studentId: 'ALT-2026-002',
      studentName: 'សុខ រតនា',
      date: '2026-09-18',
      category: 'ណែនាំ (Advice)',
      description: 'មកគប់ថ្នាក់២ដង ត្រូវគ្រូបន្ទុកថ្នាក់ដាស់តឿន និងណែនាំ',
      status: 'កំពុងតាមដាន'
    }
  ]);

  // Home Visit Logs Mock Data State
  const [homeVisitRecords, setHomeVisitRecords] = useState<HomeVisitRecord[]>([
    {
      id: 'hv1',
      studentId: 'ALT-2026-001',
      studentName: 'ចាន់ សុភា',
      visitDate: '2026-09-15',
      purpose: 'សួរសុខទុក្ខ និងពិនិត្យស្ថានភាពគ្រួសារបណ្ណសមធម៌',
      findings: 'គ្រួសារកសិករក្រ១ អាណាព្យាបាលសហការល្អ សិស្សខិតខំរៀនសូត្រ',
      visitorName: 'អ្នកគ្រូ គឹម ស្រីពៅ'
    }
  ]);

  // Modal States
  const [showAddDisciplineModal, setShowAddDisciplineModal] = useState(false);
  const [showAddHomeVisitModal, setShowAddHomeVisitModal] = useState(false);

  // New Discipline Form State
  const [newDisciplineStudentId, setNewDisciplineStudentId] = useState(homeroomStudents[0]?.id || '');
  const [newDisciplineCategory, setNewDisciplineCategory] = useState<'សរសើរ (Commendation)' | 'ណែនាំ (Advice)' | 'កិច្ចសន្យា (Commitment)'>('សរសើរ (Commendation)');
  const [newDisciplineDesc, setNewDisciplineDesc] = useState('');

  // New Home Visit Form State
  const [newVisitStudentId, setNewVisitStudentId] = useState(homeroomStudents[0]?.id || '');
  const [newVisitPurpose, setNewVisitPurpose] = useState('សួរសុខទុក្ខការសិក្សានៅផ្ទះ');
  const [newVisitFindings, setNewVisitFindings] = useState('');

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  // Handle Add Discipline Record
  const handleAddDisciplineSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === newDisciplineStudentId) || homeroomStudents[0];
    const rec: DisciplineRecord = {
      id: `d_${Date.now()}`,
      studentId: st.studentId,
      studentName: `${st.lastName} ${st.firstName}`,
      date: new Date().toISOString().split('T')[0],
      category: newDisciplineCategory,
      description: newDisciplineDesc,
      status: 'កំពុងតាមដាន'
    };
    setDisciplineRecords([rec, ...disciplineRecords]);
    setShowAddDisciplineModal(false);
    setNewDisciplineDesc('');
    showToast('បានកត់ត្រាវិន័យ/សីលធម៌សិស្សដោយជោគជ័យ!');
  };

  // Handle Add Home Visit Record
  const handleAddHomeVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const st = students.find(s => s.id === newVisitStudentId) || homeroomStudents[0];
    const rec: HomeVisitRecord = {
      id: `hv_${Date.now()}`,
      studentId: st.studentId,
      studentName: `${st.lastName} ${st.firstName}`,
      visitDate: new Date().toISOString().split('T')[0],
      purpose: newVisitPurpose,
      findings: newVisitFindings,
      visitorName: 'អ្នកគ្រូ គឹម ស្រីពៅ'
    };
    setHomeVisitRecords([rec, ...homeVisitRecords]);
    setShowAddHomeVisitModal(false);
    setNewVisitFindings('');
    showToast('បានកត់ត្រាកំណត់ហេតុចុះសួរសុខទុក្ខតាមផ្ទះដោយជោគជ័យ!');
  };

  // Filter today's timetable slots (e.g. ច័ន្ទ)
  const mondayClasses = timetable.filter(t => t.day === 'ច័ន្ទ' || t.day === ('Monday' as any));

  // Filtered homeroom list based on search
  const filteredHomeroomStudents = homeroomStudents.filter(s =>
    `${s.lastName} ${s.firstName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.guardian.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">

      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400 font-bold text-xs no-print">
          <CheckCircle2 className="w-5 h-5 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Printable Homeroom Administration Document (Only visible when printing) */}
      <div className="hidden print:block">
        <PrintHeader
          title="សៀវភៅតាមដាន និងរដ្ឋបាលថ្នាក់រៀនផ្លូវការ (HOMEROOM CLASS REGISTER)"
          subtitle={`សាលាបឋមសិក្សា អន្លង់តាម៉ី • ថ្នាក់ទី ៤-ក (${schoolInfo.academicYear})`}
          dateInfo={`គ្រូបន្ទុកថ្នាក់ ៖ អ្នកគ្រូ គឹម ស្រីពៅ | កាលបរិច្ឆេទ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <div className="space-y-4 text-black text-xs my-4">
          <h4 className="font-extrabold text-sm border-b border-black pb-1">
            ១. បញ្ជីឈ្មោះសិស្សានុសិស្ស និងអាណាព្យាបាលបន្ទុកថ្នាក់ទី ៤-ក (សរុប {homeroomStudents.length} នាក់)
          </h4>

          <table className="w-full text-left border-collapse border border-black text-xs">
            <thead>
              <tr className="bg-slate-200 font-bold border border-black">
                <th className="p-2 border border-black text-center">ល.រ</th>
                <th className="p-2 border border-black">អត្តលេខ</th>
                <th className="p-2 border border-black">គោត្តនាម - នាម</th>
                <th className="p-2 border border-black text-center">ភេទ</th>
                <th className="p-2 border border-black text-center">ថ្ងៃកំណើត</th>
                <th className="p-2 border border-black">អាណាព្យាបាល / ទូរស័ព្ទ</th>
                <th className="p-2 border border-black text-center">បណ្ណសមធម៌</th>
                <th className="p-2 border border-black text-center text-red-600">ចំណាត់ថ្នាក់</th>
              </tr>
            </thead>
            <tbody>
              {homeroomStudents.map((st, idx) => (
                <tr key={st.id} className="border border-black">
                  <td className="p-2 border border-black text-center font-bold">{idx + 1}</td>
                  <td className="p-2 border border-black font-mono font-bold">{st.studentId}</td>
                  <td className="p-2 border border-black font-bold">{st.lastName} {st.firstName}</td>
                  <td className="p-2 border border-black text-center">{st.gender}</td>
                  <td className="p-2 border border-black text-center font-mono">{st.dob}</td>
                  <td className="p-2 border border-black">{st.guardian.name} ({st.guardian.phone})</td>
                  <td className="p-2 border border-black text-center font-bold">{st.equityCard || '-'}</td>
                  <td className="p-2 border border-black text-center font-black text-red-600" style={{ color: 'red' }}>
                    ទី {st.rankInClass}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <PrintFooter />
      </div>
      
      {/* Teacher Portal Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-950 p-6 sm:p-8 text-white shadow-xl no-print border border-indigo-700/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
              alt="Teacher"
              className="w-16 h-16 rounded-2xl object-cover ring-4 ring-white/20 shadow-md"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-bold bg-amber-400 text-slate-950 mb-1 border border-amber-300">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" /> {language === 'km' ? 'ប្រព័ន្ធរដ្ឋបាលថ្នាក់រៀនលោកគ្រូ-អ្នកគ្រូ (MoEYS Homeroom Portal)' : 'Faculty Homeroom Portal'}
              </div>
              <h2 className="text-2xl font-black tracking-tight">
                {language === 'km' ? 'អ្នកគ្រូ គឹម ស្រីពៅ (គ្រូបន្ទុកថ្នាក់ទី ៤-ក)' : 'Teacher Kim Sreypov (Grade 4-A Form Teacher)'}
              </h2>
              <p className="text-xs text-slate-300 mt-0.5">
                {schoolInfo.schoolName} • {schoolInfo.academicYear} • បន្ទុកមុខវិជ្ជា៖ ភាសាខ្មែរ និង គណិតវិទ្យា
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => window.print()}
              className="px-4 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-extrabold text-xs shadow transition-all flex items-center gap-2"
            >
              <Printer className="w-4 h-4" /> {language === 'km' ? 'បោះពុម្ភសៀវភៅរដ្ឋបាលថ្នាក់' : 'Print Homeroom Register'}
            </button>
            <button
              onClick={() => onNavigate('attendance')}
              className="px-4 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <CalendarCheck className="w-4 h-4 text-white" /> {language === 'km' ? 'កត់ត្រាវត្តមានថ្ងៃនេះ' : 'Take Roll'}
            </button>
            <button
              onClick={() => onNavigate('gradebook')}
              className="px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <Edit3 className="w-4 h-4 text-slate-950" /> {language === 'km' ? 'បញ្ចូលពិន្ទុ ១៣ មុខវិជ្ជា' : 'Enter Scores'}
            </button>
          </div>
        </div>
      </div>

      {/* Homeroom Administration Subtabs Navigation Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900/90 p-2 rounded-2xl border border-slate-800 no-print">
        <button
          onClick={() => setActiveAdminTab('overview')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeAdminTab === 'overview'
              ? 'bg-brand-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" /> ១. ផ្ទាំងព័ត៌មាន & កាលវិភាគ
        </button>

        <button
          onClick={() => setActiveAdminTab('roster')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeAdminTab === 'roster'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> ២. បញ្ជីឈ្មោះសិស្សបន្ទុកថ្នាក់ ({homeroomStudents.length})
        </button>

        <button
          onClick={() => setActiveAdminTab('attendance')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeAdminTab === 'attendance'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <CalendarCheck className="w-4 h-4" /> ៣. តាមដានវត្តមាន & សុខភាព
        </button>

        <button
          onClick={() => setActiveAdminTab('grades')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeAdminTab === 'grades'
              ? 'bg-amber-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Award className="w-4 h-4 text-amber-300" /> ៤. ពិន្ទុ & ចំណាត់ថ្នាក់
        </button>

        <button
          onClick={() => setActiveAdminTab('conduct')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeAdminTab === 'conduct'
              ? 'bg-purple-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4" /> ៥. សីលធម៌ & វិន័យថ្នាក់រៀន
        </button>

        <button
          onClick={() => setActiveAdminTab('homeVisits')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
            activeAdminTab === 'homeVisits'
              ? 'bg-rose-600 text-white shadow-md'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          <Home className="w-4 h-4" /> ៦. ការចុះសួរសុខទុក្ខតាមផ្ទះ
        </button>
      </div>

      {/* SECTION 1: OVERVIEW & SCHEDULE */}
      {activeAdminTab === 'overview' && (
        <div className="space-y-6">
          {/* Metrics Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">ថ្នាក់ទទួលបន្ទុក</p>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">ថ្នាក់ទី ៤-ក</h3>
              </div>
            </div>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center font-bold">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">សិស្សបន្ទុកថ្នាក់សរុប</p>
                <h3 className="text-lg font-black text-slate-800 dark:text-slate-100">{homeroomStudents.length} នាក់</h3>
              </div>
            </div>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold">
                <CalendarCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">អត្រាវត្តមានមធ្យម</p>
                <h3 className="text-lg font-black text-emerald-600 dark:text-emerald-400">98.5%</h3>
              </div>
            </div>

            <div className="glass-card p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400">មធ្យមភាគថ្នាក់ (GPA)</p>
                <h3 className="text-lg font-black text-amber-600 dark:text-amber-400">៩.៤ / ១០</h3>
              </div>
            </div>
          </div>

          {/* Schedule & Watchlist Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Teaching Schedule */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-brand-500" /> កាលវិភាគបង្រៀនថ្ងៃនេះ (ថ្ងៃច័ន្ទ)
                </h3>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  ស្ដង់ដារបឋមសិក្សា
                </span>
              </div>

              <div className="space-y-3">
                {mondayClasses.map(slot => (
                  <div key={slot.id} className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-brand-600 dark:text-brand-400">{slot.timeSlot}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-600 dark:text-brand-300">
                          {slot.className}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-1">{slot.subject}</h4>
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-rose-400" /> {slot.room}
                      </p>
                    </div>

                    <button
                      onClick={() => onNavigate('attendance')}
                      className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs shadow-sm transition-all"
                    >
                      កត់វត្តមាន
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Students Needing Academic Support */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" /> បញ្ជីសិស្សពូកែ និងសិស្សត្រូវតាមដាន
                </h3>
                <button
                  onClick={() => setActiveAdminTab('roster')}
                  className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
                >
                  មើលបញ្ជីសិស្ស <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {homeroomStudents.slice(0, 4).map((student, idx) => (
                  <div key={student.id} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/70 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img src={student.avatar} alt={student.firstName} className="w-10 h-10 rounded-full object-cover" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">{student.lastName} {student.firstName}</h4>
                        <p className="text-[11px] text-slate-400">{student.studentId} • {student.equityCard || 'គ្មានបណ្ណ'}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-red-600 dark:text-red-400" style={{ color: 'red' }}>
                        ទី {idx + 1}
                      </span>
                      <p className="text-[10px] font-bold text-brand-600 dark:text-brand-400">មធ្យមភាគ {student.gpa.toFixed(1)}/១០</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: HOMEROOM STUDENT ROSTER & GUARDIANS */}
      {activeAdminTab === 'roster' && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" /> បញ្ជីឈ្មោះសិស្សានុសិស្ស និងអាណាព្យាបាលថ្នាក់ទី ៤-ក
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ទិន្នន័យអត្តលេខ, ថ្ងៃខែឆ្នាំកំណើត, អាស័យដ្ឋាន និងលេខទូរស័ព្ទអាណាព្យាបាល
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  placeholder="ស្វែងរកឈ្មោះសិស្ស/អាណាព្យាបាល..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none"
                />
              </div>

              <button
                onClick={() => window.print()}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-brand-600 text-white font-bold text-xs shadow-md transition-all"
              >
                <Printer className="w-4 h-4" /> បោះពុម្ពបញ្ជី
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3 text-center w-12">ល.រ</th>
                  <th className="p-3">អត្តលេខ</th>
                  <th className="p-3">គោត្តនាម - នាម</th>
                  <th className="p-3 text-center">ភេទ</th>
                  <th className="p-3 text-center">ថ្ងៃកំណើត</th>
                  <th className="p-3">អាណាព្យាបាល</th>
                  <th className="p-3 font-mono">លេខទូរស័ព្ទ</th>
                  <th className="p-3 text-center">បណ្ណសមធម៌</th>
                  <th className="p-3 text-center text-red-600 dark:text-red-400 font-black">ចំណាត់ថ្នាក់</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {filteredHomeroomStudents.map((st, idx) => (
                  <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-slate-600 dark:text-slate-400">{st.studentId}</td>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">
                      <div className="flex items-center gap-2">
                        <img src={st.avatar} alt={st.firstName} className="w-7 h-7 rounded-full object-cover" />
                        <span>{st.lastName} {st.firstName}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center font-bold text-slate-600 dark:text-slate-400">{st.gender}</td>
                    <td className="p-3 text-center font-mono font-bold">{st.dob}</td>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{st.guardian.name} ({st.guardian.relationship})</td>
                    <td className="p-3 font-mono font-bold text-brand-600 dark:text-brand-400 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-slate-400" /> {st.guardian.phone}
                    </td>
                    <td className="p-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        st.equityCard?.includes('ក្រ១') ? 'bg-rose-100 text-rose-700 border border-rose-300' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {st.equityCard || 'គ្មាន'}
                      </span>
                    </td>
                    <td className="p-3 text-center font-black text-red-600 dark:text-red-400" style={{ color: 'red' }}>
                      ទី {idx + 1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 3: CLASS ATTENDANCE & HEALTH LOGS */}
      {activeAdminTab === 'attendance' && (
        <div className="glass-card p-6 space-y-5">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-emerald-500" /> សៀវភៅតាមដានវត្តមាន & សុខភាពសិស្សថ្នាក់ទី ៤-ក
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                កត់ត្រាវត្តមានប្រចាំថ្ងៃ, ច្បាប់ឈប់សម្រាក, និងការតាមដានកម្មវិធីអាហារ WFP
              </p>
            </div>

            <button
              onClick={() => onNavigate('attendance')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all"
            >
              <CalendarCheck className="w-4 h-4" /> ចូលទៅផ្ទាំងកត់វត្តមានពេញលេញ
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
              <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300">វត្តមានមានមុខថ្ងៃនេះ</span>
              <h4 className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {homeroomStudents.length} / {homeroomStudents.length} នាក់ (100%)
              </h4>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
              <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300">សិស្សឈប់មានច្បាប់</span>
              <h4 className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">០ នាក់</h4>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/40">
              <span className="text-xs font-extrabold text-rose-800 dark:text-rose-300">សិស្សអវត្តមានឥតច្បាប់</span>
              <h4 className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">០ នាក់</h4>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: HOMEROOM GRADES & RANKINGS */}
      {activeAdminTab === 'grades' && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" /> តារាងពិន្ទុ និងចំណាត់ថ្នាក់សិស្សថ្នាក់ទី ៤-ក
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                ពិន្ទុ ១៣ មុខវិជ្ជាពេញលេញ, មធ្យមភាគ, និទ្ទេស និងចំណាត់ថ្នាក់ផ្លូវការ (លេខពណ៌ក្រហម)
              </p>
            </div>

            <button
              onClick={() => onNavigate('gradebook')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs shadow-md transition-all"
            >
              <Edit3 className="w-4 h-4 text-slate-950" /> បញ្ចូល/កែប្រែពិន្ទុ ១៣ មុខវិជ្ជា
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold border-b border-slate-200 dark:border-slate-700">
                  <th className="p-3 text-center w-12">ល.រ</th>
                  <th className="p-3">អត្តលេខ</th>
                  <th className="p-3">ឈ្មោះសិស្ស</th>
                  <th className="p-3 text-center">ភេទ</th>
                  <th className="p-3 text-center">ពិន្ទុសរុប (១៣០)</th>
                  <th className="p-3 text-center">មធ្យមភាគ (/១០)</th>
                  <th className="p-3 text-center">និទ្ទេស</th>
                  <th className="p-3 text-center text-red-600 dark:text-red-400 font-black">ចំណាត់ថ្នាក់</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {homeroomStudents.map((st, idx) => (
                  <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                    <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-slate-600 dark:text-slate-400">{st.studentId}</td>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{st.lastName} {st.firstName}</td>
                    <td className="p-3 text-center">{st.gender}</td>
                    <td className="p-3 text-center font-mono font-bold">124.8 / 130</td>
                    <td className="p-3 text-center font-mono font-black text-brand-600 dark:text-brand-400 text-sm">{st.gpa.toFixed(1)}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[11px] font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                        ល្អប្រសើរ (A)
                      </span>
                    </td>
                    <td className="p-3 text-center font-black text-red-600 dark:text-red-400" style={{ color: 'red' }}>
                      ទី {idx + 1}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 5: CLASS CONDUCT & DISCIPLINE */}
      {activeAdminTab === 'conduct' && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-purple-500" /> សៀវភៅតាមដានសីលធម៌ & វិន័យសិស្ស
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                កត់ត្រាការសរសើរ, ការណែនាំដាស់តឿន, និងកិច្ចសន្យាសីលធម៌សិស្សក្នុងថ្នាក់
              </p>
            </div>

            <button
              onClick={() => setShowAddDisciplineModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-extrabold text-xs shadow-md transition-all"
            >
              <Plus className="w-4 h-4" /> កត់ត្រាវិន័យ/សីលធម៌ថ្មី
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-purple-50 dark:bg-purple-950/40 text-purple-900 dark:text-purple-200 font-extrabold border-b border-purple-200 dark:border-purple-800">
                  <th className="p-3 text-center w-12">ល.រ</th>
                  <th className="p-3 font-mono">អត្តលេខ</th>
                  <th className="p-3">ឈ្មោះសិស្ស</th>
                  <th className="p-3 text-center">កាលបរិច្ឆេទ</th>
                  <th className="p-3 text-center">ប្រភេទកត់ត្រា</th>
                  <th className="p-3">បរិយាយសកម្មភាព</th>
                  <th className="p-3 text-center">ស្ថានភាព</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {disciplineRecords.map((rec, idx) => (
                  <tr key={rec.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-950/20">
                    <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-slate-600 dark:text-slate-400">{rec.studentId}</td>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{rec.studentName}</td>
                    <td className="p-3 text-center font-mono text-slate-500">{rec.date}</td>
                    <td className="p-3 text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                        rec.category.includes('សរសើរ') ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {rec.category}
                      </span>
                    </td>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{rec.description}</td>
                    <td className="p-3 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-brand-500/10 text-brand-600">
                        {rec.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SECTION 6: HOME VISITS LOG */}
      {activeAdminTab === 'homeVisits' && (
        <div className="glass-card p-6 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <Home className="w-5 h-5 text-rose-500" /> សៀវភៅកត់ត្រាការចុះសួរសុខទុក្ខតាមផ្ទះសិស្ស
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                កត់ត្រាក្រុមការងារចុះជួបអាណាព្យាបាលសិស្សបណ្ណសមធម៌ និងសិស្សមានហានិភ័យបោះបង់ការសិក្សា
              </p>
            </div>

            <button
              onClick={() => setShowAddHomeVisitModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs shadow-md transition-all"
            >
              <Plus className="w-4 h-4" /> កត់ត្រាការចុះសួរសុខទុក្ខថ្មី
            </button>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-200 font-extrabold border-b border-rose-200 dark:border-rose-800">
                  <th className="p-3 text-center w-12">ល.រ</th>
                  <th className="p-3 font-mono">អត្តលេខ</th>
                  <th className="p-3">ឈ្មោះសិស្ស</th>
                  <th className="p-3 text-center">ថ្ងៃចុះជួប</th>
                  <th className="p-3">គោលបំណង</th>
                  <th className="p-3">លទ្ធផល & ការសង្កេត</th>
                  <th className="p-3">គ្រូ/អ្នកចុះសួរសុខទុក្ខ</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {homeVisitRecords.map((rec, idx) => (
                  <tr key={rec.id} className="hover:bg-rose-50/30 dark:hover:bg-rose-950/20">
                    <td className="p-3 text-center font-bold text-slate-700 dark:text-slate-300">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-slate-600 dark:text-slate-400">{rec.studentId}</td>
                    <td className="p-3 font-extrabold text-slate-900 dark:text-slate-100">{rec.studentName}</td>
                    <td className="p-3 text-center font-mono text-slate-500">{rec.visitDate}</td>
                    <td className="p-3 font-bold text-slate-800 dark:text-slate-200">{rec.purpose}</td>
                    <td className="p-3 font-medium text-slate-700 dark:text-slate-300">{rec.findings}</td>
                    <td className="p-3 font-bold text-brand-600 dark:text-brand-400">{rec.visitorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: ADD DISCIPLINE RECORD */}
      {showAddDisciplineModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-5 h-5 text-purple-600" />
                <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                  កត់ត្រាវិន័យ & សីលធម៌សិស្ស
                </h3>
              </div>
              <button onClick={() => setShowAddDisciplineModal(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddDisciplineSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ជ្រើសរើសសិស្ស ៖</label>
                <select
                  value={newDisciplineStudentId}
                  onChange={e => setNewDisciplineStudentId(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                >
                  {homeroomStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.studentId} - {s.lastName} {s.firstName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ប្រភេទកត់ត្រា ៖</label>
                <select
                  value={newDisciplineCategory}
                  onChange={e => setNewDisciplineCategory(e.target.value as any)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                >
                  <option value="សរសើរ (Commendation)">សរសើរ (Commendation / Achievement)</option>
                  <option value="ណែនាំ (Advice)">ណែនាំ (Advice / Warning)</option>
                  <option value="កិច្ចសន្យា (Commitment)">កិច្ចសន្យា (Discipline Commitment)</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">បរិយាយលម្អិត ៖</label>
                <textarea
                  rows={3}
                  required
                  value={newDisciplineDesc}
                  onChange={e => setNewDisciplineDesc(e.target.value)}
                  placeholder="ឧ. សរសើរពីការជួយមិត្តភក្តិ ឬកត់ត្រាការដាស់តឿនការមកសិក្សា..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddDisciplineModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black shadow-md"
                >
                  រក្សាទុក
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD HOME VISIT RECORD */}
      {showAddHomeVisitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-md p-4 overflow-y-auto font-sans">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <Home className="w-5 h-5 text-rose-600" />
                <h3 className="text-base font-black text-slate-900 dark:text-slate-100">
                  កត់ត្រាការចុះសួរសុខទុក្ខតាមផ្ទះ
                </h3>
              </div>
              <button onClick={() => setShowAddHomeVisitModal(false)} className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddHomeVisitSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">ជ្រើសរើសសិស្ស ៖</label>
                <select
                  value={newVisitStudentId}
                  onChange={e => setNewVisitStudentId(e.target.value)}
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold"
                >
                  {homeroomStudents.map(s => (
                    <option key={s.id} value={s.id}>{s.studentId} - {s.lastName} {s.firstName}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">គោលបំណងចុះសួរសុខទុក្ខ ៖</label>
                <input
                  type="text"
                  required
                  value={newVisitPurpose}
                  onChange={e => setNewVisitPurpose(e.target.value)}
                  placeholder="ឧ. ពិនិត្យមូលហេតុអវត្តមាន / តាមដានអាហារូបករណ៍..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">លទ្ធផល & ការសង្កេត ៖</label>
                <textarea
                  rows={3}
                  required
                  value={newVisitFindings}
                  onChange={e => setNewVisitFindings(e.target.value)}
                  placeholder="ឧ. អាណាព្យាបាលរវល់ធ្វើស្រែ បានណែនាំឱ្យជួយជំរុញសិស្សមកសិក្សាទៀងទាត់..."
                  className="w-full p-2.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-medium"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowAddHomeVisitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold"
                >
                  បោះបង់
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black shadow-md"
                >
                  រក្សាទុក
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default TeacherDashboard;

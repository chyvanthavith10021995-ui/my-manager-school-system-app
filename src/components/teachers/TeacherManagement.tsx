import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import type { Teacher } from '../../types';
import { EditTeacherModal } from './EditTeacherModal';
import { TeacherDetailModal } from './TeacherDetailModal';
import { PrintHeader, PrintFooter } from '../common/PrintHeader';
import {
  GraduationCap,
  Plus,
  Mail,
  Phone,
  CheckCircle2,
  Trash2,
  Edit3,
  Eye,
  Filter,
  Printer
} from 'lucide-react';

interface TeacherManagementProps {
  onOpenAddModal: () => void;
}

export const TeacherManagement: React.FC<TeacherManagementProps> = ({ onOpenAddModal }) => {
  const { teachers, deleteTeacher, userRole, searchQuery, language, schoolInfo } = useApp();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewingTeacher, setViewingTeacher] = useState<Teacher | null>(null);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  const categoryCounts = {
    framework: teachers.filter(t => t.teacherCategory === 'គ្រូក្របខ័ណ្ឌ').length,
    contract: teachers.filter(t => t.teacherCategory === 'គ្រូកិច្ចសន្យា').length,
    agreement: teachers.filter(t => t.teacherCategory === 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង').length
  };

  const filteredTeachers = teachers.filter(t => {
    const matchesSearch =
      `${t.lastName} ${t.firstName}`.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.employeeId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.qualification.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesDept = selectedDept === 'All' || t.department === selectedDept;
    const matchesCat = selectedCategory === 'All' || t.teacherCategory === selectedCategory;

    return matchesSearch && matchesDept && matchesCat;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-900 via-slate-900 to-indigo-950 p-6 rounded-3xl border border-purple-800/40 text-white shadow-xl no-print">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-1 rounded-full text-[11px] font-extrabold bg-purple-500/20 text-purple-300 border border-purple-400/30">
              សាលាបឋមសិក្សា អន្លង់តាម៉ី (MoEYS Faculty)
            </span>
            <span className="text-xs text-slate-300">ឆ្នាំសិក្សា ២០២៦ - ២០២៧ (ចូលរៀនខែ១១ ឆ្នាំ២០២៦)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black tracking-tight">
            {language === 'km' ? 'បញ្ជីឈ្មោះលោកគ្រូ អ្នកគ្រូបង្រៀន' : 'Faculty & Administrative Roster'}
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            គ្រប់គ្រងទិន្នន័យបុគ្គលិកអប់រំ៖ គ្រូក្របខ័ណ្ឌ, គ្រូកិច្ចសន្យា និងគ្រូផ្អែកលើកិច្ចព្រមព្រៀង
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
          >
            <Printer className="w-4 h-4" /> បោះពុម្ភបញ្ជីគ្រូ
          </button>

          {userRole === 'admin' && (
            <button
              onClick={onOpenAddModal}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-md transition-all"
            >
              <Plus className="w-4 h-4" /> ចុះឈ្មោះគ្រូថ្មី
            </button>
          )}
        </div>
      </div>

      {/* Category Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 no-print">
        <button
          onClick={() => setSelectedCategory(selectedCategory === 'គ្រូក្របខ័ណ្ឌ' ? 'All' : 'គ្រូក្របខ័ណ្ឌ')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategory === 'គ្រូក្របខ័ណ្ឌ'
              ? 'bg-purple-950/40 border-purple-500 ring-2 ring-purple-500/40 shadow-lg'
              : 'glass-card-hover'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-purple-700 dark:text-purple-300">🏛️ គ្រូក្របខ័ណ្ឌ</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-black bg-purple-500/10 text-purple-600 dark:text-purple-300">
              {categoryCounts.framework} នាក់
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">បុគ្គលិកអប់រំក្របខ័ណ្ឌរដ្ឋពេញសិទ្ធិ</p>
        </button>

        <button
          onClick={() => setSelectedCategory(selectedCategory === 'គ្រូកិច្ចសន្យា' ? 'All' : 'គ្រូកិច្ចសន្យា')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategory === 'គ្រូកិច្ចសន្យា'
              ? 'bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/40 shadow-lg'
              : 'glass-card-hover'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-blue-700 dark:text-blue-300">📝 គ្រូកិច្ចសន្យា</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-black bg-blue-500/10 text-blue-600 dark:text-blue-300">
              {categoryCounts.contract} នាក់
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">គ្រូបង្រៀនកិច្ចសន្យាកម្រិតក្រសួង</p>
        </button>

        <button
          onClick={() => setSelectedCategory(selectedCategory === 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង' ? 'All' : 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            selectedCategory === 'គ្រូផ្អែកលើកិច្ចព្រមព្រៀង'
              ? 'bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/40 shadow-lg'
              : 'glass-card-hover'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-300">🤝 គ្រូផ្អែកលើកិច្ចព្រមព្រៀង</span>
            <span className="px-2 py-0.5 rounded-full text-xs font-black bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
              {categoryCounts.agreement} នាក់
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">គ្រូបង្រៀនកិច្ចព្រមព្រៀងសហគមន៍/ម៉ោង</p>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="glass-card p-4 flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ប្រភេទគ្រូ ៖</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3.5 py-2 text-xs font-extrabold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-purple-700 dark:text-purple-300 focus:outline-none"
            >
              <option value="All">គ្រប់ប្រភេទគ្រូ ({teachers.length} នាក់)</option>
              <option value="គ្រូក្របខ័ណ្ឌ">🏛️ គ្រូក្របខ័ណ្ឌ ({categoryCounts.framework})</option>
              <option value="គ្រូកិច្ចសន្យា">📝 គ្រូកិច្ចសន្យា ({categoryCounts.contract})</option>
              <option value="គ្រូផ្អែកលើកិច្ចព្រមព្រៀង">🤝 គ្រូផ្អែកលើកិច្ចព្រមព្រៀង ({categoryCounts.agreement})</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">ផ្នែក ៖</span>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="px-3.5 py-2 text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none"
            >
              <option value="All">គ្រប់ផ្នែកទាំងអស់</option>
              <option value="បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី១-៣)">បឋមសិក្សាកម្រិតទាប (ថ្នាក់ទី១-៣)</option>
              <option value="បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៤-៦)">បឋមសិក្សាកម្រិតខ្ពស់ (ថ្នាក់ទី៤-៦)</option>
              <option value="រដ្ឋបាល និងកីឡា">រដ្ឋបាល និងកីឡា</option>
            </select>
          </div>
        </div>

        <span className="text-xs font-bold text-slate-500 self-end sm:self-auto">
          បង្ហាញ {filteredTeachers.length} / {teachers.length} នាក់
        </span>
      </div>

      {/* Printable Teachers Table (Only visible when printing) */}
      <div className="hidden print:block">
        <PrintHeader
          title="បញ្ជីឈ្មោះលោកគ្រូ អ្នកគ្រូបង្រៀន និងបុគ្គលិកអប់រំ"
          subtitle={`សរុប ${filteredTeachers.length} នាក់`}
          classNameInfo={selectedDept !== 'All' ? selectedDept : 'គ្រប់ផ្នែកទាំងអស់'}
          dateInfo={`កាលបរិច្ឆេទ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <table className="w-full text-left border-collapse my-4">
          <thead>
            <tr className="bg-slate-100 text-slate-900 border border-slate-400 text-xs font-extrabold">
              <th className="py-2 px-2 text-center">ល.រ</th>
              <th className="py-2 px-2">អត្តលេខ</th>
              <th className="py-2 px-2">គោត្តនាម - នាម</th>
              <th className="py-2 px-2 text-center">ភេទ</th>
              <th className="py-2 px-2">សញ្ញាបត្រគរុកោសល្យ</th>
              <th className="py-2 px-2">កម្រិតផ្នែក / ថ្នាក់បន្ទុក</th>
              <th className="py-2 px-2 font-mono">លេខទូរស័ព្ទ</th>
              <th className="py-2 px-2 text-center font-mono">ថ្ងៃចូលបម្រើការ</th>
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-slate-300">
            {filteredTeachers.map((t, idx) => (
              <tr key={t.id} className="border border-slate-300">
                <td className="py-2 px-2 text-center font-bold">{idx + 1}</td>
                <td className="py-2 px-2 font-mono font-bold">{t.employeeId}</td>
                <td className="py-2 px-2 font-bold">{t.lastName} {t.firstName}</td>
                <td className="py-2 px-2 text-center">{t.gender || 'ប្រុស'}</td>
                <td className="py-2 px-2">{t.qualification}</td>
                <td className="py-2 px-2">
                  <p className="font-bold">{t.department}</p>
                  {t.assignedClasses.length > 0 && (
                    <p className="text-[10px] text-slate-600">ថ្នាក់ ៖ {t.assignedClasses.join(', ')}</p>
                  )}
                </td>
                <td className="py-2 px-2 font-mono">{t.phone}</td>
                <td className="py-2 px-2 text-center font-mono">{t.joiningDate}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PrintFooter />
      </div>

      {/* Teachers Cards Grid (Screen view) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 no-print">
        {filteredTeachers.map(teacher => (
          <div key={teacher.id} className="glass-card-hover p-6 flex flex-col justify-between relative border-l-4 border-l-purple-600">
            <div>
              {/* Header Info */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={teacher.avatar} alt={teacher.firstName} className="w-14 h-14 rounded-2xl object-cover ring-2 ring-purple-500/20 shadow-md" />
                  <div>
                    <div className="flex flex-wrap items-center gap-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                        teacher.teacherCategory === 'គ្រូក្របខ័ណ្ឌ' ? 'bg-purple-500/10 text-purple-600 dark:text-purple-300 border border-purple-500/20' :
                        teacher.teacherCategory === 'គ្រូកិច្ចសន្យា' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-300 border border-blue-500/20' :
                        'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300 border border-emerald-500/20'
                      }`}>
                        {teacher.teacherCategory === 'គ្រូក្របខ័ណ្ឌ' ? '🏛️ គ្រូក្របខ័ណ្ឌ' :
                         teacher.teacherCategory === 'គ្រូកិច្ចសន្យា' ? '📝 គ្រូកិច្ចសន្យា' :
                         '🤝 ផ្អែកលើកិច្ចព្រមព្រៀង'}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {teacher.department}
                      </span>
                    </div>
                    <h3 className="text-base font-black text-slate-900 dark:text-slate-100 mt-1">
                      {teacher.lastName} {teacher.firstName}
                    </h3>
                    <p className="text-[11px] font-mono text-slate-400 font-bold">{teacher.employeeId}</p>
                  </div>
                </div>

                {/* Card Top Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setViewingTeacher(teacher)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors"
                    title="មើលព័ត៌មាន"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {userRole === 'admin' && (
                    <>
                      <button
                        onClick={() => setEditingTeacher(teacher)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/40 transition-colors"
                        title="កែប្រែទិន្នន័យ"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`លុបគ្រូបង្រៀន ${teacher.lastName} ${teacher.firstName} ចេញពីបញ្ជី?`)) {
                            deleteTeacher(teacher.id);
                          }
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="លុបគ្រូបង្រៀន"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Attributes */}
              <div className="mt-4 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-medium">
                  <GraduationCap className="w-4 h-4 text-purple-500 shrink-0" />
                  <span className="font-bold truncate">{teacher.qualification}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="truncate">{teacher.email}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 font-mono">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{teacher.phone}</span>
                </div>
              </div>

              {/* Assigned Classes */}
              {teacher.assignedClasses.length > 0 && (
                <div className="mt-3.5 p-2.5 rounded-xl bg-purple-50/70 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-800/40">
                  <p className="text-[10px] font-extrabold text-purple-700 dark:text-purple-300 uppercase mb-1">ថ្នាក់បន្ទុកទទួលខុសត្រូវ ៖</p>
                  <div className="flex flex-wrap gap-1">
                    {teacher.assignedClasses.map(ac => (
                      <span key={ac} className="px-2 py-0.5 rounded text-[10px] font-black bg-purple-200 dark:bg-purple-900 text-purple-800 dark:text-purple-200">
                        {ac}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Assigned Subjects */}
              <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1.5">មុខវិជ្ជាទទួលបន្ទុកបង្រៀន</p>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects.map(s => (
                    <span key={s} className="px-2 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">ចូលបម្រើការងារ {teacher.joiningDate}</span>
              <span className="flex items-center gap-1 font-bold text-emerald-600 dark:text-emerald-400 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> {teacher.status}
              </span>
            </div>

          </div>
        ))}
      </div>

      {/* Viewing Teacher Profile Drawer / Modal */}
      {viewingTeacher && (
        <TeacherDetailModal
          teacher={viewingTeacher}
          onClose={() => setViewingTeacher(null)}
          onEdit={userRole === 'admin' ? () => setEditingTeacher(viewingTeacher) : undefined}
        />
      )}

      {/* Editing Teacher Modal */}
      {editingTeacher && (
        <EditTeacherModal
          teacher={editingTeacher}
          onClose={() => setEditingTeacher(null)}
        />
      )}

      {/* Printable Faculty Roster Document (Only visible when printing) */}
      <div className="hidden print:block font-siemreap text-black p-4">
        <PrintHeader
          title="បញ្ជីឈ្មោះលោកគ្រូ អ្នកគ្រូ និងបុគ្គលិកអប់រំផ្លូវការ"
          subtitle={`សាលាបឋមសិក្សា អន្លង់តាម៉ី (${schoolInfo.academicYear})`}
          dateInfo={`កាលបរិច្ឆេទ ៖ ${new Date().toLocaleDateString('km-KH')}`}
        />

        <table className="w-full text-left border-collapse my-4 text-xs font-siemreap">
          <thead>
            <tr className="bg-slate-200 font-bold border border-black">
              <th className="p-2 border border-black">អត្តលេខ</th>
              <th className="p-2 border border-black">គោត្តនាម - នាម</th>
              <th className="p-2 border border-black text-center">ភេទ</th>
              <th className="p-2 border border-black text-center">ប្រភេទគ្រូបង្រៀន</th>
              <th className="p-2 border border-black">កម្រិតផ្នែក / ជំនាញ</th>
              <th className="p-2 border border-black font-mono">លេខទូរស័ព្ទ</th>
              <th className="p-2 border border-black">ថ្នាក់បន្ទុក</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeachers.map(t => (
              <tr key={t.id} className="border border-black">
                <td className="p-2 border border-black font-mono font-bold">{t.employeeId}</td>
                <td className="p-2 border border-black font-bold">{t.lastName} {t.firstName}</td>
                <td className="p-2 border border-black text-center">{t.gender || 'ប្រុស'}</td>
                <td className="p-2 border border-black text-center font-bold">{t.teacherCategory || 'គ្រូក្របខ័ណ្ឌ'}</td>
                <td className="p-2 border border-black">{t.qualification}</td>
                <td className="p-2 border border-black font-mono">{t.phone}</td>
                <td className="p-2 border border-black font-bold">{t.assignedClasses.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <PrintFooter />
      </div>

    </div>
  );
};
